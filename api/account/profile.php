<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/Database.php';

try {
    $db = new Database();
    $conn = $db->connect();

    // Get auth token from header
    $headers = getallheaders();
    $token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null;

    if (!$token) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        exit();
    }

    // For demo purposes, validate token format
    // In production, verify against a sessions table
    if (strlen($token) < 10) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid token']);
        exit();
    }

    // GET - Retrieve user profile
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // For demo, extract user email from token or use a default
        // In production, decode token and get user_id

        $stmt = $conn->prepare("SELECT id, email, name, phone, department, course, is_active FROM users WHERE is_active = 1 LIMIT 1");
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'User not found']);
            exit();
        }

        echo json_encode([
            'success' => true,
            'data' => [
                'id' => $user['id'],
                'email' => $user['email'],
                'name' => $user['name'],
                'phone' => $user['phone'],
                'department' => $user['department'],
                'course' => $user['course'],
            ]
        ]);
    }

    // POST - Update user profile
    elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);

        $name = $input['name'] ?? null;
        $phone = $input['phone'] ?? null;
        $bio = $input['bio'] ?? null;

        // Validate inputs
        if (!$name || strlen($name) < 2) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'errors' => ['name' => 'Name must be at least 2 characters']
            ]);
            exit();
        }

        // For demo, update the first active user
        // In production, use the user_id from decoded token
        $stmt = $conn->prepare("
            UPDATE users
            SET name = :name, phone = :phone, updated_at = NOW()
            WHERE is_active = 1
            LIMIT 1
        ");

        $stmt->execute([
            ':name' => $name,
            ':phone' => $phone
        ]);

        if ($stmt->rowCount() > 0) {
            echo json_encode([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => [
                    'name' => $name,
                    'phone' => $phone
                ]
            ]);
        } else {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Failed to update profile']);
        }
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server error: ' . $e->getMessage()
    ]);
}
?>
