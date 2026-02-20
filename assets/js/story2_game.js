let currentUserId = null;
const STORY_INDEX = 1;

// --- INITIALIZE USER ---
// noinspection DuplicatedCode
window.onload = async () => {
    const username = localStorage.getItem('funitikan_student');
    if (username) {
        try {
            const data = await FunitikanAPI.login(username);
            if (data) currentUserId = data.student_id;
        } catch (e) { console.error("API Error:", e); }
    } else {
        window.location.href = 'index.html';
    }
};
const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

// grid settings
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// snake and game variables
let snake = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
let velocity = { x: 0, y: -1 }; // start moving up
let coin = { x: 15, y: 5 };
let coinsCollected = 0;
let gameInterval;
let gameActive = true;
let glowPulse = 0; // for the glowing coin

// --- TIMER LOGIC ---
let timeLeft = 60;
let timerInterval = setInterval(() => {
    if (!gameActive) return;
    timeLeft--;
    document.getElementById("time-left").innerText = timeLeft.toString();
    if (timeLeft <= 0) {
        triggerGameOver();
    }
}, 1000);

// start the game loop
gameInterval = setInterval(drawGame, 150);

function drawGame() {
    if (!gameActive) return;

    // move the snake
    let headX = snake[0].x + velocity.x;
    let headY = snake[0].y + velocity.y;

    // wrap around borders
    if (headX < 0) headX = tileCount - 1;
    if (headX >= tileCount) headX = 0;
    if (headY < 0) headY = tileCount - 1;
    if (headY >= tileCount) headY = 0;

    snake.unshift({ x: headX, y: headY });

    // check if coin is eaten
    if (headX === coin.x && headY === coin.y) {
        coinsCollected++;
        document.getElementById("coin-count").innerText = coinsCollected.toString();

        if (coinsCollected >= 5) {
            triggerVictory();
        } else {
            spawnCoin();
        }
    } else {
        snake.pop();
    }

    // draw textured background
    ctx.fillStyle = "#222226";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#2a2a2e";
    ctx.lineWidth = 2;
    for(let i = 0; i < tileCount; i++) {
        // draw a subtle diagonal weave pattern
        ctx.beginPath();
        ctx.moveTo(i * gridSize * 2, 0);
        ctx.lineTo(0, i * gridSize * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvas.width - i * gridSize * 2, canvas.height);
        ctx.lineTo(canvas.width, canvas.height - i * gridSize * 2);
        ctx.stroke();
    }

    // draw glowing coin
    glowPulse += 0.2;
    let glowSize = Math.abs(Math.sin(glowPulse)) * 4;
    let cx = coin.x * gridSize + gridSize/2;
    let cy = coin.y * gridSize + gridSize/2;

    ctx.shadowBlur = 15 + glowSize;
    ctx.shadowColor = "#f1c40f";
    ctx.fillStyle = "#f39c12";
    ctx.beginPath();
    ctx.arc(cx, cy, gridSize/2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // Reset shadow for the snake

    // draw snake body
    const bodyColors = ['#9b59b6', '#1abc9c', '#f5f5dc'];

    for (let i = snake.length - 1; i >= 0; i--) {
        let part = snake[i];
        let px = part.x * gridSize + gridSize/2;
        let py = part.y * gridSize + gridSize/2;

        // draw segment
        ctx.fillStyle = bodyColors[i % bodyColors.length];
        ctx.beginPath();
        // make segments slightly larger than grid to overlap
        ctx.arc(px, py, gridSize/1.3, 0, Math.PI * 2);
        ctx.fill();

        // subtle border for overlap effect
        ctx.strokeStyle = "rgba(0,0,0,0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // draw snake head and eyes
        if (i === 0) {
            // head base color
            ctx.fillStyle = "#e5c07b"; // face color
            ctx.beginPath();
            ctx.arc(px, py, gridSize/1.1, 0, Math.PI * 2);
            ctx.fill();

            // eyes setup based on direction
            ctx.fillStyle = "white";
            let eyeOffsetX = velocity.x === 0 ? 5 : 0;
            let eyeOffsetY = velocity.y === 0 ? 5 : 0;

            if(velocity.x === 1) eyeOffsetX = 4; // moving right
            if(velocity.x === -1) eyeOffsetX = -4; // moving left
            if(velocity.y === 1) eyeOffsetY = 4; // moving down
            if(velocity.y === -1) eyeOffsetY = -4; // moving up

            // draw Whites of eyes
            ctx.beginPath();
            ctx.arc(px - eyeOffsetX, py - eyeOffsetY, 4, 0, Math.PI * 2);
            ctx.arc(px + eyeOffsetX, py + eyeOffsetY, 4, 0, Math.PI * 2);
            ctx.fill();

            // draw Pupils
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(px - eyeOffsetX + (velocity.x*1.5), py - eyeOffsetY + (velocity.y*1.5), 2, 0, Math.PI * 2);
            ctx.arc(px + eyeOffsetX + (velocity.x*1.5), py + eyeOffsetY + (velocity.y*1.5), 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

function spawnCoin() {
    coin.x = Math.floor(Math.random() * tileCount);
    coin.y = Math.floor(Math.random() * tileCount);
    for (let part of snake) {
        if (part.x === coin.x && part.y === coin.y) spawnCoin();
    }
}

function triggerGameOver() {
    gameActive = false;
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    document.getElementById("game-over-modal").style.display = "flex";
}

function triggerVictory() {
    gameActive = false;
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    document.getElementById("question-modal").style.display = "flex";
}

// --- KEYBOARD CONTROLS ---
document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp" && velocity.y !== 1) velocity = { x: 0, y: -1 };
    if (event.key === "ArrowDown" && velocity.y !== -1) velocity = { x: 0, y: 1 };
    if (event.key === "ArrowLeft" && velocity.x !== 1) velocity = { x: -1, y: 0 };
    if (event.key === "ArrowRight" && velocity.x !== -1) velocity = { x: 1, y: 0 };
});

// --- SWIPE CONTROLS ---
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
    event.preventDefault();
}, {passive: false});

canvas.addEventListener('touchend', function(event) {
    let touchEndX = event.changedTouches[0].screenX;
    let touchEndY = event.changedTouches[0].screenY;
    handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY);
}, false);

function handleSwipe(startX, startY, endX, endY) {
    let diffX = endX - startX;
    let diffY = endY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0 && velocity.x !== -1) velocity = { x: 1, y: 0 };
        else if (diffX < 0 && velocity.x !== 1) velocity = { x: -1, y: 0 };
    } else {
        if (diffY > 0 && velocity.y !== -1) velocity = { x: 0, y: 1 };
        else if (diffY < 0 && velocity.y !== 1) velocity = { x: 0, y: -1 };
    }
}

function submitAnswers() {
    const ans1 = document.getElementById("q1").value;
    const ans2 = document.getElementById("q2").value;
    const ans3 = document.getElementById("q3").value;

    if (!ans1 || !ans2 || !ans3) {
        alert("Sagutan lahat ng katanungan bago ipasa.");
        return;
    }

    // hide the question form
    document.getElementById("question-modal").style.display = "none";
    // Show the beautiful success modal
    document.getElementById("success-modal").style.display = "flex";
}

async function goToNextStory() {
    if (currentUserId) {
        // grab the essay answers
        const essayAnswers = {
            "Q1": document.getElementById("q1").value,
            "Q2": document.getElementById("q2").value,
            "Q3": document.getElementById("q3").value
        };

        // save progress (pass empty arrays for words, but send the answers object)
        await FunitikanAPI.saveProgress(currentUserId, STORY_INDEX, [], [], true, timeLeft, essayAnswers);

        // increment state to story 3
        await FunitikanAPI.saveState(currentUserId, STORY_INDEX + 1, false);
    }
    window.location.href = "index.html";
}