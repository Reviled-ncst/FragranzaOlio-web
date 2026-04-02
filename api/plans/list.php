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

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $status = $_GET['status'] ?? null;
        $department_id = $_GET['department_id'] ?? null;

        $query = "SELECT
                    p.id, p.title, p.description, p.department_id, p.duration_weeks,
                    p.mentor_id, p.status, p.learning_objectives, p.skills_to_develop,
                    p.tools_technologies, p.expected_outcomes, p.assessment_criteria,
                    p.created_at, p.updated_at
                  FROM plans p
                  WHERE 1=1";

        $params = [];

        if ($status) {
            $query .= " AND p.status = :status";
            $params[':status'] = $status;
        }

        if ($department_id) {
            $query .= " AND p.department_id = :department_id";
            $params[':department_id'] = $department_id;
        }

        $query .= " ORDER BY p.created_at DESC";

        $stmt = $conn->prepare($query);
        $stmt->execute($params);
        $plans = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'data' => $plans
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
