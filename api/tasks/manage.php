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
        case 'list':
            getTasks($conn, $user);
            break;
        case 'create':
            createTask($conn, $user);
            break;
        case 'update':
            updateTask($conn, $user);
            break;
        case 'comment':
            addComment($conn, $user);
            break;
        case 'delete':
            deleteTask($conn, $user);
            break;
        case 'get':
            getTask($conn, $user);
            break;
        default:
            sendError('Invalid action', 400);
    }
} catch (Exception $e) {
    sendError($e->getMessage(), 500);
}

function getTasks($conn, $user) {
    $status = $_POST['status'] ?? null;
    $priority = $_POST['priority'] ?? null;
    $assigned_to = $_POST['assigned_to'] ?? null;
    $page = (int)($_POST['page'] ?? 1);
    $limit = (int)($_POST['limit'] ?? 20);
    $offset = ($page - 1) * $limit;

    $query = "SELECT * FROM tasks WHERE 1=1";
    $countQuery = "SELECT COUNT(*) as total FROM tasks WHERE 1=1";
    $params = [];

    // Interns: only assigned to them
    // Supervisors: created by them or assigned to them
    if ($user['role'] === 'INTERN') {
        $query .= " AND assigned_to = ?";
        $countQuery .= " AND assigned_to = ?";
        $params[] = $user['id'];
    } elseif (in_array($user['role'], ['SUPERVISOR', 'ADMIN'])) {
        $query .= " AND (assigned_by = ? OR assigned_to = ?)";
        $countQuery .= " AND (assigned_by = ? OR assigned_to = ?)";
        $params[] = $user['id'];
        $params[] = $user['id'];
    }

    if ($status) {
        $query .= " AND status = ?";
        $countQuery .= " AND status = ?";
        $params[] = $status;
    }

    if ($priority) {
        $query .= " AND priority = ?";
        $countQuery .= " AND priority = ?";
        $params[] = $priority;
    }

    if ($assigned_to && in_array($user['role'], ['SUPERVISOR', 'ADMIN', 'SUPERADMIN'])) {
        $query .= " AND assigned_to = ?";
        $countQuery .= " AND assigned_to = ?";
        $params[] = $assigned_to;
    }

    // Get total count
    $stmt = $conn->prepare($countQuery);
    $stmt->execute($params);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $total = $result['total'];

    $query .= " ORDER BY due_date ASC, priority DESC LIMIT ? OFFSET ?";
    $stmt = $conn->prepare($query);
    $stmt->execute([...$params, $limit, $offset]);
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

    sendSuccess([
        'data' => $tasks,
        'pagination' => [
            'total' => $total,
            'page' => $_POST['page'] ?? 1,
            'limit' => $limit,
            'pages' => ceil($total / $limit)
        ]
    ]);
}

function createTask($conn, $user) {
    // Only supervisors/admins can create tasks
    if (!in_array($user['role'], ['SUPERVISOR', 'ADMIN', 'SUPERADMIN'])) {
        sendError('Only supervisors can create tasks', 403);
        return;
    }

    $title = $_POST['title'] ?? null;
    $description = $_POST['description'] ?? null;
    $assigned_to = $_POST['assigned_to'] ?? null;
    $priority = $_POST['priority'] ?? 'MEDIUM';
    $due_date = $_POST['due_date'] ?? null;
    $estimated_hours = $_POST['estimated_hours'] ?? null;
    $category = $_POST['category'] ?? null;

    if (!$title || !$assigned_to || !$due_date) {
        sendError('Missing required fields', 400);
        return;
    }

    // Verify assigned_to user exists and is intern
    $stmt = $conn->prepare("SELECT role FROM users WHERE id = ?");
    $stmt->execute([$assigned_to]);
    $assignee = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$assignee) {
        sendError('Assigned user not found', 404);
        return;
    }

    $query = "INSERT INTO tasks
              (title, description, assigned_by, assigned_to, priority, due_date, estimated_hours, category, status)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'TODO')";

    $stmt = $conn->prepare($query);
    $stmt->execute([$title, $description, $user['id'], $assigned_to, $priority, $due_date, $estimated_hours, $category]);

    $id = $conn->lastInsertId();

    $stmt = $conn->prepare("SELECT * FROM tasks WHERE id = ?");
    $stmt->execute([$id]);
    $task = $stmt->fetch(PDO::FETCH_ASSOC);

    sendSuccess($task, 'Task created successfully', 201);
}

function updateTask($conn, $user) {
    $id = $_POST['id'] ?? null;

    if (!$id) {
        sendError('Missing task ID', 400);
        return;
    }

    $stmt = $conn->prepare("SELECT * FROM tasks WHERE id = ?");
    $stmt->execute([$id]);
    $task = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$task) {
        sendError('Task not found', 404);
        return;
    }

    // Interns: can only update status and completion
    // Supervisors: can update anything they created
    if ($user['role'] === 'INTERN') {
        if ($task['assigned_to'] != $user['id']) {
            sendError('Can only update your own tasks', 403);
            return;
        }
        $allowedFields = ['status', 'completion_percentage', 'actual_hours'];
    } else {
        if ($task['assigned_by'] != $user['id']) {
            sendError('Can only update tasks you created', 403);
            return;
        }
        $allowedFields = null; // Allow all
    }

    $updates = [];
    $params = [];

    $fields = ['title', 'description', 'status', 'completion_percentage', 'actual_hours', 'priority', 'due_date'];

    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            if ($allowedFields && !in_array($field, $allowedFields)) {
                continue;
            }
            $updates[] = "$field = ?";
            $params[] = $_POST[$field];
        }
    }

    if (empty($updates)) {
        sendError('No fields to update', 400);
        return;
    }

    $updates[] = "updated_at = NOW()";
    $params[] = $id;

    $query = "UPDATE tasks SET " . implode(', ', $updates) . " WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->execute($params);

    $stmt = $conn->prepare("SELECT * FROM tasks WHERE id = ?");
    $stmt->execute([$id]);
    $updated = $stmt->fetch(PDO::FETCH_ASSOC);

    sendSuccess($updated, 'Task updated successfully');
}

function addComment($conn, $user) {
    $task_id = $_POST['task_id'] ?? null;
    $comment = $_POST['comment'] ?? null;
    $attachment = $_POST['attachment_url'] ?? null;

    if (!$task_id || !$comment) {
        sendError('Missing required fields', 400);
        return;
    }

    // Verify task exists and user has access
    $stmt = $conn->prepare("SELECT * FROM tasks WHERE id = ?");
    $stmt->execute([$task_id]);
    $task = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$task) {
        sendError('Task not found', 404);
        return;
    }

    if ($user['role'] === 'INTERN' && $task['assigned_to'] != $user['id']) {
        sendError('No access to this task', 403);
        return;
    }

    $query = "INSERT INTO task_comments (task_id, user_id, comment, attachments)
              VALUES (?, ?, ?, ?)";

    $stmt = $conn->prepare($query);
    $stmt->execute([$task_id, $user['id'], $comment, $attachment ? json_encode([$attachment]) : null]);

    $id = $conn->lastInsertId();

    $stmt = $conn->prepare("SELECT * FROM task_comments WHERE id = ?");
    $stmt->execute([$id]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    sendSuccess($result, 'Comment added successfully', 201);
}

function deleteTask($conn, $user) {
    // Only task creator can delete
    $id = $_POST['id'] ?? null;

    if (!$id) {
        sendError('Missing task ID', 400);
        return;
    }

    $stmt = $conn->prepare("SELECT assigned_by FROM tasks WHERE id = ?");
    $stmt->execute([$id]);
    $task = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$task) {
        sendError('Task not found', 404);
        return;
    }

    if ($task['assigned_by'] != $user['id'] && $user['role'] !== 'SUPERADMIN') {
        sendError('Can only delete tasks you created', 403);
        return;
    }

    $query = "DELETE FROM task_comments WHERE task_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->execute([$id]);

    $query = "DELETE FROM tasks WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->execute([$id]);

    sendSuccess(['id' => $id], 'Task deleted successfully');
}

function getTask($conn, $user) {
    $id = $_POST['id'] ?? $_GET['id'] ?? null;

    if (!$id) {
        sendError('Missing task ID', 400);
        return;
    }

    $stmt = $conn->prepare("SELECT * FROM tasks WHERE id = ?");
    $stmt->execute([$id]);
    $task = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$task) {
        sendError('Task not found', 404);
        return;
    }

    // Get comments
    $stmt = $conn->prepare("SELECT tc.*, u.first_name, u.last_name FROM task_comments tc
                           JOIN users u ON tc.user_id = u.id
                           WHERE tc.task_id = ?
                           ORDER BY tc.created_at DESC");
    $stmt->execute([$id]);
    $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Get checklist
    $stmt = $conn->prepare("SELECT * FROM task_checklist WHERE task_id = ? ORDER BY id");
    $stmt->execute([$id]);
    $checklist = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $task['comments'] = $comments;
    $task['checklist'] = $checklist;

    sendSuccess($task);
}
?>
