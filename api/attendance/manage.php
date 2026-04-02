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

$auth = new Auth();
$user = $auth->verify();

if (!$user) {
    sendError('Unauthorized', 401);
    exit();
}

$action = $_POST['action'] ?? $_GET['action'] ?? null;

try {
    $db = new Database();
    $conn = $db->getConnection();

    switch ($action) {
        case 'check-in':
            checkIn($conn, $user);
            break;
        case 'check-out':
            checkOut($conn, $user);
            break;
        case 'list':
            getAttendance($conn, $user);
            break;
        case 'leave-request':
            requestLeave($conn, $user);
            break;
        case 'leave-approve':
            approveLeave($conn, $user);
            break;
        case 'summary':
            getAttendanceSummary($conn, $user);
            break;
        default:
            sendError('Invalid action', 400);
    }
} catch (Exception $e) {
    sendError($e->getMessage(), 500);
}

function checkIn($conn, $user) {
    if ($user['role'] !== 'INTERN') {
        sendError('Only interns can check in', 403);
        return;
    }

    $today = date('Y-m-d');
    $location = $_POST['location'] ?? null;
    $notes = $_POST['notes'] ?? null;

    // Check if already checked in today
    $stmt = $conn->prepare("SELECT * FROM attendance WHERE user_id = ? AND attendance_date = ?");
    $stmt->execute([$user['id'], $today]);
    $existing = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existing && $existing['check_in_time']) {
        sendError('Already checked in today', 400);
        return;
    }

    $check_in_time = date('H:i:s');

    if ($existing) {
        $query = "UPDATE attendance SET check_in_time = ?, notes = ? WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->execute([$check_in_time, $notes, $existing['id']]);
        $id = $existing['id'];
    } else {
        $query = "INSERT INTO attendance (user_id, attendance_date, check_in_time, status, notes)
                  VALUES (?, ?, ?, 'PRESENT', ?)";
        $stmt = $conn->prepare($query);
        $stmt->execute([$user['id'], $today, $check_in_time, $notes]);
        $id = $conn->lastInsertId();
    }

    $stmt = $conn->prepare("SELECT * FROM attendance WHERE id = ?");
    $stmt->execute([$id]);
    $attendance = $stmt->fetch(PDO::FETCH_ASSOC);

    sendSuccess($attendance, 'Checked in successfully', 201);
}

function checkOut($conn, $user) {
    if ($user['role'] !== 'INTERN') {
        sendError('Only interns can check out', 403);
        return;
    }

    $today = date('Y-m-d');
    $notes = $_POST['notes'] ?? null;

    $stmt = $conn->prepare("SELECT * FROM attendance WHERE user_id = ? AND attendance_date = ?");
    $stmt->execute([$user['id'], $today]);
    $attendance = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$attendance) {
        sendError('No check-in found for today', 404);
        return;
    }

    if (!$attendance['check_in_time']) {
        sendError('Check in first', 400);
        return;
    }

    $check_out_time = date('H:i:s');
    $time_in = strtotime($attendance['check_in_time']);
    $time_out = strtotime($check_out_time);
    $hours_worked = ($time_out - $time_in) / 3600;

    $query = "UPDATE attendance
              SET check_out_time = ?, notes = ?
              WHERE id = ?";

    $stmt = $conn->prepare($query);
    $stmt->execute([$check_out_time, $notes, $attendance['id']]);

    // Update timesheet with hours
    $ts_query = "INSERT INTO timesheets (user_id, work_date, check_in_time, check_out_time, hours_worked, status)
                 VALUES (?, ?, ?, ?, ?, 'PENDING')
                 ON DUPLICATE KEY UPDATE hours_worked = ?, check_out_time = ?";
    $stmt = $conn->prepare($ts_query);
    $stmt->execute([$user['id'], $today, $attendance['check_in_time'], $check_out_time, $hours_worked, $hours_worked, $check_out_time]);

    $stmt = $conn->prepare("SELECT * FROM attendance WHERE id = ?");
    $stmt->execute([$attendance['id']]);
    $updated = $stmt->fetch(PDO::FETCH_ASSOC);

    sendSuccess($updated, 'Checked out successfully');
}

function getAttendance($conn, $user) {
    $user_id = $_POST['user_id'] ?? $user['id'];
    $start_date = $_POST['start_date'] ?? null;
    $end_date = $_POST['end_date'] ?? null;

    if ($user['role'] === 'INTERN' && $user_id != $user['id']) {
        sendError('Forbidden', 403);
        return;
    }

    $query = "SELECT * FROM attendance WHERE user_id = ?";
    $params = [$user_id];

    if ($start_date) {
        $query .= " AND attendance_date >= ?";
        $params[] = $start_date;
    }

    if ($end_date) {
        $query .= " AND attendance_date <= ?";
        $params[] = $end_date;
    }

    $query .= " ORDER BY attendance_date DESC";

    $stmt = $conn->prepare($query);
    $stmt->execute($params);
    $records = $stmt->fetchAll(PDO::FETCH_ASSOC);

    sendSuccess($records);
}

function requestLeave($conn, $user) {
    $leave_type = $_POST['leave_type'] ?? null;
    $start_date = $_POST['start_date'] ?? null;
    $end_date = $_POST['end_date'] ?? null;
    $reason = $_POST['reason'] ?? null;
    $attachment = $_POST['attachment_url'] ?? null;

    if (!$leave_type || !$start_date || !$end_date) {
        sendError('Missing required fields', 400);
        return;
    }

    $query = "INSERT INTO leave_requests
              (user_id, leave_type, start_date, end_date, reason, attachment_url, status)
              VALUES (?, ?, ?, ?, ?, ?, 'PENDING')";

    $stmt = $conn->prepare($query);
    $stmt->execute([$user['id'], $leave_type, $start_date, $end_date, $reason, $attachment]);

    $id = $conn->lastInsertId();

    $stmt = $conn->prepare("SELECT * FROM leave_requests WHERE id = ?");
    $stmt->execute([$id]);
    $request = $stmt->fetch(PDO::FETCH_ASSOC);

    sendSuccess($request, 'Leave request submitted', 201);
}

function approveLeave($conn, $user) {
    if (!in_array($user['role'], ['SUPERVISOR', 'ADMIN', 'SUPERADMIN'])) {
        sendError('Only supervisors can approve leave', 403);
        return;
    }

    $id = $_POST['id'] ?? null;
    $action = $_POST['action'] ?? 'APPROVE';

    if (!$id) {
        sendError('Missing leave request ID', 400);
        return;
    }

    $status = $action === 'APPROVE' ? 'APPROVED' : 'REJECTED';

    $query = "UPDATE leave_requests SET status = ?, approved_by = ?, approved_at = NOW() WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->execute([$status, $user['id'], $id]);

    if ($action === 'APPROVE') {
        // Update actual attendance records
        $stmt = $conn->prepare("SELECT start_date, end_date FROM leave_requests WHERE id = ?");
        $stmt->execute([$id]);
        $leave = $stmt->fetch(PDO::FETCH_ASSOC);

        $start = new DateTime($leave['start_date']);
        $end = new DateTime($leave['end_date']);

        while ($start <= $end) {
            $date = $start->format('Y-m-d');
            $update_query = "INSERT INTO attendance (user_id, attendance_date, status) VALUES (?, ?, 'ON_LEAVE')
                           ON DUPLICATE KEY UPDATE status = 'ON_LEAVE'";
            $update_stmt = $conn->prepare($update_query);
            $update_stmt->execute([$user['id'], $date]);
            $start->modify('+1 day');
        }
    }

    $stmt = $conn->prepare("SELECT * FROM leave_requests WHERE id = ?");
    $stmt->execute([$id]);
    $updated = $stmt->fetch(PDO::FETCH_ASSOC);

    sendSuccess($updated, "Leave request $action");
}

function getAttendanceSummary($conn, $user) {
    $user_id = $_POST['user_id'] ?? $user['id'];
    $year = $_POST['year'] ?? date('Y');
    $month = $_POST['month'] ?? date('m');

    if ($user['role'] === 'INTERN' && $user_id != $user['id']) {
        sendError('Forbidden', 403);
        return;
    }

    $query = "SELECT
                COUNT(CASE WHEN status = 'PRESENT' THEN 1 END) as total_present,
                COUNT(CASE WHEN status = 'ABSENT' THEN 1 END) as total_absent,
                COUNT(CASE WHEN is_late = 1 THEN 1 END) as total_late,
                COUNT(CASE WHEN status = 'ON_LEAVE' THEN 1 END) as total_leave,
                COUNT(*) as total_days,
                ROUND(COUNT(CASE WHEN status = 'PRESENT' THEN 1 END) / COUNT(*) * 100, 2) as attendance_percentage
              FROM attendance
              WHERE user_id = ? AND YEAR(attendance_date) = ? AND MONTH(attendance_date) = ?";

    $stmt = $conn->prepare($query);
    $stmt->execute([$user_id, $year, $month]);
    $summary = $stmt->fetch(PDO::FETCH_ASSOC);

    sendSuccess($summary);
}
?>
