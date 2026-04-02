<?php
// Database verification script
error_reporting(E_ALL);
ini_set('display_errors', 1);

// MySQL connection
$host = 'localhost';
$user = 'root';
$password = '';

$conn = new mysqli($host, $user, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "=== DATABASE VERIFICATION ===\n\n";

// Check databases
$databases = ['shared_auth', 'enterprise_system', 'internship_system'];
$existing_dbs = [];

$result = $conn->query("SHOW DATABASES");
while ($row = $result->fetch_row()) {
    if (in_array($row[0], $databases)) {
        $existing_dbs[] = $row[0];
    }
}

echo "✅ EXISTING DATABASES:\n";
foreach ($existing_dbs as $db) {
    echo "  - $db\n";
}

echo "\n❌ MISSING DATABASES:\n";
foreach ($databases as $db) {
    if (!in_array($db, $existing_dbs)) {
        echo "  - $db\n";
    }
}

// Check table counts
echo "\n=== TABLE COUNTS ===\n";
foreach ($existing_dbs as $db) {
    $count_query = "SELECT COUNT(*) as count FROM information_schema.TABLES WHERE TABLE_SCHEMA = '$db'";
    $count_result = $conn->query($count_query);
    $count_row = $count_result->fetch_assoc();
    echo "$db: {$count_row['count']} tables\n";
}

// Check sample data
echo "\n=== SAMPLE DATA ===\n";

if (in_array('shared_auth', $existing_dbs)) {
    $result = $conn->query("SELECT COUNT(*) as count FROM shared_auth.users");
    $row = $result->fetch_assoc();
    echo "shared_auth.users: {$row['count']} records\n";

    $result = $conn->query("SELECT email, role FROM shared_auth.users LIMIT 3");
    while ($user = $result->fetch_assoc()) {
        echo "  - {$user['email']} ({$user['role']})\n";
    }
}

if (in_array('enterprise_system', $existing_dbs)) {
    $result = $conn->query("SELECT COUNT(*) as count FROM enterprise_system.departments");
    $row = $result->fetch_assoc();
    echo "\nenterprise_system.departments: {$row['count']} records\n";

    $result = $conn->query("SELECT COUNT(*) as count FROM enterprise_system.employees");
    $row = $result->fetch_assoc();
    echo "enterprise_system.employees: {$row['count']} records\n";
}

echo "\n=== VERIFICATION COMPLETE ===\n";
$conn->close();
?>
