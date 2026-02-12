<?php
require_once __DIR__ . '/Model.php';

class GameState extends Model {
    public static string $table = 'game_state';

    // Get state by student ID, or create default if none exists
    public static function getByStudent($studentId) {
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

    // Custom update method finding by student_id instead of row id
    public function updateByStudent($studentId, $data) {
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
