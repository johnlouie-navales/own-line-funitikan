<?php
require_once __DIR__ . '/__init.php';

// Load Models
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
        // In a real app, you would set a SESSION or return a TOKEN here.
        // For this prototype, returning success allows the frontend to proceed.
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

    // 1. Get or Create Student
    $student = Student::loginOrRegister($username);

    // 2. Get Game State
    $state = GameState::getByStudent($student['id']);

    // 3. Get Progress for current story
    $progress = Progress::getDetails($student['id'], $state['current_story_index']);

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
