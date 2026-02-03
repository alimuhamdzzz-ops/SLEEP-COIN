// ============================================
// SLEEPING CHARACTER - CANVAS BREATHING ANIMATION
// Fallback 2D implementation when Three.js is not available
// ============================================

// Canvas and context
let canvas, ctx;
let time = 0;
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
    
    // Hide loading screen
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
    
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
    ctx.translate(character.x + 80, character.y - 30 + breathOffset * 0.5);
    
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
    ctx.ellipse(85, -35, 35, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Hair highlights
    ctx.fillStyle = 'rgba(80, 50, 30, 0.5)';
    ctx.beginPath();
    ctx.ellipse(75, -40, 15, 10, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

function drawHead() {
    ctx.save();
    ctx.translate(85, -30);
    
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
    const bodyX = -20;
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
    for (let i = -80; i < 60; i += 15) {
        ctx.beginPath();
        ctx.moveTo(i, -50);
        ctx.lineTo(i, 30);
        ctx.stroke();
    }
    
    // Horizontal stripes
    for (let i = -45; i < 35; i += 15) {
        ctx.beginPath();
        ctx.moveTo(-90, i);
        ctx.lineTo(50, i);
        ctx.stroke();
    }
    
    // Darker plaid lines
    ctx.strokeStyle = '#cc4444';
    ctx.lineWidth = 2;
    
    for (let i = -73; i < 60; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, -50);
        ctx.lineTo(i, 30);
        ctx.stroke();
    }
    
    for (let i = -38; i < 35; i += 30) {
        ctx.beginPath();
        ctx.moveTo(-90, i);
        ctx.lineTo(50, i);
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
    ctx.ellipse(-70, 20, 20, 55, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Right leg (behind)
    ctx.beginPath();
    ctx.ellipse(-90, 25, 18, 50, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Polka dot pattern
    ctx.fillStyle = '#8fbc3f';
    const dots = [
        [-75, 5], [-65, 25], [-80, 40], [-60, 45],
        [-95, 15], [-85, 35], [-100, 50]
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
    ctx.moveTo(-130, 0);
    ctx.quadraticCurveTo(-100, -10, -60, 0);
    ctx.quadraticCurveTo(-20, 10, 20, 5);
    ctx.lineTo(20, 50);
    ctx.quadraticCurveTo(-20, 60, -80, 55);
    ctx.quadraticCurveTo(-120, 50, -130, 40);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Blanket texture
    ctx.strokeStyle = '#e8c0c0';
    ctx.lineWidth = 1;
    for (let i = -120; i < 10; i += 10) {
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

function animate() {
    requestAnimationFrame(animate);
    
    // Update time
    time += 0.016; // ~60 FPS
    
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
