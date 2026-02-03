# SLEEP-COIN 💤
## 3D Sleeping Character with Continuous Breathing Animations

A peaceful, calming website featuring a realistic 3D sleeping character with smooth, continuous breathing animations. Built with Three.js for a meditative and soothing experience.

![Preview](https://img.shields.io/badge/Three.js-v0.160.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **Realistic 3D Character**: Female character in sleeping position
  - Orange/red plaid checkered shirt
  - Green pants with pattern
  - Dark hair
  - Peaceful sleeping expression
  - Head resting on beige pillow

- **Continuous Breathing Animation**: 
  - Smooth 3-4 second inhale/exhale cycles
  - Natural chest and torso movement
  - Subtle body rise and fall
  - Head moves gently with each breath
  - Runs continuously at 60 FPS
  - Organic motion using easing curves

- **Professional Scene**:
  - Comfortable bed/sleeping surface
  - Soft pastel background colors
  - Professional lighting with shadows
  - Peaceful, calming atmosphere

- **Technical Excellence**:
  - Three.js powered WebGL rendering
  - Anti-aliasing enabled
  - Soft shadows (PCFSoftShadowMap)
  - Responsive design (mobile & desktop)
  - Loading screen with progress indicator
  - WebGL fallback handling

## 🚀 Quick Start

### Option 1: Open Directly (No Server Required)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/alimuhamdzzz-ops/SLEEP-COIN.git
   cd SLEEP-COIN
   ```

2. **Open in browser**:
   - Simply open `index.html` in your web browser
   - Works with Chrome, Firefox, Safari, Edge

### Option 2: Use a Local Server (Recommended)

1. **Using Python**:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   Then visit: `http://localhost:8000`

2. **Using Node.js**:
   ```bash
   npx http-server -p 8000
   ```
   Then visit: `http://localhost:8000`

3. **Using VS Code**:
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

## 📁 Project Structure

```
SLEEP-COIN/
├── index.html          # Main HTML file with Three.js scene
├── css/
│   └── style.css      # Styling, loading screen, responsive design
├── js/
│   └── main.js        # Three.js setup, animation logic
├── models/
│   └── sleeper.glb    # 3D character model (add your own)
├── assets/            # Optional textures/images
└── README.md          # This file
```

## 🎨 Adding Your Own 3D Model

The project currently uses a placeholder if no model is found. To add a realistic character:

### Where to Get Models:

1. **Ready Player Me** (Recommended):
   - Visit [readyplayer.me](https://readyplayer.me/)
   - Create a female avatar
   - Customize with plaid shirt and green pants
   - Download as GLB format
   - Place in `models/sleeper.glb`

2. **Mixamo**:
   - Visit [mixamo.com](https://www.mixamo.com/)
   - Select a female character
   - Download in FBX format
   - Convert to GLB using [gltf.report](https://gltf.report/)
   - Place in `models/sleeper.glb`

3. **Sketchfab**:
   - Browse free models: [sketchfab.com/3d-models](https://sketchfab.com/3d-models)
   - Download GLB/GLTF format
   - Place in `models/sleeper.glb`

### Model Requirements:
- Format: GLB or GLTF
- Size: Under 10MB
- Rigged with bones (optional but recommended for better animation)
- Female character in sleeping/lying position
- Clothing: Plaid shirt + green pants

## 🛠️ Customization

### Adjust Breathing Speed
Edit `js/main.js`:
```javascript
const breathingSpeed = 0.5; // Lower = slower, Higher = faster
const breathingIntensity = 0.15; // Lower = subtle, Higher = deeper
```

### Change Colors
Edit scene background in `js/main.js`:
```javascript
scene.background = new THREE.Color(0xe8f5f7); // Hex color
```

Edit CSS background in `css/style.css`:
```css
body {
    background: linear-gradient(135deg, #e0f7fa 0%, #f3e5f5 100%);
}
```

### Adjust Camera Position
Edit `js/main.js`:
```javascript
camera.position.set(0, 1.5, 4); // x, y, z
```

### Enable/Disable Auto-Rotation
Edit `js/main.js`:
```javascript
controls.autoRotate = true; // Set to false to disable
controls.autoRotateSpeed = 0.5; // Adjust speed
```

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Requirements**: WebGL support (available in all modern browsers)

## 🎯 Performance

- Target: 60 FPS on desktop
- Mobile: 30+ FPS on modern devices
- Optimizations:
  - Efficient animation loop
  - Optimized shadows
  - Compressed textures
  - LOD (Level of Detail) ready

## 🚀 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select branch (main/master)
4. Site will be live at: `https://[username].github.io/SLEEP-COIN/`

### Netlify
1. Drag and drop the folder to [netlify.com/drop](https://app.netlify.com/drop)
2. Site is instantly live

### Vercel
```bash
npm i -g vercel
vercel
```

## 🐛 Troubleshooting

### Model not loading?
- Ensure `sleeper.glb` exists in `models/` folder
- Check browser console for errors (F12)
- Verify model file isn't corrupted
- Try using a local server instead of opening file directly

### Low FPS?
- Reduce shadow quality in `js/main.js`
- Disable auto-rotation
- Use a simpler 3D model
- Close other browser tabs

### WebGL not supported?
- Update your browser to the latest version
- Update your graphics drivers
- Try a different browser

## 📝 License

MIT License - Feel free to use and modify for your projects

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Submit bug reports
- Suggest improvements
- Add features
- Improve documentation

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Made with ❤️ for peaceful moments**

*Experience the calm of continuous breathing animations*
