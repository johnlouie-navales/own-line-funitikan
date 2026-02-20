let currentUserId = null;
const STORY_INDEX = 2;

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

// --- GAME SETUP & CONSTANTS ---
const canvas = document.getElementById("bubbleGame");
const ctx = canvas.getContext("2d");

const RADIUS = 20;
const DIAMETER = RADIUS * 2;
const ROW_HEIGHT = RADIUS * Math.sqrt(3);
const COLS = Math.floor(canvas.width / DIAMETER);
const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#a855f7']; // Tailwind Red, Blue, Green, Yellow, Purple

let score = 0;
let gameActive = true;
let particles = [];
let timeLeft = 60;
let grid = [];
let currentBubble = null;
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

// --- INITIALIZE HEXAGONAL GRID ---
function initGrid() {
    grid = [];
    for (let row = 0; row < 5; row++) {
        let colsInRow = row % 2 === 0 ? COLS : COLS - 1;
        let rowArray = [];
        for (let col = 0; col < colsInRow; col++) {
            rowArray.push({
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                row: row,
                col: col
            });
        }
        grid.push(rowArray);
    }
}
initGrid();

function getBubbleCoords(row, col) {
    let x = col * DIAMETER + RADIUS + (row % 2 === 0 ? 0 : RADIUS);
    let y = row * ROW_HEIGHT + RADIUS;
    return { x, y };
}

// --- SHOOTER SETUP ---
function spawnBubble() {
    currentBubble = {
        x: canvas.width / 2,
        y: canvas.height - RADIUS,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        vx: 0,
        vy: 0,
        isMoving: false
    };
}
spawnBubble();

// --- INPUT HANDLING (Aiming & Shooting) ---
function updateAim(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    mouseX = clientX - rect.left;
    mouseY = clientY - rect.top;
}

function shootBubble() {
    if (!currentBubble || currentBubble.isMoving || !gameActive) return;

    let dx = mouseX - currentBubble.x;
    let dy = mouseY - currentBubble.y;
    let angle = Math.atan2(dy, dx);

    // Prevent shooting downwards
    if (angle > 0) angle = -0.1;

    let speed = 15;
    currentBubble.vx = Math.cos(angle) * speed;
    currentBubble.vy = Math.sin(angle) * speed;
    currentBubble.isMoving = true;
}

// mouse controls
canvas.addEventListener('mousemove', e => updateAim(e.clientX, e.clientY));
canvas.addEventListener('mousedown', shootBubble);

// touch controls for cellphones
canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    updateAim(e.touches[0].clientX, e.touches[0].clientY);
}, {passive: false});
canvas.addEventListener('touchend', shootBubble);

// --- COLLISION & PHYSICS ---
function checkCollision() {
    if (!currentBubble.isMoving) return;

    // bounce off left/right walls
    if (currentBubble.x - RADIUS <= 0 || currentBubble.x + RADIUS >= canvas.width) {
        currentBubble.vx *= -1;
    }

    let hit = false;

    // hit top wall
    if (currentBubble.y - RADIUS <= 0) hit = true;

    // check collision with other bubbles using Pythagorean theorem
    if (!hit) {
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                let b = grid[row][col];
                if (!b) continue;

                let coords = getBubbleCoords(row, col);
                let dx = currentBubble.x - coords.x;
                let dy = currentBubble.y - coords.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < DIAMETER - 2) {
                    hit = true;
                    break;
                }
            }
            if(hit) break;
        }
    }

    if (hit) snapBubble();
}

function snapBubble() {
    currentBubble.isMoving = false;

    // calculate nearest grid slot
    let row = Math.round((currentBubble.y - RADIUS) / ROW_HEIGHT);
    if (row < 0) row = 0;

    let offset = (row % 2 === 0) ? 0 : RADIUS;
    let col = Math.round((currentBubble.x - RADIUS - offset) / DIAMETER);

    // safety bounds
    let maxCols = (row % 2 === 0) ? COLS : COLS - 1;
    if (col < 0) col = 0;
    if (col >= maxCols) col = maxCols - 1;

    // ensure array row exists
    while (grid.length <= row) grid.push([]);

    // place bubble
    grid[row][col] = {
        color: currentBubble.color,
        row: row,
        col: col
    };

    // check matches
    findMatches(row, col, currentBubble.color);
    spawnBubble();
}

// --- MATCH-3 LOGIC (Flood Fill Algorithm) ---
function getNeighbors(row, col) {
    let isOdd = row % 2 !== 0;
    let neighbors = [
        {r: row, c: col - 1}, {r: row, c: col + 1}, // Left, Right
        {r: row - 1, c: col}, {r: row + 1, c: col}, // Top, Bottom (straight)
        {r: row - 1, c: isOdd ? col + 1 : col - 1}, // Top Diagonal
        {r: row + 1, c: isOdd ? col + 1 : col - 1}  // Bottom Diagonal
    ];
    return neighbors.filter(n => n.r >= 0 && n.r < grid.length && n.c >= 0 && n.c < (n.r % 2 === 0 ? COLS : COLS - 1));
}

function findMatches(startRow, startCol, targetColor) {
    let toProcess = [{r: startRow, c: startCol}];
    let matched = [];
    let visited = new Set();

    while (toProcess.length > 0) {
        let current = toProcess.pop();
        let key = `${current.r},${current.c}`;

        if (visited.has(key)) continue;
        visited.add(key);

        if (grid[current.r] && grid[current.r][current.c] && grid[current.r][current.c].color === targetColor) {
            matched.push(current);
            let neighbors = getNeighbors(current.r, current.c);
            toProcess.push(...neighbors);
        }
    }

    if (matched.length >= 3) {
        // pop bubbles with animation
        matched.forEach(m => {
            let coords = getBubbleCoords(m.r, m.c);
            let color = grid[m.r][m.c].color;

            // trigger the explosion effect before deleting
            createExplosion(coords.x, coords.y, color);

            delete grid[m.r][m.c];
        });

        score++;
        document.getElementById("coin-count").innerText = score.toString();

        if (score >= 5) triggerVictory();
    }
}

function triggerVictory() {
    gameActive = false;
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    document.getElementById("question-modal").style.display = "flex";
}

// --- TIMER ---
let timerInterval = setInterval(() => {
    if (!gameActive) return;
    timeLeft--;
    document.getElementById("time-left").innerText = timeLeft.toString();
    if (timeLeft <= 0) {
        gameActive = false;
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        document.getElementById("game-over-modal").style.display = "flex";
    }
}, 1000);

// --- RENDER LOOP ---
let gameInterval = setInterval(drawGame, 1000 / 60);

function drawGame() {
    if (!gameActive) return;

    // update physics
    if (currentBubble && currentBubble.isMoving) {
        currentBubble.x += currentBubble.vx;
        currentBubble.y += currentBubble.vy;
        checkCollision();
    }

    // clear canvas
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw grid bubbles
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            let b = grid[row][col];
            if (!b) continue;
            let coords = getBubbleCoords(row, col);
            drawCircle(coords.x, coords.y, b.color);
        }
    }

    // draw aim line
    if (currentBubble && !currentBubble.isMoving) {
        ctx.beginPath();
        ctx.moveTo(currentBubble.x, currentBubble.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.setLineDash([]);
    }

    // draw current bubble
    if (currentBubble) {
        drawCircle(currentBubble.x, currentBubble.y, currentBubble.color);
    }

    // --- DRAW EXPLOSION PARTICLES ---
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
            particles.splice(i, 1); // remove dead particles
            continue;
        }

        ctx.globalAlpha = p.alpha; // set fading transparency
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.globalAlpha = 1.0; // reset transparency for the rest of the game
    }
}

function drawCircle(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, RADIUS - 1, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    // bubble highlight reflection
    ctx.beginPath();
    ctx.arc(x - 6, y - 6, RADIUS / 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fill();
}

// --- PARTICLE EXPLOSION SYSTEM ---
function createExplosion(x, y, color) {
    for (let i = 0; i < 8; i++) {
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 12, // random X velocity
            vy: (Math.random() - 0.5) * 12, // random Y velocity
            radius: Math.random() * (RADIUS / 2) + 2, // random size
            color: color,
            alpha: 1, // start fully visible
            decay: Math.random() * 0.05 + 0.03 // how fast it fades
        });
    }
}

// --- SUBMIT ANSWERS ---
function submitAnswers() {
    const q1 = document.getElementById("q1").value;
    const q2 = document.getElementById("q2").value;
    const q3 = document.getElementById("q3").value;
    const q4 = document.getElementById("q4").value;
    const q5 = document.getElementById("q5").value;

    if (!q1 || !q2 || !q3 || !q4 || !q5) {
        alert("Sagutan lahat ng katanungan bago ipasa.");
        return;
    }

    document.getElementById("question-modal").style.display = "none";
    document.getElementById("success-modal").style.display = "flex";
}

// --- SAVE TO DATABASE ---
async function goToNextStory() {
    if (currentUserId) {
        const essayAnswers = {
            "Q1": document.getElementById("q1").value,
            "Q2": document.getElementById("q2").value,
            "Q3": document.getElementById("q3").value,
            "Q4": document.getElementById("q4").value,
            "Q5": document.getElementById("q5").value
        };

        // save progress (story 3, completed)
        await FunitikanAPI.saveProgress(currentUserId, STORY_INDEX, [], [], true, timeLeft, essayAnswers);

        // finalize game state
        await FunitikanAPI.saveState(currentUserId, STORY_INDEX, true);
    }
    window.location.href = "index.html";
}