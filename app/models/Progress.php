<?php
require_once __DIR__ . '/Model.php';

/**
 * Progress Model
 * Manages the specific game progress for each story, including found words,
 * indices, and completion status. Also generates the aggregated dashboard data.
 */
class Progress extends Model {
    /** @var string The table name associated with the model */
    public static string $table = 'progress';

    /**
     * Retrieves the progress record for a specific student and story.
     *
     * @param int $studentId The ID of the student
     * @param int $storyIndex The index of the story (0-based)
     * @return array|null Associative array of the progress record or null if not found
     */
    public static function getDetails(int $studentId, int $storyIndex): ?array
    {
        $conn = self::getConnectionStatic();
        $sql = "SELECT * FROM progress WHERE student_id = " . (int)$studentId . " AND story_index = " . (int)$storyIndex;
        $result = $conn->query($sql);
        return $result->fetch_assoc();
    }

    /**
     * Saves or updates the student's progress for a specific story.
     * Automatically handles JSON encoding of arrays before storage.
     *
     * @param int $studentId The ID of the student
     * @param int $storyIndex The index of the story
     * @param array $solvedWords Array of strings representing found words
     * @param array $foundIndices Array of integers representing grid indices
     * @param bool $isCompleted Whether the level is finished
     * @return mysqli_result|bool|int|string Returns ID on create, boolean on update
     */
    public function saveProgress(int $studentId, int $storyIndex, array $solvedWords, array $foundIndices, bool $isCompleted): mysqli_result|bool|int|string
    {
        $solvedJSON = json_encode($solvedWords);
        $indicesJSON = json_encode($foundIndices);
        $completed = $isCompleted ? 1 : 0;

        // Check if exists
        $existing = self::getDetails($studentId, $storyIndex);

        if ($existing) {
            return $this->update($existing['id'], [
                'solved_words' => $solvedJSON,
                'found_indices' => $indicesJSON,
                'is_completed' => $completed
            ]);
        } else {
            return $this->create([
                'student_id' => $studentId,
                'story_index' => $storyIndex,
                'solved_words' => $solvedJSON,
                'found_indices' => $indicesJSON,
                'is_completed' => $completed
            ]);
        }
    }

    /**
     * Aggregates data from Students, GameState, and Progress tables
     * to generate a comprehensive report for the Admin Dashboard.
     * Includes robust JSON decoding to handle potential legacy data issues.
     *
     * @return array Array of student progress reports
     */
    public static function getDashboardData(): array
    {
        $conn = self::getConnectionStatic();

        $students = $conn->query("SELECT * FROM students")->fetch_all(MYSQLI_ASSOC);
        $report = [];

        foreach($students as $s) {
            $sid = $s['id'];

            // get game state
            $stateParams = $conn->query("SELECT * FROM game_state WHERE student_id = $sid")->fetch_assoc();

            // get all progress details
            $progResult = $conn->query("SELECT * FROM progress WHERE student_id = $sid");
            $details = [];
            $completedCount = 0;

            while($p = $progResult->fetch_assoc()) {
                // --- ROBUST DECODING LOGIC ---
                $rawSolved = $p['solved_words'];
                $solved = json_decode($rawSolved);

                // if it was double-escaped, decode one more time
                if (is_string($solved)) {
                    $solved = json_decode($solved);
                }
                // ensure it is an array
                if (!is_array($solved)) {
                    $solved = [];
                }

                $score = count($solved);
                // ----------------------------

                if ($p['is_completed']) $completedCount++;

                $details[] = [
                    'story_index' => (int)$p['story_index'],
                    'score' => $score,
                    'is_completed' => (bool)$p['is_completed']
                ];
            }

            $report[] = [
                'name' => $s['username'],
                'current_story_index' => $stateParams ? (int)$stateParams['current_story_index'] : 0,
                'is_game_finished' => $stateParams && (bool)$stateParams['is_game_finished'],
                'stories_finished' => $completedCount,
                'raw_details' => $details
            ];
        }
        return $report;
    }
}
