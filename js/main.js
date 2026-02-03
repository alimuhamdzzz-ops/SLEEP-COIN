// ============================================
// 3D SLEEPING CHARACTER - BREATHING ANIMATION
// ============================================

// Scene, Camera, Renderer
let scene, camera, renderer, canvas;
let character, characterMixer, breathingAnimation;
let clock = new THREE.Clock();

// Animation parameters
let time = 0;
const breathingSpeed = 0.5; // Controls breathing frequency (lower = slower)
const breathingIntensity = 0.15; // Controls breath depth

// Character parts for animation (will be populated after model loads)
let chestBone, spineBone, headBone;
let characterBaseY = 0;
let headBaseY = 0;

// Lighting
let ambientLight, directionalLight, fillLight;

// Controls
let controls;

// Loading Manager
const loadingManager = new THREE.LoadingManager();
const loadingScreen = document.getElementById('loading-screen');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

// ============================================
// INITIALIZATION
// ============================================

function init() {
    // Check WebGL support
    if (!isWebGLAvailable()) {
        document.getElementById('webgl-error').style.display = 'block';
        loadingScreen.style.display = 'none';
        return;
    }

    canvas = document.getElementById('scene-canvas');

    // Scene Setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe8f5f7); // Soft sky blue
    scene.fog = new THREE.Fog(0xe8f5f7, 10, 50);

    // Camera Setup
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 1.5, 4);
    camera.lookAt(0, 0.5, 0);

    // Renderer Setup
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputEncoding = THREE.sRGBEncoding;

    // Orbit Controls (gentle rotation) - Simplified without OrbitControls
    // controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.05;
    // controls.enablePan = false;
    // controls.minDistance = 2;
    // controls.maxDistance = 8;
    // controls.maxPolarAngle = Math.PI / 2;
    // controls.autoRotate = true;
    // controls.autoRotateSpeed = 0.5;

    // Setup Lighting
    setupLighting();

    // Setup Scene Environment
    setupEnvironment();

    // Loading Manager Events
    loadingManager.onProgress = function (url, loaded, total) {
        const progress = (loaded / total) * 100;
        progressFill.style.width = progress + '%';
        progressText.textContent = Math.round(progress) + '%';
        console.log(`Loading: ${loaded}/${total} - ${url}`);
    };

    loadingManager.onLoad = function () {
        console.log('All assets loaded');
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 500);
    };

    loadingManager.onError = function (url) {
        console.error('Error loading:', url);
        document.getElementById('model-error').style.display = 'block';
        loadingScreen.style.display = 'none';
    };

    // Load 3D Character Model
    loadCharacterModel();

    // Handle Window Resize
    window.addEventListener('resize', onWindowResize);

    // Start Animation Loop
    animate();
}

// ============================================
// LIGHTING SETUP
// ============================================

function setupLighting() {
    // Ambient Light - soft overall illumination
    ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Directional Light - main light with shadows
    directionalLight = new THREE.DirectionalLight(0xfff5e6, 1.0);
    directionalLight.position.set(5, 8, 3);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    directionalLight.shadow.bias = -0.0001;
    scene.add(directionalLight);

    // Fill Light - warm light from other side for depth
    fillLight = new THREE.DirectionalLight(0xffddaa, 0.4);
    fillLight.position.set(-5, 3, -3);
    scene.add(fillLight);

    // Hemisphere Light - sky and ground colors
    const hemiLight = new THREE.HemisphereLight(0xddeeff, 0xf5e6d3, 0.5);
    scene.add(hemiLight);
}

// ============================================
// ENVIRONMENT SETUP
// ============================================

function setupEnvironment() {
    // Ground Plane
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.ShadowMaterial({
        opacity: 0.3
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    // Bed Platform (simple representation)
    const bedGeometry = new THREE.BoxGeometry(2, 0.3, 1.5);
    const bedMaterial = new THREE.MeshStandardMaterial({
        color: 0xf5f5dc,
        roughness: 0.8,
        metalness: 0.1
    });
    const bed = new THREE.Mesh(bedGeometry, bedMaterial);
    bed.position.set(0, 0.15, 0);
    bed.castShadow = true;
    bed.receiveShadow = true;
    scene.add(bed);

    // Pillow
    const pillowGeometry = new THREE.BoxGeometry(0.5, 0.15, 0.4);
    const pillowMaterial = new THREE.MeshStandardMaterial({
        color: 0xf5e6d3,
        roughness: 0.9,
        metalness: 0.0
    });
    const pillow = new THREE.Mesh(pillowGeometry, pillowMaterial);
    pillow.position.set(0, 0.38, 0.3);
    pillow.rotation.z = 0.1;
    pillow.castShadow = true;
    pillow.receiveShadow = true;
    scene.add(pillow);

    // Optional: Add blanket
    const blanketGeometry = new THREE.BoxGeometry(1.8, 0.1, 1.2);
    const blanketMaterial = new THREE.MeshStandardMaterial({
        color: 0xd4a5a5,
        roughness: 0.85,
        metalness: 0.0
    });
    const blanket = new THREE.Mesh(blanketGeometry, blanketMaterial);
    blanket.position.set(0, 0.35, -0.2);
    blanket.castShadow = true;
    blanket.receiveShadow = true;
    scene.add(blanket);
}

// ============================================
// CHARACTER MODEL LOADING
// ============================================

function loadCharacterModel() {
    // Since GLTFLoader may not be available, create placeholder directly
    console.log('Creating placeholder character (GLTFLoader not available in this setup)');
    createPlaceholderCharacter();
    
    // Simulate loading complete
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
}

// ============================================
// PLACEHOLDER CHARACTER (IF MODEL MISSING)
// ============================================

function createPlaceholderCharacter() {
    // Create a simple placeholder character
    const group = new THREE.Group();
    
    // Body
    const bodyGeometry = new THREE.CapsuleGeometry(0.15, 0.6, 8, 16);
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0xff6b6b, // Plaid shirt approximation
        roughness: 0.7,
        metalness: 0.1
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.z = Math.PI / 2;
    body.position.set(0, 0.5, 0);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.12, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd0b0,
        roughness: 0.6,
        metalness: 0.0
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0.35, 0.5, 0);
    head.castShadow = true;
    head.receiveShadow = true;
    group.add(head);
    
    // Hair
    const hairGeometry = new THREE.SphereGeometry(0.13, 32, 32);
    const hairMaterial = new THREE.MeshStandardMaterial({
        color: 0x2c1810,
        roughness: 0.4,
        metalness: 0.1
    });
    const hair = new THREE.Mesh(hairGeometry, hairMaterial);
    hair.position.set(0.35, 0.55, 0);
    hair.scale.set(1, 0.8, 1);
    hair.castShadow = true;
    group.add(hair);
    
    // Legs (green pants)
    const legGeometry = new THREE.CapsuleGeometry(0.08, 0.5, 8, 16);
    const legMaterial = new THREE.MeshStandardMaterial({
        color: 0x6b8e23, // Green pants
        roughness: 0.8,
        metalness: 0.0
    });
    
    const leg1 = new THREE.Mesh(legGeometry, legMaterial);
    leg1.rotation.z = Math.PI / 2;
    leg1.position.set(-0.2, 0.4, 0.1);
    leg1.castShadow = true;
    group.add(leg1);
    
    const leg2 = new THREE.Mesh(legGeometry, legMaterial);
    leg2.rotation.z = Math.PI / 2;
    leg2.position.set(-0.2, 0.4, -0.1);
    leg2.castShadow = true;
    group.add(leg2);
    
    // Store references for animation
    character = group;
    chestBone = body;
    headBone = head;
    
    character.position.set(0, 0.3, 0);
    characterBaseY = character.position.y;
    headBaseY = head.position.y;
    
    scene.add(character);
    console.log('Placeholder character created');
}

// ============================================
// FIND CHARACTER BONES FOR ANIMATION
// ============================================

function findCharacterBones(model) {
    // Try to find skeleton bones for more realistic animation
    model.traverse((node) => {
        if (node.isBone || node.isObject3D) {
            const name = node.name.toLowerCase();
            
            // Look for chest/spine bones
            if (name.includes('chest') || name.includes('spine2')) {
                chestBone = node;
                console.log('Found chest bone:', node.name);
            }
            
            // Look for spine bone
            if (name.includes('spine') && !name.includes('spine2')) {
                spineBone = node;
                console.log('Found spine bone:', node.name);
            }
            
            // Look for head bone
            if (name.includes('head') && !name.includes('headtop')) {
                headBone = node;
                headBaseY = node.position.y;
                console.log('Found head bone:', node.name);
            }
        }
    });
    
    // Fallback: use the model itself if no bones found
    if (!chestBone) {
        console.log('No bones found, using model for animation');
    }
}

// ============================================
// BREATHING ANIMATION
// ============================================

function updateBreathing(deltaTime) {
    time += deltaTime;
    
    // Create smooth breathing curve using sine wave with easeInOut
    const breathCycle = Math.sin(time * breathingSpeed) * breathingIntensity;
    const smoothBreath = easeInOutSine(Math.abs(Math.sin(time * breathingSpeed))) * 
                        Math.sign(breathCycle) * breathingIntensity;
    
    // Apply breathing to character parts if bones exist
    if (chestBone && chestBone.scale) {
        // Chest expansion
        const chestScale = 1.0 + smoothBreath * 0.08;
        chestBone.scale.set(
            chestBone.scale.x,
            chestScale,
            chestBone.scale.z
        );
    }
    
    if (spineBone && spineBone.scale) {
        // Spine movement
        const spineScale = 1.0 + smoothBreath * 0.05;
        spineBone.scale.set(
            spineBone.scale.x,
            spineScale,
            spineBone.scale.z
        );
    }
    
    if (headBone && headBone.position) {
        // Head gentle rise and fall
        headBone.position.y = headBaseY + smoothBreath * 0.015;
    }
    
    // Whole character subtle rise and fall
    if (character) {
        character.position.y = characterBaseY + smoothBreath * 0.02;
    }
}

// ============================================
// EASING FUNCTIONS
// ============================================

function easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
}

// ============================================
// ANIMATION LOOP
// ============================================

function animate() {
    requestAnimationFrame(animate);
    
    const deltaTime = clock.getDelta();
    
    // Update breathing animation
    updateBreathing(deltaTime);
    
    // Update controls (disabled for now)
    // if (controls) {
    //     controls.update();
    // }
    
    // Simple auto-rotation
    if (character) {
        character.rotation.y += 0.001;
    }
    
    // Render scene
    renderer.render(scene, camera);
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ============================================
// WEBGL SUPPORT CHECK
// ============================================

function isWebGLAvailable() {
    try {
        const canvas = document.createElement('canvas');
        return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
    } catch (e) {
        return false;
    }
}

// ============================================
// START APPLICATION
// ============================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
