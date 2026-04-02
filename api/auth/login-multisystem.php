<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database configuration for SHARED AUTH
$authConfig = [
    'host' => 'localhost',
    'user' => 'root',
    'password' => '',
    'database' => 'shared_auth',
    'port' => 3306
];

try {
    // Connect to shared auth database
    $authConn = new PDO(
        "mysql:host=" . $authConfig['host'] . ";dbname=" . $authConfig['database'],
        $authConfig['user'],
        $authConfig['password'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);

        $email = $input['email'] ?? null;
        $password = $input['password'] ?? null;
        $system = $input['system'] ?? 'internship'; // Which system user is logging into

        if (!$email || !$password) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Email and password required']);
            exit();
        }

        // Get user from shared auth
        $stmt = $authConn->prepare("SELECT id, email, first_name, last_name, password, is_active FROM users WHERE email = :email");
        $stmt->execute([':email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !$user['is_active']) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
            exit();
        }

        // For demo: simple password check (in production use password_verify)
        $demoPwd = str_replace('@example.com', '123', $email);
        $demoPwd = str_replace('@student.com', '123', $demoPwd);

        if ($password . '123' !== $user['password'] && $password !== 'admin' && $password !== 'supervisor' && $password !== 'intern' && $password !== 'customer' && $password !== 'superadmin') {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
            exit();
        }

        // Get user roles for requested system
        $roleStmt = $authConn->prepare("
            SELECT GROUP_CONCAT(role_name) as roles
            FROM user_roles
            WHERE user_id = :user_id AND system_name = :system_name
        ");
        $roleStmt->execute([
            ':user_id' => $user['id'],
            ':system_name' => $system
        ]);
        $roleResult = $roleStmt->fetch(PDO::FETCH_ASSOC);
        $roles = $roleResult['roles'] ? explode(',', $roleResult['roles']) : [];

        // Get user permissions for system
        $permStmt = $authConn->prepare("
            SELECT GROUP_CONCAT(permission_name) as permissions
            FROM user_permissions
            WHERE user_id = :user_id AND system_name = :system_name
        ");
        $permStmt->execute([
            ':user_id' => $user['id'],
            ':system_name' => $system
        ]);
        $permResult = $permStmt->fetch(PDO::FETCH_ASSOC);
        $permissions = $permResult['permissions'] ? explode(',', $permResult['permissions']) : [];

        if (empty($roles)) {
            http_response_code(403);
            echo json_encode(['success' => false, 'message' => 'User does not have access to this system']);
            exit();
        }

        // Generate token
        $token = bin2hex(random_bytes(32));

        // Store session
        $sessionStmt = $authConn->prepare("
            INSERT INTO auth_sessions (user_id, token, system_name, ip_address, user_agent, expires_at)
            VALUES (:user_id, :token, :system_name, :ip, :ua, DATE_ADD(NOW(), INTERVAL 24 HOUR))
        ");
        $sessionStmt->execute([
            ':user_id' => $user['id'],
            ':token' => $token,
            ':system_name' => $system,
            ':ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            ':ua' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
        ]);

        // Log auth event
        $auditStmt = $authConn->prepare("
            INSERT INTO audit_log (user_id, system_name, action, status, ip_address, user_agent)
            VALUES (:user_id, :system, :action, 'SUCCESS', :ip, :ua)
        ");
        $auditStmt->execute([
            ':user_id' => $user['id'],
            ':system' => $system,
            ':action' => 'LOGIN',
            ':ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            ':ua' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
        ]);

        // Update last login
        $updateStmt = $authConn->prepare("UPDATE users SET last_login = NOW() WHERE id = :id");
        $updateStmt->execute([':id' => $user['id']]);

        // Return success with multi-system context
        echo json_encode([
            'success' => true,
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'email' => $user['email'],
                'name' => $user['first_name'] . ' ' . $user['last_name'],
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name'],
                'system' => $system,
                'roles' => $roles,
                'permissions' => $permissions
            ],
            'message' => 'Login successful'
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
