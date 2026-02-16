<?php
require_once __DIR__ . '/Model.php';

/**
 * Student Model
 * Manages student accounts, handling the automatic registration and login flow.
 */
class Student extends Model {
    /** @var string The table name associated with the model */
    public static string $table = 'students';

    /**
     * Logs in an existing student or registers a new one if they do not exist.
     * @param string $username The student's username
     * @return array Associative array containing the student's ID and username
     */
    public static function loginOrRegister(string $username): array
    {
        $conn = self::getConnectionStatic();
        $safeUser = $conn->real_escape_string($username);

        $result = $conn->query("SELECT * FROM students WHERE username = '$safeUser'");

        if ($result->num_rows > 0) {
            return $result->fetch_assoc();
        } else {
            $instance = new self();
            $id = $instance->create(['username' => $safeUser]);
            return ['id' => $id, 'username' => $safeUser];
        }
    }
}
