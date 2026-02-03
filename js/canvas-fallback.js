// ============================================
// SLEEPING CHARACTER - CANVAS BREATHING ANIMATION
// Fallback 2D implementation when Three.js is not available
// ============================================

// Canvas and context
let canvas, ctx;
let time = 0;
let lastFrameTime = 0;
const breathingSpeed = 0.5;
const breathingIntensity = 0.15;

// Character properties
const character = {
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0
};

// Loading screen elements
const loadingScreen = document.getElementById('loading-screen');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

// ============================================
// INITIALIZATION
// ============================================

function init() {
    canvas = document.getElementById('scene-canvas');
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animate progress bar
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 5;
        progressFill.style.width = progress + '%';
        progressText.textContent = progress + '%';
        if (progress >= 100) {
            clearInterval(progressInterval);
            // Hide loading screen
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 300);
        }
    }, 30);
    
    // Start animation
    animate();
    
    console.log('Canvas breathing animation initialized');
}

// ============================================
// RESIZE HANDLER
// ============================================

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Update character position to center
    character.x = canvas.width / 2;
    character.y = canvas.height / 2;
}

// ============================================
// DRAWING FUNCTIONS
// ============================================

function drawScene() {
    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#e0f7fa');
    gradient.addColorStop(1, '#f3e5f5');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw ground shadow
    drawGroundShadow();
    
    // Draw bed
    drawBed();
    
    // Draw pillow
    drawPillow();
    
    // Draw sleeping character
    drawCharacter();
    
    // Draw blanket
    drawBlanket();
}

function drawGroundShadow() {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.beginPath();
    ctx.ellipse(character.x, character.y + 120, 180, 40, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function drawBed() {
    ctx.save();
    ctx.translate(character.x, character.y);
    
    // Bed base
    ctx.fillStyle = '#f5f5dc';
    ctx.strokeStyle = '#d4d4c8';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.rect(-150, 40, 300, 60);
    ctx.fill();
    ctx.stroke();
    
    // Bed texture
    ctx.strokeStyle = '#e8e8dc';
    for (let i = -140; i < 140; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 45);
        ctx.lineTo(i, 95);
        ctx.stroke();
    }
    
    ctx.restore();
}

function drawPillow() {
    // Calculate breathing offset
    const breathOffset = Math.sin(time * breathingSpeed) * breathingIntensity * 15;
    
    ctx.save();
    ctx.translate(character.x + 95, character.y - 30 + breathOffset * 0.5);
    
    // Pillow
    ctx.fillStyle = '#f5e6d3';
    ctx.strokeStyle = '#e0d4c0';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.ellipse(0, 0, 60, 35, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Pillow shading
    const pillowGradient = ctx.createRadialGradient(-15, -10, 0, 0, 0, 50);
    pillowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    pillowGradient.addColorStop(1, 'rgba(0, 0, 0, 0.05)');
    ctx.fillStyle = pillowGradient;
    ctx.fill();
    
    ctx.restore();
}

function drawCharacter() {
    // Calculate breathing offset
    const breathOffset = Math.sin(time * breathingSpeed) * breathingIntensity * 15;
    const breathScale = 1.0 + Math.sin(time * breathingSpeed) * breathingIntensity * 0.08;
    
    ctx.save();
    // Center the character properly
    ctx.translate(character.x, character.y + breathOffset);
    
    // Draw hair (behind head)
    drawHair();
    
    // Draw head
    drawHead();
    
    // Draw body with breathing
    drawBody(breathScale);
    
    // Draw legs
    drawLegs();
    
    ctx.restore();
}

function drawHair() {
    ctx.save();
    
    // Hair color
    ctx.fillStyle = '#2c1810';
    
    // Hair shape (ponytail/loose)
    ctx.beginPath();
    ctx.ellipse(100, -35, 35, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Hair highlights
    ctx.fillStyle = 'rgba(80, 50, 30, 0.5)';
    ctx.beginPath();
    ctx.ellipse(90, -40, 15, 10, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

function drawHead() {
    ctx.save();
    ctx.translate(100, -30);
    
    // Head (skin tone)
    ctx.fillStyle = '#ffd0b0';
    ctx.strokeStyle = '#e8b896';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.ellipse(0, 0, 32, 36, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Facial shading
    const faceGradient = ctx.createRadialGradient(-8, -8, 0, 0, 0, 35);
    faceGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    faceGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = faceGradient;
    ctx.fill();
    
    // Closed eyes
    ctx.strokeStyle = '#4a2c1c';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    // Left eye
    ctx.beginPath();
    ctx.arc(-8, -2, 8, 0.1, Math.PI - 0.1);
    ctx.stroke();
    
    // Right eye
    ctx.beginPath();
    ctx.arc(8, -2, 8, 0.1, Math.PI - 0.1);
    ctx.stroke();
    
    // Peaceful smile
    ctx.beginPath();
    ctx.arc(0, 8, 6, 0.2, Math.PI - 0.2);
    ctx.stroke();
    
    // Rosy cheeks
    ctx.fillStyle = 'rgba(255, 150, 150, 0.3)';
    ctx.beginPath();
    ctx.ellipse(-12, 5, 8, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(12, 5, 8, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

function drawBody(breathScale) {
    ctx.save();
    ctx.scale(breathScale, breathScale);
    
    // Body (plaid shirt - orange/red checkered)
    const bodyWidth = 80;
    const bodyHeight = 50;
    const bodyX = 30;
    const bodyY = -10;
    
    // Shirt base color
    ctx.fillStyle = '#ff6b6b';
    ctx.strokeStyle = '#d64545';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.ellipse(bodyX, bodyY, bodyWidth, bodyHeight, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Plaid pattern
    ctx.strokeStyle = '#ff9999';
    ctx.lineWidth = 3;
    
    // Vertical stripes
    for (let i = -40; i < 90; i += 15) {
        ctx.beginPath();
        ctx.moveTo(i, -50);
        ctx.lineTo(i, 30);
        ctx.stroke();
    }
    
    // Horizontal stripes
    for (let i = -45; i < 35; i += 15) {
        ctx.beginPath();
        ctx.moveTo(-50, i);
        ctx.lineTo(100, i);
        ctx.stroke();
    }
    
    // Darker plaid lines
    ctx.strokeStyle = '#cc4444';
    ctx.lineWidth = 2;
    
    for (let i = -33; i < 90; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, -50);
        ctx.lineTo(i, 30);
        ctx.stroke();
    }
    
    for (let i = -38; i < 35; i += 30) {
        ctx.beginPath();
        ctx.moveTo(-50, i);
        ctx.lineTo(100, i);
        ctx.stroke();
    }
    
    ctx.restore();
}

function drawLegs() {
    ctx.save();
    
    // Legs (green pants with pattern)
    ctx.fillStyle = '#6b8e23';
    ctx.strokeStyle = '#556b1f';
    ctx.lineWidth = 2;
    
    // Left leg
    ctx.beginPath();
    ctx.ellipse(-20, 20, 20, 55, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Right leg (behind)
    ctx.beginPath();
    ctx.ellipse(-40, 25, 18, 50, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Polka dot pattern
    ctx.fillStyle = '#8fbc3f';
    const dots = [
        [-25, 5], [-15, 25], [-30, 40], [-10, 45],
        [-45, 15], [-35, 35], [-50, 50]
    ];
    
    dots.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
    
    ctx.restore();
}

function drawBlanket() {
    ctx.save();
    ctx.translate(character.x, character.y);
    
    // Blanket (soft pink/beige)
    ctx.fillStyle = '#d4a5a5';
    ctx.strokeStyle = '#c09090';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(-80, 0);
    ctx.quadraticCurveTo(-50, -10, -10, 0);
    ctx.quadraticCurveTo(30, 10, 70, 5);
    ctx.lineTo(70, 50);
    ctx.quadraticCurveTo(30, 60, -30, 55);
    ctx.quadraticCurveTo(-70, 50, -80, 40);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Blanket texture
    ctx.strokeStyle = '#e8c0c0';
    ctx.lineWidth = 1;
    for (let i = -70; i < 60; i += 10) {
        ctx.beginPath();
        ctx.moveTo(i, 5);
        ctx.lineTo(i, 50);
        ctx.stroke();
    }
    
    ctx.restore();
}

// ============================================
// BREATHING ANIMATION
// ============================================

function animate(timestamp) {
    requestAnimationFrame(animate);
    
    // Calculate delta time for frame-rate independent animation
    if (!lastFrameTime) lastFrameTime = timestamp;
    const deltaTime = (timestamp - lastFrameTime) / 1000; // Convert to seconds
    lastFrameTime = timestamp;
    
    // Update time (capped to prevent huge jumps)
    time += Math.min(deltaTime, 0.1);
    
    // Draw scene
    drawScene();
}

// ============================================
// START APPLICATION
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
