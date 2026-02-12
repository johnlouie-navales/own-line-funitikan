<?php
// Centralized CORS & Headers
header('Access-Control-Allow-Origin: *'); // Allow all for local dev
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/config/app.php';
require_once __DIR__ . '/config/database.php';

// Helper Functions
function returnSuccess($data): never {
    echo json_encode(['status' => 'success', 'data' => $data]);
    exit;
}

function returnError($statusCode, $message): never {
    http_response_code($statusCode);
    echo json_encode(['status' => 'error', 'message' => $message]);
    exit;
}
