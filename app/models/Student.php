<?php
require_once __DIR__ . '/Model.php';

class Student extends Model {
    public static string $table = 'students';

    // Custom method to handle the "Login or Register" logic
    public static function loginOrRegister($username) {
        $conn = self::getConnectionStatic();
        $safeUser = $conn->real_escape_string($username);

        // 1. Try to find existing user
        $result = $conn->query("SELECT * FROM students WHERE username = '$safeUser'");

        if ($result->num_rows > 0) {
            return $result->fetch_assoc();
        } else {
            // 2. Register new user
            $instance = new self();
            $id = $instance->create(['username' => $safeUser]);
            return ['id' => $id, 'username' => $safeUser];
        }
    }
}
