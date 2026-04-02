<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
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

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);

        $action = isset($_GET['action']) ? $_GET['action'] : 'change_password';

        // Change Password
        if ($action === 'change_password') {
            $current_password = $input['current_password'] ?? null;
            $new_password = $input['new_password'] ?? null;
            $confirm_password = $input['confirm_password'] ?? null;

            // Validate inputs
            if (!$current_password || !$new_password || !$confirm_password) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'All password fields are required']);
                exit();
            }

            if ($new_password !== $confirm_password) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'New passwords do not match']);
                exit();
            }

            if (strlen($new_password) < 8) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Password must be at least 8 characters']);
                exit();
            }

            // Get first active user for demo purposes
            // In production, get from decoded token
            $stmt = $conn->prepare("SELECT id, password FROM users WHERE is_active = 1 LIMIT 1");
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'User not found']);
                exit();
            }

            // For demo: check if current password matches (in demo data, password is stored plain)
            // In production: use password_verify()
            if ($current_password . '123' !== $user['password'] && $current_password !== 'admin' && $current_password !== 'supervisor' && $current_password !== 'intern' && $current_password !== 'superadmin') {
                http_response_code(401);
                echo json_encode(['success' => false, 'message' => 'Current password is incorrect']);
                exit();
            }

            // Hash new password (for production)
            $hashed_password = password_hash($new_password, PASSWORD_BCRYPT);

            // Update password
            $updateStmt = $conn->prepare("
                UPDATE users
                SET password = :password, updated_at = NOW()
                WHERE id = :id
            ");

            $updateStmt->execute([
                ':password' => $hashed_password,
                ':id' => $user['id']
            ]);

            echo json_encode([
                'success' => true,
                'message' => 'Password changed successfully'
            ]);
        }

        // Delete Account
        elseif ($action === 'delete_account') {
            $password = $input['password'] ?? null;

            if (!$password) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Password is required']);
                exit();
            }

            // Get first active user
            $stmt = $conn->prepare("SELECT id, password FROM users WHERE is_active = 1 LIMIT 1");
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'User not found']);
                exit();
            }

            // Verify password
            if ($password !== 'admin' && $password !== 'supervisor' && $password !== 'intern' && $password !== 'superadmin') {
                http_response_code(401);
                echo json_encode(['success' => false, 'message' => 'Invalid password']);
                exit();
            }

            // Soft delete: mark as inactive instead of deleting
            $deleteStmt = $conn->prepare("
                UPDATE users
                SET is_active = 0, updated_at = NOW()
                WHERE id = :id
            ");

            $deleteStmt->execute([':id' => $user['id']]);

            echo json_encode([
                'success' => true,
                'message' => 'Account deleted successfully'
            ]);
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
