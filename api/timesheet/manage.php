<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../config/responses.php';
require_once __DIR__ . '/../auth/Auth.php';

// Verify authentication
$auth = new Auth();
$user = $auth->verify();

if (!$user) {
    sendError('Unauthorized', 401);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_POST['action'] ?? $_GET['action'] ?? null;

try {
    $db = new Database();
    $conn = $db->getConnection();

    switch ($action) {
        case 'list':
            getTimesheets($conn, $user);
            break;
        case 'create':
            createTimesheet($conn, $user);
            break;
        case 'update':
            updateTimesheet($conn, $user);
            break;
        case 'submit':
            submitTimesheet($conn, $user);
            break;
        case 'approve':
            approveTimesheet($conn, $user);
            break;
        default:
            sendError('Invalid action', 400);
    }
} catch (Exception $e) {
    sendError($e->getMessage(), 500);
}

function getTimesheets($conn, $user) {
    $user_id = $_POST['user_id'] ?? $user['id'];
    $start_date = $_POST['start_date'] ?? null;
    $end_date = $_POST['end_date'] ?? null;
    $status = $_POST['status'] ?? null;

    // Interns can only view their own timesheets
    if ($user['role'] === 'INTERN' && $user_id != $user['id']) {
        sendError('Forbidden', 403);
        return;
    }

    $query = "SELECT * FROM timesheets WHERE 1=1";
    $params = [];

    if ($user['role'] === 'INTERN') {
        $query .= " AND user_id = ?";
        $params[] = $user['id'];
    } else {
        $query .= " AND user_id = ?";
        $params[] = $user_id;
    }

    if ($start_date) {
        $query .= " AND work_date >= ?";
        $params[] = $start_date;
    }

    if ($end_date) {
        $query .= " AND work_date <= ?";
        $params[] = $end_date;
    }

    if ($status) {
        $query .= " AND status = ?";
        $params[] = $status;
    }

    $query .= " ORDER BY work_date DESC";

    $stmt = $conn->prepare($query);
    $stmt->execute($params);
    $timesheets = $stmt->fetchAll(PDO::FETCH_ASSOC);

    sendSuccess($timesheets);
}

function createTimesheet($conn, $user) {
    // Only interns can create timesheets (for themselves)
    if ($user['role'] !== 'INTERN') {
        sendError('Only interns can create timesheets', 403);
        return;
    }

    $work_date = $_POST['work_date'] ?? null;
    $check_in_time = $_POST['check_in_time'] ?? null;
    $check_out_time = $_POST['check_out_time'] ?? null;
    $hours_worked = $_POST['hours_worked'] ?? null;
    $notes = $_POST['notes'] ?? null;

    if (!$work_date || !$check_in_time) {
        sendError('Missing required fields', 400);
        return;
    }

    // Calculate hours if check out time provided
    if ($check_out_time && !$hours_worked) {
        $time_in = strtotime($check_in_time);
        $time_out = strtotime($check_out_time);
        $hours_worked = ($time_out - $time_in) / 3600;
    }

    $query = "INSERT INTO timesheets
              (user_id, work_date, check_in_time, check_out_time, hours_worked, notes, status)
              VALUES (?, ?, ?, ?, ?, ?, 'PENDING')";

    $stmt = $conn->prepare($query);
    $stmt->execute([
        $user['id'],
        $work_date,
        $check_in_time,
        $check_out_time,
        $hours_worked,
        $notes
    ]);

    $id = $conn->lastInsertId();

    $query = "SELECT * FROM timesheets WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->execute([$id]);
    $timesheet = $stmt->fetch(PDO::FETCH_ASSOC);

    sendSuccess($timesheet, 'Timesheet created successfully', 201);
}

function updateTimesheet($conn, $user) {
    $id = $_POST['id'] ?? null;

    if (!$id) {
        sendError('Missing timesheet ID', 400);
        return;
    }

    // Get timesheet
    $stmt = $conn->prepare("SELECT * FROM timesheets WHERE id = ?");
    $stmt->execute([$id]);
    $timesheet = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$timesheet) {
        sendError('Timesheet not found', 404);
        return;
    }

    // Interns can only update their own timesheets and only if PENDING
    if ($user['role'] === 'INTERN') {
        if ($timesheet['user_id'] != $user['id'] || $timesheet['status'] !== 'PENDING') {
            sendError('Cannot update this timesheet', 403);
            return;
        }
    }

    $updates = [];
    $params = [];

    if (isset($_POST['check_in_time'])) {
        $updates[] = "check_in_time = ?";
        $params[] = $_POST['check_in_time'];
    }

    if (isset($_POST['check_out_time'])) {
        $updates[] = "check_out_time = ?";
        $params[] = $_POST['check_out_time'];
    }

    if (isset($_POST['hours_worked'])) {
        $updates[] = "hours_worked = ?";
        $params[] = $_POST['hours_worked'];
    }

    if (isset($_POST['notes'])) {
        $updates[] = "notes = ?";
        $params[] = $_POST['notes'];
    }

    if (empty($updates)) {
        sendError('No fields to update', 400);
        return;
    }

    $updates[] = "updated_at = NOW()";
    $params[] = $id;

    $query = "UPDATE timesheets SET " . implode(', ', $updates) . " WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->execute($params);

    // Get updated timesheet
    $stmt = $conn->prepare("SELECT * FROM timesheets WHERE id = ?");
    $stmt->execute([$id]);
    $updated = $stmt->fetch(PDO::FETCH_ASSOC);

    sendSuccess($updated, 'Timesheet updated successfully');
}

function submitTimesheet($conn, $user) {
    $id = $_POST['id'] ?? null;

    if (!$id) {
        sendError('Missing timesheet ID', 400);
        return;
    }

    $stmt = $conn->prepare("SELECT * FROM timesheets WHERE id = ?");
    $stmt->execute([$id]);
    $timesheet = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$timesheet) {
        sendError('Timesheet not found', 404);
        return;
    }

    // Only own timesheet, and only if PENDING
    if ($user['id'] != $timesheet['user_id'] || $timesheet['status'] !== 'PENDING') {
        sendError('Cannot submit this timesheet', 403);
        return;
    }

    $query = "UPDATE timesheets SET status = 'SUBMITTED', submitted_at = NOW() WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->execute([$id]);

    $stmt = $conn->prepare("SELECT * FROM timesheets WHERE id = ?");
    $stmt->execute([$id]);
    $updated = $stmt->fetch(PDO::FETCH_ASSOC);

    sendSuccess($updated, 'Timesheet submitted successfully');
}

function approveTimesheet($conn, $user) {
    // Only supervisors/admins can approve
    if (!in_array($user['role'], ['SUPERVISOR', 'ADMIN', 'SUPERADMIN'])) {
        sendError('Only supervisors can approve timesheets', 403);
        return;
    }

    $ids = $_POST['ids'] ?? [];
    $action = $_POST['action'] ?? 'APPROVE';
    $notes = $_POST['notes'] ?? null;

    if (empty($ids)) {
        sendError('No timesheets selected', 400);
        return;
    }

    $status = $action === 'APPROVE' ? 'APPROVED' : 'REJECTED';

    $placeholders = implode(',', array_fill(0, count($ids), '?'));
    $query = "UPDATE timesheets SET status = ?, approved_by = ?, approved_at = NOW()
              WHERE id IN ($placeholders)";

    $params = [$status, $user['id'], ...$ids];
    $stmt = $conn->prepare($query);
    $stmt->execute($params);

    $affected = $stmt->rowCount();

    sendSuccess([
        'affected' => $affected,
        'action' => $action,
        'message' => "$affected timesheet(s) $action"
    ], "Timesheets processed successfully");
}
?>
