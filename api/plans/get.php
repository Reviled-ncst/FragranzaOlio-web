<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
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
        $id = $_GET['id'] ?? null;

        if (!$id) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Plan ID is required']);
            exit();
        }

        // Get plan details
        $planStmt = $conn->prepare("
            SELECT id, title, description, department_id, duration_weeks, mentor_id, status,
                   learning_objectives, skills_to_develop, tools_technologies,
                   expected_outcomes, assessment_criteria, created_at, updated_at
            FROM plans
            WHERE id = :id
        ");
        $planStmt->execute([':id' => $id]);
        $plan = $planStmt->fetch(PDO::FETCH_ASSOC);

        if (!$plan) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Plan not found']);
            exit();
        }

        // Get milestones
        $milestonesStmt = $conn->prepare("
            SELECT id, plan_id, week_number, phase_name, description, objectives,
                   tasks, deliverables, due_date
            FROM plan_milestones
            WHERE plan_id = :plan_id
            ORDER BY week_number ASC
        ");
        $milestonesStmt->execute([':plan_id' => $id]);
        $milestones = $milestonesStmt->fetchAll(PDO::FETCH_ASSOC);

        $plan['milestones'] = $milestones;

        echo json_encode([
            'success' => true,
            'data' => $plan
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
