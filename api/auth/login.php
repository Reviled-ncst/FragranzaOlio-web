<?php
// api/auth/login.php
// Staff Login Endpoint

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/Database.php';

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['email']) || !isset($data['password'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Email and password are required'
        ]);
        exit();
    }

    $database = new Database();
    $db = $database->connect();

    $query = "SELECT id, email, first_name, last_name, role, department, is_active FROM users WHERE email = :email AND is_active = 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $data['email']);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // For demo purposes - in production use proper bcrypt verification
        // $verified = password_verify($data['password'], $user['password']);

        // Mock password verification (replace with real bcrypt in production)
        $demo_passwords = [
            'superadmin@internship.com' => 'superadmin123',
            'admin@internship.com' => 'admin123',
            'supervisor.it@internship.com' => 'supervisor123',
            'supervisor.marketing@internship.com' => 'supervisor123',
            'supervisor.hr@internship.com' => 'supervisor123',
            'supervisor.admin@internship.com' => 'supervisor123',
            'intern1@student.com' => 'intern123',
            'intern2@student.com' => 'intern123',
            'intern3@student.com' => 'intern123',
        ];

        $expectedPassword = $demo_passwords[$data['email']] ?? null;
        if ($expectedPassword && $data['password'] === $expectedPassword) {
            // Generate a simple token (in production use JWT)
            $token = bin2hex(random_bytes(32));

            http_response_code(200);
            echo json_encode([
                'success' => true,
                'message' => 'Login successful',
                'user' => $user,
                'token' => $token
            ]);
        } else {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'Invalid credentials'
            ]);
        }
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'User not found'
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server error: ' . $e->getMessage()
    ]);
}
?>
