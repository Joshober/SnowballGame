const mapImage = new Image();
mapImage.src = "/snowy-sheet.png";
mapImage.onload = () => {};
mapImage.onerror = () => {};

const santaImage = new Image();
santaImage.src = "/santa.png";
santaImage.onload = () => {};
santaImage.onerror = () => {};

// Create elf character (using canvas drawing since we don't have an elf image)
function drawElf(ctx, x, y) {
  ctx.save();
  ctx.translate(x, y);
  
  // Elf body (green)
  ctx.fillStyle = '#27ae60';
  ctx.fillRect(8, 16, 16, 16);
  
  // Elf head (skin color)
  ctx.fillStyle = '#fdbcb4';
  ctx.fillRect(10, 8, 12, 12);
  
  // Elf hat (red with white trim)
  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(8, 4, 16, 8);
  ctx.fillStyle = '#ecf0f1';
  ctx.fillRect(8, 10, 16, 2);
  
  // Elf eyes
  ctx.fillStyle = '#2c3e50';
  ctx.fillRect(12, 12, 2, 2);
  ctx.fillRect(18, 12, 2, 2);
  
  // Elf mouth
  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(14, 16, 4, 1);
  
  // Elf arms
  ctx.fillStyle = '#27ae60';
  ctx.fillRect(4, 18, 4, 8);
  ctx.fillRect(24, 18, 4, 8);
  
  // Elf legs
  ctx.fillStyle = '#2ecc71';
  ctx.fillRect(10, 32, 6, 8);
  ctx.fillRect(16, 32, 6, 8);
  
  ctx.restore();
}

// Create detailed snowman character
function drawSnowman(ctx, x, y) {
  ctx.save();
  ctx.translate(x, y);
  
  // Snowman base (bottom ball)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(16, 28, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Snowman middle (middle ball)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(16, 18, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Snowman head (top ball)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(16, 8, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Snowman hat (black top hat)
  ctx.fillStyle = '#2c3e50';
  ctx.fillRect(10, 2, 12, 8);
  ctx.fillRect(8, 4, 16, 2);
  
  // Snowman eyes (coal)
  ctx.fillStyle = '#2c3e50';
  ctx.beginPath();
  ctx.arc(13, 6, 1.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(19, 6, 1.5, 0, Math.PI * 2);
  ctx.fill();
  
  // Snowman nose (carrot)
  ctx.fillStyle = '#e67e22';
  ctx.beginPath();
  ctx.moveTo(16, 8);
  ctx.lineTo(18, 10);
  ctx.lineTo(16, 10);
  ctx.closePath();
  ctx.fill();
  
  // Snowman mouth (coal buttons)
  ctx.fillStyle = '#2c3e50';
  ctx.beginPath();
  ctx.arc(14, 10, 0.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(18, 10, 0.8, 0, Math.PI * 2);
  ctx.fill();
  
  // Snowman buttons (middle section)
  ctx.fillStyle = '#2c3e50';
  ctx.beginPath();
  ctx.arc(16, 16, 1, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(16, 20, 1, 0, Math.PI * 2);
  ctx.fill();
  
  // Snowman arms (branches)
  ctx.strokeStyle = '#8b4513';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(6, 18);
  ctx.lineTo(2, 22);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(26, 18);
  ctx.lineTo(30, 22);
  ctx.stroke();
  
  // Snowman scarf (red)
  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(12, 12, 8, 3);
  ctx.fillRect(18, 12, 2, 6);
  
  // Add some sparkle/shine effect
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.arc(14, 5, 1, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(20, 7, 0.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  
  ctx.restore();
}

const speakerImage = new Image();
speakerImage.src = "/speaker.png";
speakerImage.onload = () => {};
speakerImage.onerror = () => {};

const walkSnow = new Audio("walk-snow.mp3");
const hitSound = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBS13yO/eizEIHWq+8+OWT");
const powerUpSound = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBS13yO/eizEIHWq+8+OWT");
const comboSound = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBS13yO/eizEIHWq+8+OWT");

const canvasEl = document.getElementById("canvas");
canvasEl.width = window.innerWidth;
canvasEl.height = window.innerHeight;
const canvas = canvasEl.getContext("2d");

const socket = io();

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const localTracks = {
  audioTrack: null,
};

let isPlaying = true;

const remoteUsers = {};
window.remoteUsers = remoteUsers;

const muteButton = document.getElementById("mute");
const uid = Math.floor(Math.random() * 1000000);

muteButton.addEventListener("click", () => {
  if (isPlaying) {
    localTracks.audioTrack.setEnabled(false);
    muteButton.innerText = "unmute";
    socket.emit("mute", true);
  } else {
    localTracks.audioTrack.setEnabled(true);
    muteButton.innerText = "mute";
    socket.emit("mute", false);
  }
  isPlaying = !isPlaying;
});

const options = {
  appid: "eee1672fa7ef4b83bc7810da003a07bb",
  channel: "game",
  uid,
  token: null,
};

async function subscribe(user, mediaType) {
  await client.subscribe(user, mediaType);
  if (mediaType === "audio") {
    user.audioTrack.play();
  }
}

function handleUserPublished(user, mediaType) {
  const id = user.uid;
  remoteUsers[id] = user;
  subscribe(user, mediaType);
}

function handleUserUnpublished(user) {
  const id = user.uid;
  delete remoteUsers[id];
}

async function join() {
  socket.emit("voiceId", uid);

  client.on("user-published", handleUserPublished);
  client.on("user-unpublished", handleUserUnpublished);

  await client.join(options.appid, options.channel, options.token || null, uid);
  localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();

  await client.publish(Object.values(localTracks));
}

join();

let groundMap = [[]];
let decalMap = [[]];
let players = [];
let snowballs = [];
let powerUps = [];
let particles = [];
let buildings = [];
let currentSnowballType = 'normal';
let weatherParticles = [];

// Screen shake and effects
let screenShake = 0;
let comboTexts = [];
let killStreakTexts = [];

// Character selection system
let selectedCharacter = 'santa';
let autojoinEnabled = false;
let isInGame = false;
let playerDied = false;

// Minimap setup
const minimapCanvas = document.getElementById('minimap-canvas');
const minimapCtx = minimapCanvas.getContext('2d');

// Mobile detection and setup
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
let joystickActive = false;
let joystickCenter = { x: 0, y: 0 };
let joystickKnob = null;
let mobileShootArea = null;

// Mobile performance optimizations
if (isMobile) {
  // Optimize canvas rendering
  canvas.imageSmoothingEnabled = false;
}

const TILE_SIZE = 32;
const SNOWBALL_RADIUS = 5;

function getPowerUpColor(type) {
  switch (type) {
    case 'speed': return '#00FF00'; // Green
    case 'rapidFire': return '#FF0000'; // Red
    case 'shield': return '#0000FF'; // Blue
    case 'health': return '#FF69B4'; // Hot pink
    default: return '#FFFFFF';
  }
}

function drawSleigh(ctx, x, y) {
  ctx.save();
  ctx.translate(x, y);
  
  // Sleigh body (red)
  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(-20, -8, 40, 16);
  
  // Sleigh runners (dark red)
  ctx.fillStyle = '#c0392b';
  ctx.fillRect(-22, 6, 44, 4);
  
  // Sleigh back (higher)
  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(-20, -12, 8, 8);
  
  // Sleigh front (curved)
  ctx.fillStyle = '#e74c3c';
  ctx.beginPath();
  ctx.arc(12, -4, 8, 0, Math.PI);
  ctx.fill();
  
  // Sleigh decorations (gold trim)
  ctx.strokeStyle = '#f1c40f';
  ctx.lineWidth = 2;
  ctx.strokeRect(-20, -8, 40, 16);
  
  // Sleigh bells (small circles)
  ctx.fillStyle = '#f1c40f';
  ctx.beginPath();
  ctx.arc(-15, 0, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, 0, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(15, 0, 2, 0, Math.PI * 2);
  ctx.fill();
  
  // Speed lines behind sleigh
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.7;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(-25 - i * 3, -4 + i * 2);
    ctx.lineTo(-30 - i * 3, -2 + i * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-25 - i * 3, 4 - i * 2);
    ctx.lineTo(-30 - i * 3, 2 - i * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  
  ctx.restore();
}

function drawPowerUpIcon(ctx, x, y, type) {
  ctx.save();
  ctx.translate(x, y);
  
  switch (type) {
    case 'speed':
      // Draw sleigh instead of speed lines
      drawSleigh(ctx, 0, 0);
      break;
      
    case 'rapidFire':
      // Draw fire/flame icon
      ctx.fillStyle = '#FFFF00';
      ctx.beginPath();
      ctx.arc(0, -2, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FF4500';
      ctx.beginPath();
      ctx.arc(0, 2, 3, 0, Math.PI * 2);
      ctx.fill();
      break;
      
    case 'shield':
      // Draw shield icon
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -8);
      ctx.lineTo(-6, -4);
      ctx.lineTo(-6, 4);
      ctx.lineTo(0, 8);
      ctx.lineTo(6, 4);
      ctx.lineTo(6, -4);
      ctx.closePath();
      ctx.stroke();
      break;
      
    case 'health':
      // Draw heart/health icon
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(0, 3);
      ctx.bezierCurveTo(-6, -3, -6, -6, 0, -6);
      ctx.bezierCurveTo(6, -6, 6, -3, 0, 3);
      ctx.bezierCurveTo(0, 3, 0, 3, 0, 3);
      ctx.fill();
      break;
  }
  
  ctx.restore();
}

function addScreenShake(intensity) {
  screenShake = Math.max(screenShake, intensity);
}

function addFloatingText(x, y, text, color = '#FFFFFF', size = 20) {
  comboTexts.push({
    x: x,
    y: y,
    text: text,
    color: color,
    size: size,
    life: 2000,
    maxLife: 2000,
    vx: (Math.random() - 0.5) * 2,
    vy: -2
  });
}

function updateFloatingTexts(delta) {
  // Update combo texts
  for (let i = comboTexts.length - 1; i >= 0; i--) {
    const text = comboTexts[i];
    text.x += text.vx;
    text.y += text.vy;
    text.life -= delta;
    
    if (text.life <= 0) {
      comboTexts.splice(i, 1);
    }
  }
  
  // Update kill streak texts
  for (let i = killStreakTexts.length - 1; i >= 0; i--) {
    const text = killStreakTexts[i];
    text.x += text.vx;
    text.y += text.vy;
    text.life -= delta;
    
    if (text.life <= 0) {
      killStreakTexts.splice(i, 1);
    }
  }
  
  // Update screen shake
  if (screenShake > 0) {
    screenShake -= delta * 0.01;
    if (screenShake < 0) screenShake = 0;
  }
}

function renderFloatingTexts(ctx, cameraX, cameraY) {
  // Render combo texts
  for (const text of comboTexts) {
    const alpha = text.life / text.maxLife;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = text.color;
    ctx.font = `bold ${text.size}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(text.text, text.x - cameraX, text.y - cameraY);
  }
  
  // Render kill streak texts
  for (const text of killStreakTexts) {
    const alpha = text.life / text.maxLife;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = text.color;
    ctx.font = `bold ${text.size}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(text.text, text.x - cameraX, text.y - cameraY);
  }
  
  ctx.globalAlpha = 1;
  ctx.textAlign = 'left';
}

// Helper functions for building graphics
function lightenColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

function darkenColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  return "#" + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
    (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
    (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
}

function drawBuildingWindows(ctx, x, y, width, height, buildingColor) {
  const windowSize = 6;
  const windowSpacing = 14;
  const rows = Math.floor((height - 16) / windowSpacing);
  const cols = Math.floor((width - 16) / windowSpacing);
  
  // Draw window frames
  ctx.fillStyle = darkenColor(buildingColor, 20);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const windowX = x + 8 + col * windowSpacing;
      const windowY = y + 8 + row * windowSpacing;
      ctx.fillRect(windowX, windowY, windowSize + 2, windowSize + 2);
    }
  }
  
  // Draw window glass
  ctx.fillStyle = 'rgba(200, 220, 255, 0.7)';
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const windowX = x + 9 + col * windowSpacing;
      const windowY = y + 9 + row * windowSpacing;
      ctx.fillRect(windowX, windowY, windowSize, windowSize);
    }
  }
}

function drawBuildingIcon(ctx, x, y, width, height, type) {
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  
  switch (type) {
    case 'administration':
      // Draw flag on top
      ctx.fillStyle = '#e74c3c';
      ctx.fillRect(centerX - 10, y - 25, 20, 15);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(centerX - 8, y - 23, 16, 11);
      // Flag pole
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(centerX - 1, y - 25, 2, 15);
      break;
    case 'performing_arts':
      // Draw musical note with glow
      ctx.fillStyle = '#f1c40f';
      ctx.font = 'bold 20px Arial';
      ctx.fillText('♪', centerX, centerY + 6);
      break;
    case 'science':
      // Draw atom symbol
      ctx.fillStyle = '#e67e22';
      ctx.font = 'bold 18px Arial';
      ctx.fillText('⚛', centerX, centerY + 6);
      break;
    case 'student_union':
      // Draw food icon
      ctx.fillStyle = '#e74c3c';
      ctx.font = 'bold 20px Arial';
      ctx.fillText('🍕', centerX, centerY + 6);
      break;
    case 'visual_arts':
      // Draw palette
      ctx.fillStyle = '#9b59b6';
      ctx.font = 'bold 20px Arial';
      ctx.fillText('🎨', centerX, centerY + 6);
      break;
    case 'residence':
      // Draw bed icon
      ctx.fillStyle = '#3498db';
      ctx.font = 'bold 20px Arial';
      ctx.fillText('🛏', centerX, centerY + 6);
      break;
    case 'library':
      // Draw book icon
      ctx.fillStyle = '#34495e';
      ctx.font = 'bold 20px Arial';
      ctx.fillText('📚', centerX, centerY + 6);
      break;
    case 'gymnasium':
      // Draw dumbbell icon
      ctx.fillStyle = '#DC143C';
      ctx.font = 'bold 20px Arial';
      ctx.fillText('🏋', centerX, centerY + 6);
      break;
    case 'cafeteria':
      // Draw food icon
      ctx.fillStyle = '#FF6347';
      ctx.font = 'bold 20px Arial';
      ctx.fillText('🍽', centerX, centerY + 6);
      break;
    case 'computer_lab':
      // Draw computer icon
      ctx.fillStyle = '#4169E1';
      ctx.font = 'bold 20px Arial';
      ctx.fillText('💻', centerX, centerY + 6);
      break;
    case 'chapel':
      // Draw cross icon
      ctx.fillStyle = '#DAA520';
      ctx.font = 'bold 20px Arial';
      ctx.fillText('⛪', centerX, centerY + 6);
      break;
  }
}

// Simple but beautiful background rendering system
function renderEnhancedBackground(ctx, cameraX, cameraY) {
  const MAP_WIDTH = 3200;
  const MAP_HEIGHT = 3200;
  
  // Create beautiful sky gradient
  const skyGradient = ctx.createLinearGradient(0, 0, 0, MAP_HEIGHT * 0.4);
  skyGradient.addColorStop(0, '#87CEEB'); // Sky blue
  skyGradient.addColorStop(0.5, '#B0E0E6'); // Powder blue
  skyGradient.addColorStop(1, '#F0F8FF'); // Alice blue
  
  // Fill sky area
  ctx.fillStyle = skyGradient;
  ctx.fillRect(-cameraX, -cameraY, MAP_WIDTH, MAP_HEIGHT * 0.4);
  
  // Create snow ground gradient
  const snowGradient = ctx.createLinearGradient(0, MAP_HEIGHT * 0.4, 0, MAP_HEIGHT);
  snowGradient.addColorStop(0, '#F8F8FF'); // Ghost white
  snowGradient.addColorStop(0.3, '#F0F8FF'); // Alice blue
  snowGradient.addColorStop(1, '#E6E6FA'); // Lavender
  
  // Fill ground area
  ctx.fillStyle = snowGradient;
  ctx.fillRect(-cameraX, MAP_HEIGHT * 0.4 - cameraY, MAP_WIDTH, MAP_HEIGHT * 0.6);
  
  // Add simple mountain silhouette
  ctx.fillStyle = '#D3D3D3';
  ctx.beginPath();
  ctx.moveTo(-cameraX, MAP_HEIGHT * 0.4 - cameraY);
  ctx.lineTo(-cameraX + MAP_WIDTH * 0.2, MAP_HEIGHT * 0.2 - cameraY);
  ctx.lineTo(-cameraX + MAP_WIDTH * 0.4, MAP_HEIGHT * 0.3 - cameraY);
  ctx.lineTo(-cameraX + MAP_WIDTH * 0.6, MAP_HEIGHT * 0.25 - cameraY);
  ctx.lineTo(-cameraX + MAP_WIDTH * 0.8, MAP_HEIGHT * 0.35 - cameraY);
  ctx.lineTo(-cameraX + MAP_WIDTH, MAP_HEIGHT * 0.4 - cameraY);
  ctx.lineTo(-cameraX + MAP_WIDTH, MAP_HEIGHT * 0.4 - cameraY);
  ctx.lineTo(-cameraX, MAP_HEIGHT * 0.4 - cameraY);
  ctx.fill();
  
  // Add some simple snow texture
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  for (let i = 0; i < 50; i++) {
    const x = (-cameraX + (i * 67) % MAP_WIDTH) % MAP_WIDTH;
    const y = (MAP_HEIGHT * 0.4 - cameraY + (i * 43) % (MAP_HEIGHT * 0.6)) % MAP_HEIGHT;
    ctx.fillRect(x, y, 2, 2);
  }
}

function drawDistantMountains(ctx, cameraX, cameraY) {
  const MAP_WIDTH = 3200;
  const MAP_HEIGHT = 3200;
  
  // Draw mountain silhouettes
  ctx.fillStyle = '#D3D3D3';
  ctx.beginPath();
  
  // Mountain range 1
  ctx.moveTo(-cameraX, MAP_HEIGHT * 0.3 - cameraY);
  ctx.lineTo(-cameraX + MAP_WIDTH * 0.2, MAP_HEIGHT * 0.1 - cameraY);
  ctx.lineTo(-cameraX + MAP_WIDTH * 0.4, MAP_HEIGHT * 0.2 - cameraY);
  ctx.lineTo(-cameraX + MAP_WIDTH * 0.6, MAP_HEIGHT * 0.15 - cameraY);
  ctx.lineTo(-cameraX + MAP_WIDTH * 0.8, MAP_HEIGHT * 0.25 - cameraY);
  ctx.lineTo(-cameraX + MAP_WIDTH, MAP_HEIGHT * 0.3 - cameraY);
  ctx.lineTo(-cameraX + MAP_WIDTH, MAP_HEIGHT * 0.3 - cameraY);
  ctx.lineTo(-cameraX, MAP_HEIGHT * 0.3 - cameraY);
  ctx.fill();
  
  // Mountain range 2 (behind)
  ctx.fillStyle = '#C0C0C0';
  ctx.beginPath();
  ctx.moveTo(-cameraX, MAP_HEIGHT * 0.4 - cameraY);
  ctx.lineTo(-cameraX + MAP_WIDTH * 0.3, MAP_HEIGHT * 0.2 - cameraY);
  ctx.lineTo(-cameraX + MAP_WIDTH * 0.7, MAP_HEIGHT * 0.3 - cameraY);
  ctx.lineTo(-cameraX + MAP_WIDTH, MAP_HEIGHT * 0.4 - cameraY);
  ctx.lineTo(-cameraX + MAP_WIDTH, MAP_HEIGHT * 0.4 - cameraY);
  ctx.lineTo(-cameraX, MAP_HEIGHT * 0.4 - cameraY);
  ctx.fill();
}

function drawSnowGround(ctx, cameraX, cameraY) {
  const MAP_WIDTH = 3200;
  const MAP_HEIGHT = 3200;
  
  // Create snow ground gradient
  const snowGradient = ctx.createLinearGradient(0, MAP_HEIGHT * 0.3, 0, MAP_HEIGHT);
  snowGradient.addColorStop(0, '#F8F8FF'); // Ghost white
  snowGradient.addColorStop(0.5, '#F0F8FF'); // Alice blue
  snowGradient.addColorStop(1, '#E6E6FA'); // Lavender
  
  // Draw snow ground
  ctx.fillStyle = snowGradient;
  ctx.fillRect(-cameraX, MAP_HEIGHT * 0.3 - cameraY, MAP_WIDTH, MAP_HEIGHT * 0.7);
  
  // Add snow texture with noise (using seeded random for consistency)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  for (let i = 0; i < 200; i++) {
    const x = (-cameraX + (i * 17) % MAP_WIDTH) % MAP_WIDTH;
    const y = (MAP_HEIGHT * 0.3 - cameraY + (i * 23) % (MAP_HEIGHT * 0.7)) % MAP_HEIGHT;
    const size = (i % 3) + 1;
    ctx.fillRect(x, y, size, size);
  }
}

function drawSnowPatches(ctx, cameraX, cameraY) {
  const MAP_WIDTH = 3200;
  const MAP_HEIGHT = 3200;
  
  // Draw various snow patches and drifts
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  
  // Large snow drift 1
  ctx.beginPath();
  ctx.ellipse(-cameraX + MAP_WIDTH * 0.2, MAP_HEIGHT * 0.6 - cameraY, 80, 40, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  // Large snow drift 2
  ctx.beginPath();
  ctx.ellipse(-cameraX + MAP_WIDTH * 0.7, MAP_HEIGHT * 0.5 - cameraY, 100, 50, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  // Medium snow patches (using seeded positions for consistency)
  const snowPatchPositions = [
    {x: 0.1, y: 0.4, w: 40, h: 20}, {x: 0.3, y: 0.6, w: 50, h: 25}, {x: 0.5, y: 0.5, w: 35, h: 18},
    {x: 0.7, y: 0.4, w: 45, h: 22}, {x: 0.9, y: 0.6, w: 38, h: 19}, {x: 0.15, y: 0.7, w: 42, h: 21},
    {x: 0.35, y: 0.8, w: 48, h: 24}, {x: 0.55, y: 0.7, w: 36, h: 18}, {x: 0.75, y: 0.8, w: 44, h: 22},
    {x: 0.95, y: 0.4, w: 39, h: 20}, {x: 0.25, y: 0.5, w: 47, h: 23}, {x: 0.45, y: 0.6, w: 41, h: 21},
    {x: 0.65, y: 0.5, w: 43, h: 22}, {x: 0.85, y: 0.7, w: 37, h: 19}, {x: 0.05, y: 0.8, w: 46, h: 23}
  ];
  
  for (let i = 0; i < snowPatchPositions.length; i++) {
    const patch = snowPatchPositions[i];
    const x = -cameraX + patch.x * MAP_WIDTH;
    const y = MAP_HEIGHT * 0.3 - cameraY + patch.y * MAP_HEIGHT * 0.7;
    
    ctx.beginPath();
    ctx.ellipse(x, y, patch.w, patch.h, i * 0.3, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function drawWinterTrees(ctx, cameraX, cameraY) {
  const MAP_WIDTH = 3200;
  const MAP_HEIGHT = 3200;
  
  // Draw scattered winter trees (using seeded positions for consistency)
  const treePositions = [
    {x: 0.05, y: 0.4, h: 35, w: 15}, {x: 0.15, y: 0.6, h: 45, w: 18}, {x: 0.25, y: 0.5, h: 30, w: 12},
    {x: 0.35, y: 0.7, h: 40, w: 16}, {x: 0.45, y: 0.4, h: 38, w: 14}, {x: 0.55, y: 0.6, h: 42, w: 17},
    {x: 0.65, y: 0.5, h: 33, w: 13}, {x: 0.75, y: 0.7, h: 47, w: 19}, {x: 0.85, y: 0.4, h: 36, w: 15},
    {x: 0.95, y: 0.6, h: 44, w: 18}, {x: 0.1, y: 0.8, h: 32, w: 12}, {x: 0.2, y: 0.3, h: 39, w: 16},
    {x: 0.3, y: 0.8, h: 41, w: 17}, {x: 0.4, y: 0.3, h: 34, w: 13}, {x: 0.5, y: 0.8, h: 46, w: 19},
    {x: 0.6, y: 0.3, h: 37, w: 15}, {x: 0.7, y: 0.8, h: 43, w: 18}, {x: 0.8, y: 0.3, h: 35, w: 14},
    {x: 0.9, y: 0.8, h: 40, w: 16}, {x: 0.12, y: 0.5, h: 38, w: 15}, {x: 0.22, y: 0.7, h: 45, w: 18},
    {x: 0.32, y: 0.5, h: 31, w: 12}, {x: 0.42, y: 0.7, h: 44, w: 17}, {x: 0.52, y: 0.5, h: 36, w: 14},
    {x: 0.62, y: 0.7, h: 42, w: 16}
  ];
  
  for (let i = 0; i < treePositions.length; i++) {
    const tree = treePositions[i];
    const x = -cameraX + tree.x * MAP_WIDTH;
    const y = MAP_HEIGHT * 0.3 - cameraY + tree.y * MAP_HEIGHT * 0.7;
    
    // Tree trunk
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x - 2, y, 4, tree.h);
    
    // Snow-covered branches
    ctx.fillStyle = '#2F4F2F';
    ctx.beginPath();
    ctx.arc(x, y - tree.h * 0.3, tree.w, 0, 2 * Math.PI);
    ctx.fill();
    
    // Snow on branches
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(x, y - tree.h * 0.3, tree.w * 0.7, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function drawFrozenPonds(ctx, cameraX, cameraY) {
  const MAP_WIDTH = 3200;
  const MAP_HEIGHT = 3200;
  
  // Draw frozen ponds/lakes
  ctx.fillStyle = '#B0E0E6';
  
  // Large frozen pond
  ctx.beginPath();
  ctx.ellipse(-cameraX + MAP_WIDTH * 0.4, MAP_HEIGHT * 0.7 - cameraY, 120, 80, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  // Medium frozen pond
  ctx.beginPath();
  ctx.ellipse(-cameraX + MAP_WIDTH * 0.8, MAP_HEIGHT * 0.6 - cameraY, 80, 60, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  // Add ice cracks
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.lineWidth = 2;
  
  // Cracks on large pond
  ctx.beginPath();
  ctx.moveTo(-cameraX + MAP_WIDTH * 0.35, MAP_HEIGHT * 0.7 - cameraY);
  ctx.lineTo(-cameraX + MAP_WIDTH * 0.45, MAP_HEIGHT * 0.7 - cameraY);
  ctx.moveTo(-cameraX + MAP_WIDTH * 0.4, MAP_HEIGHT * 0.65 - cameraY);
  ctx.lineTo(-cameraX + MAP_WIDTH * 0.4, MAP_HEIGHT * 0.75 - cameraY);
  ctx.stroke();
  
  // Cracks on medium pond
  ctx.beginPath();
  ctx.moveTo(-cameraX + MAP_WIDTH * 0.75, MAP_HEIGHT * 0.6 - cameraY);
  ctx.lineTo(-cameraX + MAP_WIDTH * 0.85, MAP_HEIGHT * 0.6 - cameraY);
  ctx.stroke();
}

function showCharacterSelection() {
  const selectionScreen = document.getElementById('character-selection');
  const deathScreen = document.getElementById('death-screen');
  
  selectionScreen.classList.remove('hidden');
  deathScreen.classList.add('hidden');
  
  // Reset character selection
  document.querySelectorAll('.character-option').forEach(option => {
    option.classList.remove('selected');
  });
  document.querySelector(`[data-character="${selectedCharacter}"]`).classList.add('selected');
}

function showDeathScreen() {
  const selectionScreen = document.getElementById('character-selection');
  const deathScreen = document.getElementById('death-screen');
  
  selectionScreen.classList.add('hidden');
  deathScreen.classList.remove('hidden');
}

function hideAllScreens() {
  const selectionScreen = document.getElementById('character-selection');
  const deathScreen = document.getElementById('death-screen');
  
  selectionScreen.classList.add('hidden');
  deathScreen.classList.add('hidden');
}

function joinGame() {
  hideAllScreens();
  isInGame = true;
  playerDied = false;
  
  // Emit character selection to server
  socket.emit('selectCharacter', { character: selectedCharacter });
}

function quickRespawn() {
  hideAllScreens();
  isInGame = true;
  playerDied = false;
  
  // Emit character selection to server with current character
  socket.emit('selectCharacter', { character: selectedCharacter });
}

function updateLeaderboard() {
  const scoresDiv = document.getElementById('scores');
  if (!scoresDiv) return;
  
  // Sort players by score
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  
  scoresDiv.innerHTML = '';
  
  sortedPlayers.forEach((player, index) => {
    const playerDiv = document.createElement('div');
    playerDiv.className = 'player-score';
    
    if (player.id === socket.id) {
      playerDiv.classList.add('me');
    }
    
    const name = player.id === socket.id ? 'You' : `Player ${index + 1}`;
    const stats = `${player.kills}K/${player.deaths}D`;
    
    playerDiv.innerHTML = `
      <span>${name}</span>
      <span>${player.score} (${stats})</span>
    `;
    
    scoresDiv.appendChild(playerDiv);
  });
}

function createWeatherParticle() {
  return {
    x: Math.random() * canvasEl.width,
    y: -10,
    vx: (Math.random() - 0.5) * 0.5, // Wind effect
    vy: 1 + Math.random() * 2,
    size: 1 + Math.random() * 2,
    life: 1,
    maxLife: 1
  };
}

function updateWeatherParticles() {
  // Add new snowflakes (reduced rate on mobile for performance)
  const spawnRate = isMobile ? 0.05 : 0.1;
  if (Math.random() < spawnRate) {
    weatherParticles.push(createWeatherParticle());
  }
  
  // Update existing particles
  for (let i = weatherParticles.length - 1; i >= 0; i--) {
    const particle = weatherParticles[i];
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.life -= 0.01;
    
    // Remove particles that are off screen or have no life
    if (particle.y > canvasEl.height + 10 || particle.life <= 0) {
      weatherParticles.splice(i, 1);
    }
  }
}

function renderMinimap() {
  if (!minimapCtx || !groundMap.length) return;
  
  minimapCtx.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height);
  
  const myPlayer = players.find((player) => player.id === socket.id);
  if (!myPlayer) return;
  
  // Calculate scale for minimap
  const mapWidth = groundMap[0].length * TILE_SIZE;
  const mapHeight = groundMap.length * TILE_SIZE;
  const scale = Math.min(minimapCanvas.width / mapWidth, minimapCanvas.height / mapHeight);
  
  // Draw ground tiles
  minimapCtx.fillStyle = '#4A90E2';
  minimapCtx.fillRect(0, 0, minimapCanvas.width, minimapCanvas.height);
  
  // Draw obstacles
  minimapCtx.fillStyle = '#8B4513';
  for (let row = 0; row < decalMap.length; row++) {
    for (let col = 0; col < decalMap[0].length; col++) {
      const tile = decalMap[row][col];
      if (tile) {
        const x = (col * TILE_SIZE) * scale;
        const y = (row * TILE_SIZE) * scale;
        minimapCtx.fillRect(x, y, TILE_SIZE * scale, TILE_SIZE * scale);
      }
    }
  }
  
  // Draw players
  for (const player of players) {
    const x = (player.x * scale) + minimapCanvas.width / 2 - (myPlayer.x * scale);
    const y = (player.y * scale) + minimapCanvas.height / 2 - (myPlayer.y * scale);
    
    if (x >= 0 && x < minimapCanvas.width && y >= 0 && y < minimapCanvas.height) {
      minimapCtx.fillStyle = player.id === socket.id ? '#FF0000' : '#00FF00';
      minimapCtx.beginPath();
      minimapCtx.arc(x, y, 2, 0, 2 * Math.PI);
      minimapCtx.fill();
    }
  }
  
  // Draw buildings
  for (const building of buildings) {
    const x = (building.x * scale) + minimapCanvas.width / 2 - (myPlayer.x * scale);
    const y = (building.y * scale) + minimapCanvas.height / 2 - (myPlayer.y * scale);
    const width = building.width * scale;
    const height = building.height * scale;
    
    if (x + width >= 0 && x < minimapCanvas.width && y + height >= 0 && y < minimapCanvas.height) {
      minimapCtx.fillStyle = building.color;
      minimapCtx.fillRect(x, y, width, height);
      minimapCtx.strokeStyle = '#2c3e50';
      minimapCtx.lineWidth = 1;
      minimapCtx.strokeRect(x, y, width, height);
    }
  }

  // Draw power-ups
  minimapCtx.fillStyle = '#FFFF00';
  for (const powerUp of powerUps) {
    const x = (powerUp.x * scale) + minimapCanvas.width / 2 - (myPlayer.x * scale);
    const y = (powerUp.y * scale) + minimapCanvas.height / 2 - (myPlayer.y * scale);
    
    if (x >= 0 && x < minimapCanvas.width && y >= 0 && y < minimapCanvas.height) {
      minimapCtx.fillRect(x - 1, y - 1, 2, 2);
    }
  }
}

// Mobile touch control functions
function setupMobileControls() {
  if (!isMobile) return;
  
  joystickKnob = document.getElementById('joystick-knob');
  mobileShootArea = document.getElementById('mobile-shoot-area');
  
  if (!joystickKnob || !mobileShootArea) return;
  
  // Virtual joystick setup
  const joystick = document.getElementById('virtual-joystick');
  const joystickRect = joystick.getBoundingClientRect();
  joystickCenter.x = joystickRect.left + joystickRect.width / 2;
  joystickCenter.y = joystickRect.top + joystickRect.height / 2;
  
  // Touch events for joystick
  joystick.addEventListener('touchstart', handleJoystickStart, { passive: false });
  joystick.addEventListener('touchmove', handleJoystickMove, { passive: false });
  joystick.addEventListener('touchend', handleJoystickEnd, { passive: false });
  
  // Touch events for shoot area
  mobileShootArea.addEventListener('touchstart', handleShootTouch, { passive: false });
  mobileShootArea.addEventListener('touchend', handleShootEnd, { passive: false });
  
  // Add shoot area text
  mobileShootArea.textContent = 'SHOOT';
}

function handleJoystickStart(e) {
  e.preventDefault();
  joystickActive = true;
  updateJoystickPosition(e.touches[0]);
}

function handleJoystickMove(e) {
  e.preventDefault();
  if (joystickActive) {
    updateJoystickPosition(e.touches[0]);
  }
}

function handleJoystickEnd(e) {
  e.preventDefault();
  joystickActive = false;
  resetJoystick();
}

function updateJoystickPosition(touch) {
  const joystick = document.getElementById('virtual-joystick');
  const joystickRect = joystick.getBoundingClientRect();
  const centerX = joystickRect.left + joystickRect.width / 2;
  const centerY = joystickRect.top + joystickRect.height / 2;
  
  const deltaX = touch.clientX - centerX;
  const deltaY = touch.clientY - centerY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const maxDistance = joystickRect.width / 2 - 20; // 20px margin for knob
  
  let newX = deltaX;
  let newY = deltaY;
  
  if (distance > maxDistance) {
    newX = (deltaX / distance) * maxDistance;
    newY = (deltaY / distance) * maxDistance;
  }
  
  joystickKnob.style.transform = `translate(calc(-50% + ${newX}px), calc(-50% + ${newY}px))`;
  
  // Update movement inputs
  const normalizedX = newX / maxDistance;
  const normalizedY = newY / maxDistance;
  
  inputs.left = normalizedX < -0.3;
  inputs.right = normalizedX > 0.3;
  inputs.up = normalizedY < -0.3;
  inputs.down = normalizedY > 0.3;
  
  socket.emit("inputs", inputs);
}

function resetJoystick() {
  joystickKnob.style.transform = 'translate(-50%, -50%)';
  inputs.left = false;
  inputs.right = false;
  inputs.up = false;
  inputs.down = false;
  socket.emit("inputs", inputs);
}

function handleShootTouch(e) {
  e.preventDefault();
  // Calculate angle from center of screen to touch position
  const touch = e.touches[0];
  const angle = Math.atan2(
    touch.clientY - canvasEl.height / 2,
    touch.clientX - canvasEl.width / 2
  );
  socket.emit("snowball", { angle, type: currentSnowballType });
}

function handleShootEnd(e) {
  e.preventDefault();
  // Could add continuous shooting here if desired
}

socket.on("connect", () => {
});

socket.on("disconnect", () => {
});

socket.on("map", (loadedMap) => {
  groundMap = loadedMap.ground;
  decalMap = loadedMap.decal;
});

socket.on("players", (serverPlayers) => {
  const previousPlayers = players;
  players = serverPlayers;
  updateLeaderboard();
  
  // Check if current player died
  if (isInGame && !playerDied) {
    const myPlayer = players.find(p => p.id === socket.id);
    const wasInGame = previousPlayers.find(p => p.id === socket.id);
    
    if (wasInGame && !myPlayer) {
      // Player died
      playerDied = true;
      isInGame = false;
      
      if (autojoinEnabled) {
        // Auto respawn after a short delay
        setTimeout(() => {
          quickRespawn();
        }, 2000);
      } else {
        // Show death screen
        showDeathScreen();
      }
    }
  }
});

socket.on("snowballs", (serverSnowballs) => {
  snowballs = serverSnowballs;
});

socket.on("powerUps", (serverPowerUps) => {
  powerUps = serverPowerUps;
});

socket.on("particles", (serverParticles) => {
  particles = serverParticles;
});

socket.on("buildings", (serverBuildings) => {
  buildings = serverBuildings;
});

socket.on("combo", (data) => {
  const player = players.find(p => p.id === data.playerId);
  if (player) {
    addFloatingText(player.x + 16, player.y - 20, `COMBO x${data.combo}!`, '#FFD700', 24);
    addScreenShake(5);
    // Play combo sound
    comboSound.currentTime = 0;
    comboSound.play().catch(() => {}); // Ignore audio errors
  }
});

socket.on("killStreak", (data) => {
  const player = players.find(p => p.id === data.playerId);
  if (player) {
    const streakText = data.streak >= 6 ? 'UNSTOPPABLE!' : 
                      data.streak >= 3 ? 'KILLING SPREE!' : 'DOUBLE KILL!';
    addFloatingText(player.x + 16, player.y - 40, streakText, '#FF0000', 28);
    addScreenShake(10);
    // Play hit sound for kill streak
    hitSound.currentTime = 0;
    hitSound.play().catch(() => {}); // Ignore audio errors
  }
});

const inputs = {
  up: false,
  down: false,
  left: false,
  right: false,
};


window.addEventListener("keydown", (e) => {
  e.preventDefault(); // Prevent default behavior
  if (e.key === "w" || e.key === "W") {
    inputs.up = true;
  } else if (e.key === "s" || e.key === "S") {
    inputs.down = true;
  } else if (e.key === "d" || e.key === "D") {
    inputs.right = true;
  } else if (e.key === "a" || e.key === "A") {
    inputs.left = true;
  }
  
  if (["a", "s", "w", "d", "A", "S", "W", "D"].includes(e.key)) {
    socket.emit("inputs", inputs);
    if (walkSnow.paused) {
      walkSnow.play();
    }
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "w" || e.key === "W") {
    inputs.up = false;
  } else if (e.key === "s" || e.key === "S") {
    inputs.down = false;
  } else if (e.key === "d" || e.key === "D") {
    inputs.right = false;
  } else if (e.key === "a" || e.key === "A") {
    inputs.left = false;
  }
  
  if (["a", "s", "w", "d", "A", "S", "W", "D"].includes(e.key)) {
    socket.emit("inputs", inputs);
    walkSnow.pause();
    walkSnow.currentTime = 0;
  }
});

// Snowball type selection
document.querySelectorAll('.snowball-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent the click from bubbling up to the window
    document.querySelectorAll('.snowball-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentSnowballType = btn.id.replace('-snowball', '');
  });
});

// Initialize mobile controls
setupMobileControls();

// Character selection event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Character selection
  document.querySelectorAll('.character-option').forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.character-option').forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      selectedCharacter = option.dataset.character;
    });
  });

  // Join game button
  document.getElementById('join-game').addEventListener('click', joinGame);

  // Autojoin toggle
  document.getElementById('autojoin-toggle').addEventListener('click', () => {
    autojoinEnabled = !autojoinEnabled;
    const button = document.getElementById('autojoin-toggle');
    if (autojoinEnabled) {
      button.textContent = 'Disable Autojoin';
      button.classList.add('active');
    } else {
      button.textContent = 'Enable Autojoin';
      button.classList.remove('active');
    }
  });

  // Death screen buttons
  document.getElementById('respawn-join').addEventListener('click', () => {
    showCharacterSelection();
  });

  document.getElementById('respawn-auto').addEventListener('click', quickRespawn);

  // Show character selection on page load
  showCharacterSelection();
});

// Handle window resize (important for mobile orientation changes)
window.addEventListener('resize', () => {
  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;
  
  if (isMobile) {
    // Recalculate joystick center after resize
    const joystick = document.getElementById('virtual-joystick');
    if (joystick) {
      const joystickRect = joystick.getBoundingClientRect();
      joystickCenter.x = joystickRect.left + joystickRect.width / 2;
      joystickCenter.y = joystickRect.top + joystickRect.height / 2;
    }
  }
});

// Desktop click handler
window.addEventListener("click", (e) => {
  if (isMobile) return; // Skip on mobile, use touch controls instead
  
  const angle = Math.atan2(
    e.clientY - canvasEl.height / 2,
    e.clientX - canvasEl.width / 2
  );
  socket.emit("snowball", { angle, type: currentSnowballType });
});

// Mobile touch handler for main game area (for shooting in different directions)
if (isMobile) {
  canvasEl.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const angle = Math.atan2(
      touch.clientY - canvasEl.height / 2,
      touch.clientX - canvasEl.width / 2
    );
    socket.emit("snowball", { angle, type: currentSnowballType });
  }, { passive: false });
}

function loop() {
  canvas.clearRect(0, 0, canvasEl.width, canvasEl.height);
  
  // Update weather effects
  updateWeatherParticles();
  
  // Update floating texts and screen shake
  updateFloatingTexts(16); // 16ms delta time approximation

  const myPlayer = players.find((player) => player.id === socket.id);
  let cameraX = 0;
  let cameraY = 0;
  if (myPlayer) {
    cameraX = parseInt(myPlayer.x - canvasEl.width / 2);
    cameraY = parseInt(myPlayer.y - canvasEl.height / 2);
    
    // Apply screen shake
    if (screenShake > 0) {
      cameraX += (Math.random() - 0.5) * screenShake;
      cameraY += (Math.random() - 0.5) * screenShake;
    }
  } else {
    // Debug: log when no player is found
  }

  const TILES_IN_ROW = 8;


  // ground
  for (let row = 0; row < groundMap.length; row++) {
    for (let col = 0; col < groundMap[0].length; col++) {
      let { id } = groundMap[row][col];
      const imageRow = parseInt(id / TILES_IN_ROW);
      const imageCol = id % TILES_IN_ROW;
      
      // Only draw if mapImage is loaded
      if (mapImage.complete && mapImage.naturalWidth > 0) {
        canvas.drawImage(
          mapImage,
          imageCol * TILE_SIZE,
          imageRow * TILE_SIZE,
          TILE_SIZE,
          TILE_SIZE,
          col * TILE_SIZE - cameraX,
          row * TILE_SIZE - cameraY,
          TILE_SIZE,
          TILE_SIZE
        );
      }
    }
  }

  // decals
  for (let row = 0; row < decalMap.length; row++) {
    for (let col = 0; col < decalMap[0].length; col++) {
      let { id } = decalMap[row][col] ?? { id: undefined };
      const imageRow = parseInt(id / TILES_IN_ROW);
      const imageCol = id % TILES_IN_ROW;

      canvas.drawImage(
        mapImage,
        imageCol * TILE_SIZE,
        imageRow * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE,
        col * TILE_SIZE - cameraX,
        row * TILE_SIZE - cameraY,
        TILE_SIZE,
        TILE_SIZE
      );
    }
  }

      // Render buildings with enhanced graphics
      for (const building of buildings) {
        const buildingX = building.x - cameraX;
        const buildingY = building.y - cameraY;
        
        // Draw building shadow
        canvas.fillStyle = 'rgba(0, 0, 0, 0.3)';
        canvas.fillRect(buildingX + 3, buildingY + 3, building.width, building.height);
        
        // Draw building main body with gradient
        const buildingGradient = canvas.createLinearGradient(buildingX, buildingY, buildingX, buildingY + building.height);
        buildingGradient.addColorStop(0, lightenColor(building.color, 15));
        buildingGradient.addColorStop(1, darkenColor(building.color, 15));
        canvas.fillStyle = buildingGradient;
        canvas.fillRect(buildingX, buildingY, building.width, building.height);
        
        // Draw building outline
        canvas.strokeStyle = darkenColor(building.color, 25);
        canvas.lineWidth = 2;
        canvas.strokeRect(buildingX, buildingY, building.width, building.height);
        
        // Draw windows
        drawBuildingWindows(canvas, buildingX, buildingY, building.width, building.height, building.color);
        
        // Draw building name
        canvas.fillStyle = '#2c3e50';
        canvas.font = 'bold 11px Arial';
        canvas.textAlign = 'center';
        const nameY = buildingY + building.height + 12;
        if (nameY - cameraY > 0 && nameY - cameraY < canvasEl.height) {
          canvas.fillText(building.name, buildingX + building.width/2, nameY);
        }
        
        // Draw building icon
        drawBuildingIcon(canvas, buildingX, buildingY, building.width, building.height, building.type);
        
        canvas.textAlign = 'left';
      }

      for (const player of players) {
    // Draw power-up effects
    const now = Date.now();
    if (player.speedBoost && player.speedBoost > now) {
      // Speed boost effect - subtle trail
      canvas.globalAlpha = 0.1;
      canvas.fillStyle = '#ffffff';
      canvas.fillRect(player.x - cameraX - 2, player.y - cameraY - 2, 36, 36);
      canvas.globalAlpha = 1;
    }
    if (player.shield && player.shield > now) {
      // Shield effect - blue circle
      canvas.strokeStyle = '#0000FF';
      canvas.lineWidth = 3;
      canvas.beginPath();
      canvas.arc(
        player.x - cameraX + 16,
        player.y - cameraY + 16,
        20,
        0,
        2 * Math.PI
      );
      canvas.stroke();
    }
    if (player.rapidFire && player.rapidFire > now) {
      // Rapid fire effect - red glow
      canvas.globalAlpha = 0.4;
      canvas.fillStyle = '#FF0000';
      canvas.fillRect(player.x - cameraX - 1, player.y - cameraY - 1, 34, 34);
      canvas.globalAlpha = 1;
    }
    if (player.frozen && player.frozen > now) {
      // Frozen effect - blue ice overlay
      canvas.globalAlpha = 0.6;
      canvas.fillStyle = '#87CEEB';
      canvas.fillRect(player.x - cameraX, player.y - cameraY, 32, 32);
      canvas.globalAlpha = 1;
    }
    if (player.slowed && player.slowed > now) {
      // Slowed effect - purple trail
      canvas.globalAlpha = 0.3;
      canvas.fillStyle = '#800080';
      canvas.fillRect(player.x - cameraX - 1, player.y - cameraY - 1, 34, 34);
      canvas.globalAlpha = 1;
    }
    if (player.health && player.health > now) {
      // Health effect - pink glow with pulsing
      const healthPulse = Math.sin(Date.now() * 0.01) * 0.3 + 0.7;
      canvas.globalAlpha = healthPulse * 0.4;
      canvas.fillStyle = '#FF69B4';
      canvas.fillRect(player.x - cameraX - 2, player.y - cameraY - 2, 36, 36);
      canvas.globalAlpha = 1;
    }
    
    // Draw player based on their character
    if (player.character === 'elf') {
      drawElf(canvas, player.x - cameraX, player.y - cameraY);
    } else if (player.character === 'snowman') {
      drawSnowman(canvas, player.x - cameraX, player.y - cameraY);
    } else if (santaImage.complete && santaImage.naturalWidth > 0) {
      canvas.drawImage(santaImage, player.x - cameraX, player.y - cameraY);
    } else {
      // Fallback: draw a colored rectangle for the player
      let fallbackColor = '#FF0000';
      if (player.character === 'elf') fallbackColor = '#27ae60';
      else if (player.character === 'snowman') fallbackColor = '#ffffff';
      canvas.fillStyle = fallbackColor;
      canvas.fillRect(player.x - cameraX, player.y - cameraY, 32, 32);
    }
    
    // Draw hit count indicator
    if (player.hits > 0) {
      canvas.fillStyle = '#FF0000';
      canvas.font = 'bold 12px Arial';
      canvas.textAlign = 'center';
      canvas.fillText(`${player.hits}/${player.maxHits || 3}`, 
        player.x - cameraX + 16, player.y - cameraY - 5);
    }
    
    if (!player.isMuted && speakerImage.complete && speakerImage.naturalWidth > 0) {
      canvas.drawImage(
        speakerImage,
        player.x - cameraX + 5,
        player.y - cameraY - 28
      );
    }

    if (player !== myPlayer) {
      if (
        remoteUsers[player.voiceId] &&
        remoteUsers[player.voiceId].audioTrack
      ) {
        const distance = Math.sqrt(
          (player.x - myPlayer.x) ** 2 + (player.y - myPlayer.y) ** 2
        );
        const ratio = 1.0 - Math.min(distance / 700, 1);
        remoteUsers[player.voiceId].audioTrack.setVolume(
          Math.floor(ratio * 100)
        );
      }
    }
  }

  for (const snowball of snowballs) {
    // Set color based on snowball type
    switch (snowball.type) {
      case 'ice':
        canvas.fillStyle = "#87CEEB"; // Sky blue
        break;
      case 'explosive':
        canvas.fillStyle = "#FF4500"; // Orange red
        break;
      case 'freeze':
        canvas.fillStyle = "#00BFFF"; // Deep sky blue
        break;
      case 'bouncy':
        canvas.fillStyle = "#FFD700"; // Gold
        break;
      default:
        canvas.fillStyle = "#FFFFFF"; // White
    }
    
    canvas.beginPath();
    canvas.arc(
      snowball.x - cameraX,
      snowball.y - cameraY,
      SNOWBALL_RADIUS,
      0,
      2 * Math.PI
    );
    canvas.fill();
    
    // Add special effects for different snowball types
    if (snowball.type === 'explosive') {
      canvas.strokeStyle = "#FF0000";
      canvas.lineWidth = 2;
      canvas.beginPath();
      canvas.arc(
        snowball.x - cameraX,
        snowball.y - cameraY,
        SNOWBALL_RADIUS + 2,
        0,
        2 * Math.PI
      );
      canvas.stroke();
    } else if (snowball.type === 'bouncy') {
      // Add a pulsing effect for bouncy snowballs
      const pulse = Math.sin(Date.now() * 0.01) * 2;
      canvas.strokeStyle = "#FFA500";
      canvas.lineWidth = 1;
      canvas.beginPath();
      canvas.arc(
        snowball.x - cameraX,
        snowball.y - cameraY,
        SNOWBALL_RADIUS + pulse,
        0,
        2 * Math.PI
      );
      canvas.stroke();
    }
  }

      // Render power-ups
      for (const powerUp of powerUps) {
        const powerUpX = powerUp.x - cameraX;
        const powerUpY = powerUp.y - cameraY;
        const powerUpSize = powerUp.size || 24;
        
        if (powerUp.type === 'speed') {
          // Special rendering for sleigh
          const pulse = Math.sin(Date.now() * 0.005) * 0.2 + 0.8;
          canvas.globalAlpha = pulse;
          
          // Draw sleigh background glow
          canvas.shadowColor = getPowerUpColor(powerUp.type);
          canvas.shadowBlur = 15;
          canvas.fillStyle = getPowerUpColor(powerUp.type);
          canvas.fillRect(powerUpX - 4, powerUpY - 4, powerUpSize + 8, powerUpSize + 8);
          canvas.shadowBlur = 0;
          canvas.globalAlpha = 1;
          
          // Draw the sleigh
          drawSleigh(canvas, powerUpX + powerUpSize/2, powerUpY + powerUpSize/2);
        } else {
          // Normal power-up rendering
          const pulse = Math.sin(Date.now() * 0.005) * 0.2 + 0.8;
          canvas.globalAlpha = pulse;
          canvas.fillStyle = getPowerUpColor(powerUp.type);
          canvas.fillRect(powerUpX - 2, powerUpY - 2, powerUpSize + 4, powerUpSize + 4);
          canvas.globalAlpha = 1;
          
          // Draw main power-up box
          canvas.fillStyle = getPowerUpColor(powerUp.type);
          canvas.fillRect(powerUpX, powerUpY, powerUpSize, powerUpSize);
          
          // Draw icon in the center
          drawPowerUpIcon(canvas, powerUpX + powerUpSize/2, powerUpY + powerUpSize/2, powerUp.type);
          
          // Add glow effect
          canvas.shadowColor = getPowerUpColor(powerUp.type);
          canvas.shadowBlur = 10;
          canvas.fillStyle = getPowerUpColor(powerUp.type);
          canvas.fillRect(powerUpX, powerUpY, powerUpSize, powerUpSize);
          canvas.shadowBlur = 0;
        }
      }

  // Render particles
  for (const particle of particles) {
    const alpha = particle.life / particle.maxLife;
    canvas.globalAlpha = alpha;
    canvas.fillStyle = particle.color;
    canvas.beginPath();
    canvas.arc(
      particle.x - cameraX,
      particle.y - cameraY,
      particle.size,
      0,
      2 * Math.PI
    );
    canvas.fill();
  }
  canvas.globalAlpha = 1;

  // Render weather effects (snowfall)
  for (const particle of weatherParticles) {
    canvas.globalAlpha = particle.life;
    canvas.fillStyle = '#FFFFFF';
    canvas.beginPath();
    canvas.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
    canvas.fill();
  }
  canvas.globalAlpha = 1;

  // Render floating texts (combo, kill streak, etc.)
  renderFloatingTexts(canvas, cameraX, cameraY);
  
  renderMinimap();

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
