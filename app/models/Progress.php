<?php
require_once __DIR__ . '/Model.php';

class Progress extends Model {
    public static string $table = 'progress';

    // Get specific story progress
    public static function getDetails($studentId, $storyIndex) {
        $conn = self::getConnectionStatic();
        $sql = "SELECT * FROM progress WHERE student_id = " . (int)$studentId . " AND story_index = " . (int)$storyIndex;
        $result = $conn->query($sql);
        return $result->fetch_assoc();
    }

    // Save progress (Insert or Update)
    public function saveProgress($studentId, $storyIndex, $solvedWords, $foundIndices, $isCompleted) {
        $conn = self::getConnectionStatic();

        // Prepare JSON
        $solved = $conn->real_escape_string(json_encode($solvedWords));
        $indices = $conn->real_escape_string(json_encode($foundIndices));
        $completed = $isCompleted ? 1 : 0;

        // Check if exists
        $existing = self::getDetails($studentId, $storyIndex);

        if ($existing) {
            return $this->update($existing['id'], [
                'solved_words' => $solved, // pass raw string since update() escapes it again?
                // Wait, your Model::update escapes values. We must pass unescaped string but json_encoded.
                // Let's adjust slightly: pass the raw array to update()? No, the base model expects strings mostly.
                // Let's rely on the base model's escaping.
            ]);
            // ACTUALLY: The base model escapes everything. So we should pass the JSON string.
            // But we need to be careful not to double escape.
            // Let's just run a raw query here for safety since we have complex JSON.
            $sql = "UPDATE progress SET solved_words='$solved', found_indices='$indices', is_completed=$completed 
                    WHERE id=" . $existing['id'];
            return $conn->query($sql);
        } else {
            return $this->create([
                'student_id' => $studentId,
                'story_index' => $storyIndex,
                'solved_words' => json_encode($solvedWords), // Base model will escape this
                'found_indices' => json_encode($foundIndices), // Base model will escape this
                'is_completed' => $completed
            ]);
        }
    }

    // Get Dashboard Data (Joins)
    public static function getDashboardData() {
        $conn = self::getConnectionStatic();

        // 1. Get all students
        $students = $conn->query("SELECT * FROM students")->fetch_all(MYSQLI_ASSOC);
        $report = [];

        foreach($students as $s) {
            $sid = $s['id'];

            // Get Game State
            $stateParams = $conn->query("SELECT * FROM game_state WHERE student_id = $sid")->fetch_assoc();

            // Get All Progress Details
            $progResult = $conn->query("SELECT * FROM progress WHERE student_id = $sid");
            $details = [];
            $completedCount = 0;

            while($p = $progResult->fetch_assoc()) {
                if ($p['is_completed']) $completedCount++;
                $details[] = [
                    'story_index' => (int)$p['story_index'],
                    'score' => count(json_decode($p['solved_words'], true) ?? []),
                    'is_completed' => (bool)$p['is_completed']
                ];
            }

            $report[] = [
                'name' => $s['username'],
                'current_story_index' => $stateParams ? (int)$stateParams['current_story_index'] : 0,
                'is_game_finished' => $stateParams ? (bool)$stateParams['is_game_finished'] : false,
                'stories_finished' => $completedCount,
                'raw_details' => $details
            ];
        }
        return $report;
    }
}
