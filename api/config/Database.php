<?php
// config/Database.php
// Database configuration for XAMPP

class Database {
    private $host = 'localhost';
    private $db_name = 'internship_system';
    private $user = 'root';
    private $password = '';
    private $charset = 'utf8mb4';
    private $conn;

    public function connect() {
        $dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->db_name . ';charset=' . $this->charset;

        try {
            $this->conn = new PDO($dsn, $this->user, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->conn;
        } catch (PDOException $e) {
            die(json_encode([
                'success' => false,
                'message' => 'Database Connection Error: ' . $e->getMessage()
            ]));
        }
    }

    public function getConnection() {
        return $this->conn;
    }
}
?>
