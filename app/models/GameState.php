<?php
require_once __DIR__ . '/Model.php';

/**
 * GameState Model
 * Manages the overall game state for a student, such as the current story index
 * and whether they have finished the entire game.
 */
class GameState extends Model {
    /** @var string The table name associated with the model */
    public static string $table = 'game_state';

    /**
     * Retrieves the game state for a specific student.
     * If no state exists, it creates and returns a default state.
     * @param int $studentId The ID of the student
     * @return array|null Associative array of the game state record
     */
    public static function getByStudent(int $studentId): ?array
    {
        $conn = self::getConnectionStatic();
        $result = $conn->query("SELECT * FROM game_state WHERE student_id = " . (int)$studentId);

        if ($result->num_rows > 0) {
            return $result->fetch_assoc();
        } else {
            // Create default state
            $instance = new self();
            $id = $instance->create([
                'student_id' => $studentId,
                'current_story_index' => 0,
                'is_game_finished' => 0
            ]);
            return self::find($id);
        }
    }

    /**
     * Updates the game state based on the student's ID rather than the row ID.
     * @param int $studentId The ID of the student
     * @param array $data Associative array of column => value to update
     * @return mysqli_result|bool True on success, False on failure
     */
    public function updateByStudent(int $studentId, array $data): mysqli_result|bool
    {
        $conn = self::getConnectionStatic();
        $set = [];
        foreach ($data as $column => $value) {
            $safeValue = $conn->real_escape_string($value);
            $set[] = "$column = '$safeValue'";
        }
        $setString = implode(", ", $set);
        $sql = "UPDATE game_state SET $setString WHERE student_id = " . (int)$studentId;
        return $conn->query($sql);
    }
}
