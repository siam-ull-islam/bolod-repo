const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

// Game Constants
const GRAVITY = 0.25;
const FLAP = -4.5;
const SPAWN_RATE = 100; // Lower is faster

// Game Variables
let birdY = 300;
let birdX = 50;
let birdVelocity = 0;
let pipes = [];
let frame = 0;
let score = 0;
let gameActive = true;

// Listen for input
window.addEventListener("keydown", flap);
window.addEventListener("touchstart", flap);

function flap() {
    if (!gameActive) {
        resetGame();
        return;
    }
    birdVelocity = FLAP;
}

function resetGame() {
    birdY = 300;
    birdVelocity = 0;
    pipes = [];
    score = 0;
    frame = 0;
    gameActive = true;
    scoreElement.innerText = "Score: 0";
    loop();
}

function createPipe() {
    const gap = 150;
    const minPipeHeight = 50;
    const pipeTopHeight = Math.random() * (canvas.height - gap - (minPipeHeight * 2)) + minPipeHeight;
    pipes.push({
        x: canvas.width,
        top: pipeTopHeight,
        bottom: pipeTopHeight + gap,
        passed: false
    });
}

function update() {
    if (!gameActive) return;

    // Bird Physics
    birdVelocity += GRAVITY;
    birdY += birdVelocity;

    // Pipe Management
    if (frame % SPAWN_RATE === 0) createPipe();

    pipes.forEach((pipe, index) => {
        pipe.x -= 2; // Move pipes left

        // Collision detection
        if (
            birdX + 20 > pipe.x && birdX < pipe.x + 50 &&
            (birdY < pipe.top || birdY + 20 > pipe.bottom)
        ) {
            gameActive = false;
        }

        // Scoring
        if (!pipe.passed && pipe.x < birdX) {
            score++;
            pipe.passed = true;
            scoreElement.innerText = `Score: ${score}`;
        }

        // Remove old pipes
        if (pipe.x < -50) pipes.splice(index, 1);
    });

    // Ground/Ceiling Collision
    if (birdY > canvas.height || birdY < 0) {
        gameActive = false;
    }

    frame++;
}

function draw() {
    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Bird
    ctx.fillStyle = "yellow";
    ctx.fillRect(birdX, birdY, 20, 20);

    // Draw Pipes
    ctx.fillStyle = "green";
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, 50, pipe.top); // Top pipe
        ctx.fillRect(pipe.x, pipe.bottom, 50, canvas.height); // Bottom pipe
    });

    if (!gameActive) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("GAME OVER", 110, 300);
        ctx.font = "15px Arial";
        ctx.fillText("Press any key to restart", 125, 340);
    }
}

function loop() {
    update();
    draw();
    if (gameActive) requestAnimationFrame(loop);
}

loop();