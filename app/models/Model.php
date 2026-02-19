<?php

/**
 *  Abstract Base Model
 *  Provides standard CRUD operations (Create, Read, Update, Delete)
 *  for all child models. Uses strict typing and MySQLi.
 */
abstract class Model {
    /** @var mysqli|null Database connection instance */
    protected static ?mysqli $conn = null;

    /** @var string The table name associated with the model */
    public static string $table = '';


    /**
     * Initialize connection on instantiation
     */
    public function __construct() { self::setConnection(); }


    /**
     * Establishes the singleton database connection
     * @return void
     */
    private static function setConnection(): void {
        if (self::$conn === null) {
            require __DIR__ . '/../config/database.php';
            if (isset($conn)) { self::$conn = $conn; }
        }
    }


    /**
     * Returns the active database connection
     * @return mysqli|null
     */
    protected static function getConnectionStatic(): ?mysqli {
        self::setConnection();
        return self::$conn;
    }


    /**
     * Fetch all records from the table
     * @return array Array of associative arrays representing rows
     */
    public static function all(): array
    {
        $conn = self::getConnectionStatic();
        $result = $conn->query("SELECT * FROM `" . static::$table . "` ORDER BY id DESC");
        return $result->fetch_all(MYSQLI_ASSOC);
    }


    /**
     * Find a single record by ID
     * @param int $id The record ID
     * @return false|array|null Associative array of the record or null if not found
     */
    public static function find(int $id): false|array|null
    {
        $conn = self::getConnectionStatic();
        $result = $conn->query("SELECT * FROM `" . static::$table . "` WHERE id = " . (int)$id);
        return $result->fetch_assoc();
    }


    /**
     * Create a new record
     * @param array $data Associative array of column => value
     * @return false|int|string The ID of the inserted record or false on failure
     */
    public function create(array $data): false|int|string
    {
        $conn = self::getConnectionStatic();
        $columns = implode(", ", array_keys($data));

        $safeValues = [];
        foreach ($data as $value) {
            if ($value === null) {
                $safeValues[] = "NULL"; // handle nulls safely
            } elseif (is_bool($value)) {
                $safeValues[] = $value ? '1' : '0'; // handle booleans safely
            } else {
                $safeValues[] = "'" . $conn->real_escape_string((string)$value) . "'";
            }
        }
        $values = implode(", ", $safeValues);
        $sql = "INSERT INTO `" . static::$table . "` ($columns) VALUES ($values)";
        return $conn->query($sql) ? $conn->insert_id : false;
    }


    /**
     * Update an existing record
     * @param int $id The record ID
     * @param array $data Associative array of column => value
     * @return mysqli_result|bool True on success, False on failure
     */
    public function update(int $id, array $data): mysqli_result|bool
    {
        $conn = self::getConnectionStatic();
        $set = [];
        foreach ($data as $column => $value) {
            if ($value === null) {
                $set[] = "`$column` = NULL"; // handle nulls safely
            } elseif (is_bool($value)) {
                $boolVal = $value ? '1' : '0';
                $set[] = "`$column` = '$boolVal'";
            } else {
                $safeValue = $conn->real_escape_string((string)$value);
                $set[] = "`$column` = '$safeValue'";
            }
        }
        $setString = implode(", ", $set);
        $sql = "UPDATE `" . static::$table . "` SET $setString WHERE id = " . (int)$id;
        return $conn->query($sql);
    }


    /**
     * Delete a record by ID
     * @param int $id The record ID
     * @return mysqli_result|bool True on success, False on failure
     */
    public static function delete(int $id): mysqli_result|bool
    {
        $conn = self::getConnectionStatic();
        return $conn->query("DELETE FROM " . static::$table . " WHERE id = " . (int)$id);
    }
}
