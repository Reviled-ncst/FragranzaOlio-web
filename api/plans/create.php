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

        // Validate required fields
        if (!isset($input['title']) || !isset($input['department_id']) || !isset($input['duration_weeks'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Missing required fields: title, department_id, duration_weeks'
            ]);
            exit();
        }

        $stmt = $conn->prepare("
            INSERT INTO plans (
                title, description, department_id, duration_weeks, mentor_id,
                learning_objectives, skills_to_develop, tools_technologies,
                expected_outcomes, assessment_criteria, status, created_by
            ) VALUES (
                :title, :description, :department_id, :duration_weeks, :mentor_id,
                :learning_objectives, :skills_to_develop, :tools_technologies,
                :expected_outcomes, :assessment_criteria, :status, :created_by
            )
        ");

        $stmt->execute([
            ':title' => $input['title'],
            ':description' => $input['description'] ?? null,
            ':department_id' => $input['department_id'],
            ':duration_weeks' => $input['duration_weeks'],
            ':mentor_id' => $input['mentor_id'] ?? null,
            ':learning_objectives' => $input['learning_objectives'] ?? null,
            ':skills_to_develop' => $input['skills_to_develop'] ?? null,
            ':tools_technologies' => $input['tools_technologies'] ?? null,
            ':expected_outcomes' => $input['expected_outcomes'] ?? null,
            ':assessment_criteria' => $input['assessment_criteria'] ?? null,
            ':status' => 'DRAFT',
            ':created_by' => 1, // Get from token in production
        ]);

        $newId = $conn->lastInsertId();

        // Fetch and return the created plan
        $fetchStmt = $conn->prepare("
            SELECT id, title, description, department_id, duration_weeks, mentor_id, status,
                   learning_objectives, skills_to_develop, tools_technologies,
                   expected_outcomes, assessment_criteria, created_at, updated_at
            FROM plans
            WHERE id = :id
        ");
        $fetchStmt->execute([':id' => $newId]);
        $plan = $fetchStmt->fetch(PDO::FETCH_ASSOC);

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Plan created successfully',
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
