<?php
require_once __DIR__ . '/__init.php';

// load models
require_once __DIR__ . '/models/Admin.php';
require_once __DIR__ . '/models/Student.php';
require_once __DIR__ . '/models/GameState.php';
require_once __DIR__ . '/models/Progress.php';

$endpoint = $_GET['e'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true) ?? [];

// --- ADMIN LOGIN ---
if ($endpoint === 'admin_login' && $method === 'POST') {
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';

    $admin = Admin::authenticate($username, $password);

    if ($admin) {
        returnSuccess([
            'id' => $admin['id'],
            'username' => $admin['username']
        ]);
    } else {
        returnError(401, 'Invalid Admin Credentials');
    }
}

// --- LOGIN ---
if ($endpoint === 'login' && $method === 'POST') {
    $username = $input['username'] ?? '';
    if (!$username) returnError(400, 'Username required');

    // get or create Student
    $student = Student::loginOrRegister($username);

    // get game state
    $state = GameState::getByStudent($student['id']);

    // get progress for current story
    $progress = Progress::getDetails($student['id'], $state['current_story_index']);

    // robust decoding for login (handles bad data if it exists)
    $solved = [];
    $indices = [];

    if ($progress) {
        // try standard decode
        $s = json_decode($progress['solved_words']);
        $i = json_decode($progress['found_indices']);

        // if it returns a string (double escaped), decode again
        if (is_string($s)) $s = json_decode($s);
        if (is_string($i)) $i = json_decode($i);

        $solved = is_array($s) ? $s : [];
        $indices = is_array($i) ? $i : [];
    }

    returnSuccess([
        'student_id' => $student['id'],
        'username' => $student['username'],
        'current_story_index' => (int)$state['current_story_index'],
        'is_game_finished' => (bool)$state['is_game_finished'],
        'solved_words' => $progress ? json_decode($progress['solved_words']) : [],
        'found_indices' => $progress ? json_decode($progress['found_indices']) : []
    ]);
}

// --- SAVE PROGRESS ---
elseif ($endpoint === 'progress' && $method === 'POST') {
    $progressModel = new Progress();
    $progressModel->saveProgress(
        $input['student_id'],
        $input['story_index'],
        $input['solved_words'],
        $input['found_indices'],
        $input['is_completed']
    );
    returnSuccess('Progress Saved');
}

// --- SAVE STATE (Next Level / Finish) ---
elseif ($endpoint === 'state' && $method === 'POST') {
    $stateModel = new GameState();
    $stateModel->updateByStudent($input['student_id'], [
        'current_story_index' => $input['current_story_index'],
        'is_game_finished' => $input['is_game_finished'] ? 1 : 0
    ]);
    returnSuccess('State Updated');
}

// --- DASHBOARD ---
elseif ($endpoint === 'dashboard' && $method === 'GET') {
    $data = Progress::getDashboardData();
    returnSuccess($data);
}

// 404
returnError(404, 'Endpoint not found');
