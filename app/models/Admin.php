<?php
require_once __DIR__ . '/Model.php';

class Admin extends Model {
    public static string $table = 'admins';

    public static function authenticate($username, $password) {
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