<?php
require_once __DIR__ . '/Model.php';

/**
 * Admin Model
 * Manages teacher/administrator accounts and handles authentication logic.
 */
class Admin extends Model {
    /** @var string The table name associated with the model */
    public static string $table = 'admins';

    /**
     * Authenticates an admin using a plain text password check.
     * @param string $username The admin's username
     * @param string $password The plain text password
     * @return array|false Returns the associative array of the admin record on success, or false on failure
     */
    public static function authenticate(string $username, string $password): false|array
    {
        $conn = self::getConnectionStatic();
        $safeUser = $conn->real_escape_string($username);

        $result = $conn->query("SELECT * FROM admins WHERE username = '$safeUser'");

        if ($result->num_rows > 0) {
            $admin = $result->fetch_assoc();
            if ($password === $admin['password']) {
                return $admin;
            }
        }
        return false;
    }
}
