const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer);

const PORT = process.env.PORT || 5000;

const loadMap = require("./mapLoader");

const SPEED = 5;
const TICK_RATE = 30;
const SNOWBALL_SPEED = 11;
const SNOWBALL_RADIUS = 5;
const PLAYER_SIZE = 32;
const TILE_SIZE = 32;
const POWERUP_SIZE = 24;
const SLEIGH_SIZE = 48; // Sleigh is larger than normal power-ups
const POWERUP_SPAWN_RATE = 0.001; // Chance per tick

// Map dimensions (100x100 tiles, 32px each = 3200x3200 pixels)
const MAP_WIDTH = 3200;
const MAP_HEIGHT = 3200;
const MAP_CENTER_X = MAP_WIDTH / 2;
const MAP_CENTER_Y = MAP_HEIGHT / 2;

let players = [];
let snowballs = [];
let powerUps = [];
let particles = [];
let buildings = [];
const inputsMap = {};
let ground2D, decal2D;

// Graceland University inspired buildings - realistic layout with proper spacing
const GRACELAND_BUILDINGS = [
  {
    name: "Administration Building",
    x: 1600, // Center of campus
    y: 800,
    width: 200,
    height: 160,
    type: "administration",
    color: "#8B4513" // Brown brick
  },
  {
    name: "Shaw Center",
    x: 2400, // East sideWWWWW
    y: 1000,
    width: 180,
    height: 140,
    type: "performing_arts",
    color: "#2E8B57" // Sea green
  },
  {
    name: "Resch Science Hall",
    x: 800, // West side
    y: 1200,
    width: 220,
    height: 180,
    type: "science",
    color: "#4682B4" // Steel blue
  },
  {
    name: "Newcom Student Union",
    x: 1600, // Center, south of admin
    y: 1600,
    width: 240,
    height: 160,
    type: "student_union",
    color: "#CD853F" // Peru
  },
  {
    name: "Helene Center",
    x: 2400, // East side, south
    y: 2000,
    width: 160,
    height: 140,
    type: "visual_arts",
    color: "#9370DB" // Medium purple
  },
  {
    name: "Residence Hall A",
    x: 400, // Far west
    y: 1800,
    width: 140,
    height: 200,
    type: "residence",
    color: "#A0522D" // Sienna
  },
  {
    name: "Residence Hall B",
    x: 2800, // Far east
    y: 1800,
    width: 140,
    height: 200,
    type: "residence",
    color: "#A0522D" // Sienna
  },
  {
    name: "Library",
    x: 1200, // West-central
    y: 600,
    width: 180,
    height: 140,
    type: "library",
    color: "#696969" // Dim gray
  },
  {
    name: "Gymnasium",
    x: 2000, // East-central
    y: 600,
    width: 200,
    height: 160,
    type: "gymnasium",
    color: "#DC143C" // Crimson
  },
  {
    name: "Cafeteria",
    x: 800, // West side, north
    y: 600,
    width: 160,
    height: 120,
    type: "cafeteria",
    color: "#FF6347" // Tomato
  },
  {
    name: "Computer Lab",
    x: 2400, // East side, far south
    y: 2600,
    width: 140,
    height: 120,
    type: "computer_lab",
    color: "#4169E1" // Royal blue
  },
  {
    name: "Chapel",
    x: 1600, // Center, far north
    y: 400,
    width: 120,
    height: 160,
    type: "chapel",
    color: "#DAA520" // Goldenrod
  }
];

function isColliding(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.h + rect1.y > rect2.y
  );
}

function isPositionTooCloseToPlayers(x, y, minDistance = 80) {
  // Check if the position is too close to any existing players
  for (const player of players) {
    const distance = Math.sqrt((player.x - x) ** 2 + (player.y - y) ** 2);
    if (distance < minDistance) {
      return true;
    }
  }
  return false;
}

function getRandomRespawnPosition() {
  // Try to find a valid spawn position (not on blocks and not too close to other players)
  const maxAttempts = 100; // Increased attempts for better spawn distribution
  const spawnRadius = 200;
  const minPlayerDistance = 80; // Minimum distance from other players
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Generate random position in a 400x400 area around the center of the map
    const x = MAP_CENTER_X + (Math.random() - 0.5) * spawnRadius * 2;
    const y = MAP_CENTER_Y + (Math.random() - 0.5) * spawnRadius * 2;
    
    // Ensure the position is within map bounds
    const clampedX = Math.max(PLAYER_SIZE, Math.min(MAP_WIDTH - PLAYER_SIZE, x));
    const clampedY = Math.max(PLAYER_SIZE, Math.min(MAP_HEIGHT - PLAYER_SIZE, y));
    
    // Create a temporary player object to test collision
    const testPlayer = {
      x: clampedX,
      y: clampedY
    };
    
    // Check if this position collides with any map blocks or buildings
    if (!isCollidingWithMap(testPlayer)) {
      // Check if this position is too close to other players
      if (!isPositionTooCloseToPlayers(clampedX, clampedY, minPlayerDistance)) {
        return { x: clampedX, y: clampedY };
      }
    }
  }
  
  // If we couldn't find a valid position after maxAttempts, try with reduced distance requirement
  for (let attempt = 0; attempt < 50; attempt++) {
    const x = MAP_CENTER_X + (Math.random() - 0.5) * spawnRadius * 2;
    const y = MAP_CENTER_Y + (Math.random() - 0.5) * spawnRadius * 2;
    
    const clampedX = Math.max(PLAYER_SIZE, Math.min(MAP_WIDTH - PLAYER_SIZE, x));
    const clampedY = Math.max(PLAYER_SIZE, Math.min(MAP_HEIGHT - PLAYER_SIZE, y));
    
    const testPlayer = { x: clampedX, y: clampedY };
    
    if (!isCollidingWithMap(testPlayer)) {
      return { x: clampedX, y: clampedY };
    }
  }
  
  // Final fallback to center
  return {
    x: MAP_CENTER_X,
    y: MAP_CENTER_Y
  };
}

function getSnowballDamage(type) {
  switch (type) {
    case 'normal': return 1; // 1 hit damage
    case 'ice': return 1; // 1 hit damage + freeze
    case 'explosive': return 2; // 2 hit damage + explosion
    case 'freeze': return 1; // 1 hit damage + slow
    case 'bouncy': return 1; // 1 hit damage + can hit multiple players
    default: return 1;
  }
}

function getSnowballFireRate(type) {
  switch (type) {
    case 'normal': return 0; // Normal fire rate
    case 'ice': return 0; // Normal fire rate
    case 'explosive': return 2000; // 2 second delay between shots
    case 'freeze': return 0; // Normal fire rate
    case 'bouncy': return 0; // Normal fire rate
    default: return 0;
  }
}

function initializeBuildings() {
  buildings = [...GRACELAND_BUILDINGS];
}

function isCollidingWithMap(player) {
  // Check collision with map tiles
  for (let row = 0; row < decal2D.length; row++) {
    for (let col = 0; col < decal2D[0].length; col++) {
      const tile = decal2D[row][col];

      if (
        tile &&
        isColliding(
          {
            x: player.x,
            y: player.y,
            w: 32,
            h: 32,
          },
          {
            x: col * TILE_SIZE,
            y: row * TILE_SIZE,
            w: TILE_SIZE,
            h: TILE_SIZE,
          }
        )
      ) {
        return true;
      }
    }
  }
  
  // Check collision with buildings
  for (const building of buildings) {
    if (isColliding(
      {
        x: player.x,
        y: player.y,
        w: 32,
        h: 32,
      },
      {
        x: building.x,
        y: building.y,
        w: building.width,
        h: building.height,
      }
    )) {
      return true;
    }
  }
  
  return false;
}

function isPositionCollidingWithBuildings(x, y, width, height) {
  for (const building of buildings) {
    if (isColliding(
      { x, y, w: width, h: height },
      { x: building.x, y: building.y, w: building.width, h: building.height }
    )) {
      return true;
    }
  }
  return false;
}

function spawnPowerUp() {
  if (Math.random() < POWERUP_SPAWN_RATE && powerUps.length < 5) {
    const types = ['speed', 'rapidFire', 'shield', 'health'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    // Determine size based on power-up type
    const size = type === 'speed' ? SLEIGH_SIZE : POWERUP_SIZE;
    
    // Find a random position that's not colliding with obstacles and is within bounds
    let x, y;
    let attempts = 0;
    do {
      x = Math.random() * (MAP_WIDTH - size) + size / 2;
      y = Math.random() * (MAP_HEIGHT - size) + size / 2;
      attempts++;
    } while (
      (isCollidingWithMap({x, y, w: size, h: size}) || 
       isPositionCollidingWithBuildings(x, y, size, size)) && 
      attempts < 50
    );
    
    if (attempts < 50) {
      powerUps.push({
        id: Date.now() + Math.random(),
        x,
        y,
        type,
        timeLeft: 30000, // 30 seconds
        size: size // Store the size for collision detection
      });
    }
  }
}

function checkPowerUpCollisions() {
  for (let i = powerUps.length - 1; i >= 0; i--) {
    const powerUp = powerUps[i];
    
    for (const player of players) {
      const powerUpSize = powerUp.size || POWERUP_SIZE;
      if (isColliding(
        { x: player.x, y: player.y, w: PLAYER_SIZE, h: PLAYER_SIZE },
        { x: powerUp.x, y: powerUp.y, w: powerUpSize, h: powerUpSize }
      )) {
        // Apply power-up effect
        switch (powerUp.type) {
          case 'speed':
            player.speedBoost = Date.now() + 10000; // 10 seconds
            break;
          case 'rapidFire':
            player.rapidFire = Date.now() + 15000; // 15 seconds
            break;
        case 'shield':
          player.shield = Date.now() + 8000; // 8 seconds
          break;
        case 'health':
          player.health = Date.now() + 10000; // 10 seconds of invincibility
          break;
        }
        // Create pickup particles
        const powerUpSize = powerUp.size || POWERUP_SIZE;
        createParticles(powerUp.x + powerUpSize/2, powerUp.y + powerUpSize/2, 'pickup');
        powerUps.splice(i, 1);
        break;
      }
    }
  }
}

function createParticles(x, y, type) {
  const particleCount = type === 'impact' ? 8 : 5;
  const colors = {
    impact: ['#FFFFFF', '#E0E0E0', '#C0C0C0'],
    pickup: ['#00FF00', '#00CC00', '#009900'],
    movement: ['#87CEEB', '#B0E0E6', '#E0F6FF']
  };
  
  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
    const speed = 2 + Math.random() * 3;
    const life = 1000 + Math.random() * 500;
    
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life,
      maxLife: life,
      color: colors[type][Math.floor(Math.random() * colors[type].length)],
      size: 2 + Math.random() * 3
    });
  }
}

function updateParticles(delta) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += 0.1; // gravity
    particle.life -= delta;
    
    if (particle.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

function tick(delta) {
  // Spawn power-ups
  spawnPowerUp();
  
  // Check power-up collisions
  checkPowerUpCollisions();
  
  // Update power-up timers
  for (let i = powerUps.length - 1; i >= 0; i--) {
    powerUps[i].timeLeft -= delta;
    if (powerUps[i].timeLeft <= 0) {
      powerUps.splice(i, 1);
    }
  }
  
  // Update particles
  updateParticles(delta);

  for (const player of players) {
    const inputs = inputsMap[player.id] || { up: false, down: false, left: false, right: false };
    const previousY = player.y;
    const previousX = player.x;
    
    
    // Calculate current speed (with speed boost, frozen, and slowed effects)
    let currentSpeed = SPEED;
    if (player.speedBoost && player.speedBoost > Date.now()) {
      currentSpeed *= 1.5;
    }
    if (player.frozen && player.frozen > Date.now()) {
      currentSpeed = 0; // Frozen players can't move
    } else if (player.slowed && player.slowed > Date.now()) {
      currentSpeed *= 0.3; // Slowed players move at 30% speed
    }

    if (inputs.up) {
      player.y = Math.max(PLAYER_SIZE / 2, player.y - currentSpeed);
    } else if (inputs.down) {
      player.y = Math.min(MAP_HEIGHT - PLAYER_SIZE / 2, player.y + currentSpeed);
    }

    if (isCollidingWithMap(player)) {
      player.y = previousY;
    }

    if (inputs.left) {
      player.x = Math.max(PLAYER_SIZE / 2, player.x - currentSpeed);
    } else if (inputs.right) {
      player.x = Math.min(MAP_WIDTH - PLAYER_SIZE / 2, player.x + currentSpeed);
    }

    if (isCollidingWithMap(player)) {
      player.x = previousX;
    }
    
    // Clean up expired power-ups and status effects
    if (player.speedBoost && player.speedBoost <= Date.now()) {
      player.speedBoost = null;
    }
    if (player.rapidFire && player.rapidFire <= Date.now()) {
      player.rapidFire = null;
    }
    if (player.shield && player.shield <= Date.now()) {
      player.shield = null;
    }
    if (player.health && player.health <= Date.now()) {
      player.health = null;
    }
    if (player.frozen && player.frozen <= Date.now()) {
      player.frozen = null;
    }
    if (player.slowed && player.slowed <= Date.now()) {
      player.slowed = null;
    }
  }

  for (const snowball of snowballs) {
    // Store previous position for collision detection
    const prevX = snowball.x;
    const prevY = snowball.y;
    
    snowball.x += Math.cos(snowball.angle) * SNOWBALL_SPEED;
    snowball.y += Math.sin(snowball.angle) * SNOWBALL_SPEED;
    
    // Check collision with buildings for all snowballs
    const snowballRect = { x: snowball.x - SNOWBALL_RADIUS, y: snowball.y - SNOWBALL_RADIUS, w: SNOWBALL_RADIUS * 2, h: SNOWBALL_RADIUS * 2 };
    let hitObstacle = false;
    
    // Check building collisions
    for (const building of buildings) {
      if (isColliding(snowballRect, { x: building.x, y: building.y, w: building.width, h: building.height })) {
        hitObstacle = true;
        break;
      }
    }
    
    // Check tile collisions
    if (!hitObstacle) {
      for (let row = 0; row < decal2D.length; row++) {
        for (let col = 0; col < decal2D[0].length; col++) {
          const tile = decal2D[row][col];
          if (tile && isColliding(snowballRect, { x: col * TILE_SIZE, y: row * TILE_SIZE, w: TILE_SIZE, h: TILE_SIZE })) {
            hitObstacle = true;
            break;
          }
        }
        if (hitObstacle) break;
      }
    }
    
    // If hit obstacle and not bouncy, destroy the snowball
    if (hitObstacle && snowball.type !== 'bouncy') {
      snowball.timeLeft = -1; // Destroy the snowball
      createParticles(snowball.x, snowball.y, 'impact');
    }
    
    snowball.timeLeft -= delta;

    // Handle bouncing for bouncy snowballs
    if (snowball.type === 'bouncy' && snowball.bounces > 0) {
      let bounced = false;
      
      // Bounce off map boundaries
      if (snowball.x <= SNOWBALL_RADIUS || snowball.x >= MAP_WIDTH - SNOWBALL_RADIUS) {
        snowball.angle = Math.PI - snowball.angle; // Reflect horizontally
        snowball.x = Math.max(SNOWBALL_RADIUS, Math.min(MAP_WIDTH - SNOWBALL_RADIUS, snowball.x));
        bounced = true;
      }
      if (snowball.y <= SNOWBALL_RADIUS || snowball.y >= MAP_HEIGHT - SNOWBALL_RADIUS) {
        snowball.angle = -snowball.angle; // Reflect vertically
        snowball.y = Math.max(SNOWBALL_RADIUS, Math.min(MAP_HEIGHT - SNOWBALL_RADIUS, snowball.y));
        bounced = true;
      }
      
      // Bounce off buildings
      if (!bounced) {
        const snowballRect = { x: snowball.x - SNOWBALL_RADIUS, y: snowball.y - SNOWBALL_RADIUS, w: SNOWBALL_RADIUS * 2, h: SNOWBALL_RADIUS * 2 };
        for (const building of buildings) {
          if (isColliding(snowballRect, { x: building.x, y: building.y, w: building.width, h: building.height })) {
            // Determine bounce direction based on which side of building was hit
            const snowballCenterX = snowball.x;
            const snowballCenterY = snowball.y;
            const buildingCenterX = building.x + building.width / 2;
            const buildingCenterY = building.y + building.height / 2;
            
            const dx = snowballCenterX - buildingCenterX;
            const dy = snowballCenterY - buildingCenterY;
            
            // Determine which side of the building was hit
            if (Math.abs(dx) > Math.abs(dy)) {
              // Hit left or right side
              snowball.angle = Math.PI - snowball.angle;
              snowball.x = dx > 0 ? building.x + building.width + SNOWBALL_RADIUS : building.x - SNOWBALL_RADIUS;
            } else {
              // Hit top or bottom side
              snowball.angle = -snowball.angle;
              snowball.y = dy > 0 ? building.y + building.height + SNOWBALL_RADIUS : building.y - SNOWBALL_RADIUS;
            }
            
            bounced = true;
            break; // Only bounce off one building per frame
          }
        }
      }
      
      // Bounce off map obstacles (tiles)
      if (!bounced) {
        const snowballRect = { x: snowball.x - SNOWBALL_RADIUS, y: snowball.y - SNOWBALL_RADIUS, w: SNOWBALL_RADIUS * 2, h: SNOWBALL_RADIUS * 2 };
        for (let row = 0; row < decal2D.length; row++) {
          for (let col = 0; col < decal2D[0].length; col++) {
            const tile = decal2D[row][col];
            if (tile && isColliding(snowballRect, { x: col * TILE_SIZE, y: row * TILE_SIZE, w: TILE_SIZE, h: TILE_SIZE })) {
              // Determine bounce direction based on which side of tile was hit
              const snowballCenterX = snowball.x;
              const snowballCenterY = snowball.y;
              const tileCenterX = col * TILE_SIZE + TILE_SIZE / 2;
              const tileCenterY = row * TILE_SIZE + TILE_SIZE / 2;
              
              const dx = snowballCenterX - tileCenterX;
              const dy = snowballCenterY - tileCenterY;
              
              if (Math.abs(dx) > Math.abs(dy)) {
                snowball.angle = Math.PI - snowball.angle;
                snowball.x = dx > 0 ? tileCenterX + TILE_SIZE / 2 + SNOWBALL_RADIUS : tileCenterX - TILE_SIZE / 2 - SNOWBALL_RADIUS;
              } else {
                snowball.angle = -snowball.angle;
                snowball.y = dy > 0 ? tileCenterY + TILE_SIZE / 2 + SNOWBALL_RADIUS : tileCenterY - TILE_SIZE / 2 - SNOWBALL_RADIUS;
              }
              
              bounced = true;
              break;
            }
          }
          if (bounced) break;
        }
      }
      
      if (bounced) {
        snowball.bounces--;
        // Create bounce particles
        createParticles(snowball.x, snowball.y, 'impact');
      }
    }

    for (const player of players) {
      if (player.id === snowball.playerId) continue;
      const distance = Math.sqrt(
        (player.x + PLAYER_SIZE / 2 - snowball.x) ** 2 +
          (player.y + PLAYER_SIZE / 2 - snowball.y) ** 2
      );
      if (distance <= PLAYER_SIZE / 2) {
        // Check if player has shield or health
        if (player.shield && player.shield > Date.now()) {
          // Shield blocks the snowball
          createParticles(snowball.x, snowball.y, 'impact');
          snowball.timeLeft = -1;
          break;
        } else if (player.health && player.health > Date.now()) {
          // Health power-up makes you invincible
          createParticles(snowball.x, snowball.y, 'impact');
          snowball.timeLeft = -1;
          break;
        } else {
          // Player gets hit - increment hit counter by damage amount
          player.hits += snowball.damage;
          createParticles(snowball.x, snowball.y, 'impact');
          
          // Apply special snowball effects
          switch (snowball.type) {
            case 'ice':
              // Ice snowball freezes player for 3 seconds and creates ice trail
              player.frozen = Date.now() + 3000;
              // Create ice particles around the hit player
              for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const offsetX = Math.cos(angle) * 30;
                const offsetY = Math.sin(angle) * 30;
                createParticles(player.x + 16 + offsetX, player.y + 16 + offsetY, 'impact');
              }
              break;
            case 'explosive':
              // Explosive snowball creates a spectacular explosion
              const explosionRadius = 150;
              const explosionSnowballs = 8; // Number of snowballs to shoot out
              
              // Create explosion particles
              for (let i = 0; i < 20; i++) {
                const angle = (i / 20) * Math.PI * 2;
                const distance = Math.random() * explosionRadius;
                const offsetX = Math.cos(angle) * distance;
                const offsetY = Math.sin(angle) * distance;
                createParticles(snowball.x + offsetX, snowball.y + offsetY, 'impact');
              }
              
              // Shoot out multiple snowballs in all directions
              for (let i = 0; i < explosionSnowballs; i++) {
                const angle = (i / explosionSnowballs) * Math.PI * 2;
                snowballs.push({
                  angle: angle,
                  x: snowball.x,
                  y: snowball.y,
                  timeLeft: 800, // Shorter lifetime for explosion snowballs
                  playerId: snowball.playerId,
                  type: 'normal', // Explosion snowballs are normal type
                  bounces: 0,
                  hitPlayers: []
                });
              }
              
              // Damage nearby players
              for (const nearbyPlayer of players) {
                if (nearbyPlayer.id === snowball.playerId) continue;
                const distance = Math.sqrt(
                  (nearbyPlayer.x - snowball.x) ** 2 + (nearbyPlayer.y - snowball.y) ** 2
                );
                if (distance <= explosionRadius) {
                  // Damage based on distance (closer = more damage)
                  const damageMultiplier = 1 - (distance / explosionRadius);
                  if (damageMultiplier > 0.5) { // Close explosion = instant kill
                    nearbyPlayer.hits = nearbyPlayer.maxHits;
                  } else if (damageMultiplier > 0.2) { // Medium distance = 2 hits
                    nearbyPlayer.hits += 2;
                  } else { // Far distance = 1 hit
                    nearbyPlayer.hits += 1;
                  }
                  
                  // Slow them down
                  nearbyPlayer.slowed = Date.now() + 3000;
                }
              }
              break;
            case 'freeze':
              // Freeze snowball slows player for 5 seconds and creates frost effect
              player.slowed = Date.now() + 5000;
              // Create frost particles that spread outward
              for (let i = 0; i < 12; i++) {
                const angle = (i / 12) * Math.PI * 2;
                const distance = 20 + Math.random() * 40;
                const offsetX = Math.cos(angle) * distance;
                const offsetY = Math.sin(angle) * distance;
                createParticles(player.x + 16 + offsetX, player.y + 16 + offsetY, 'impact');
              }
              break;
            case 'bouncy':
              // Bouncy snowball can hit multiple players and bounces off walls
              if (!snowball.hitPlayers.includes(player.id)) {
                snowball.hitPlayers.push(player.id);
                // Only slow the player, don't kill them
                player.slowed = Date.now() + 3000;
                // Create bouncy particles
                for (let i = 0; i < 6; i++) {
                  const angle = (i / 6) * Math.PI * 2;
                  const distance = 15 + Math.random() * 25;
                  const offsetX = Math.cos(angle) * distance;
                  const offsetY = Math.sin(angle) * distance;
                  createParticles(player.x + 16 + offsetX, player.y + 16 + offsetY, 'impact');
                }
                // Don't destroy the snowball, let it continue bouncing
                continue;
              }
              break;
          }
          
          // Check if player should die (hits >= maxHits)
          if (player.hits >= player.maxHits) {
            // Update scores with combo and kill streak system
            const shooter = players.find(p => p.id === snowball.playerId);
            if (shooter) {
              const now = Date.now();
              const timeSinceLastKill = now - shooter.lastKillTime;
              
              // Combo system: kills within 5 seconds get combo bonus
              if (timeSinceLastKill < 5000) {
                shooter.combo++;
              } else {
                shooter.combo = 1; // Reset combo if too much time passed
              }
              
              // Kill streak system
              shooter.killStreak++;
              shooter.lastKillTime = now;
              
              // Calculate score with bonuses
              let baseScore = 10;
              let comboBonus = Math.min(shooter.combo * 2, 20); // Max 20 combo bonus
              let streakBonus = Math.min(Math.floor(shooter.killStreak / 3) * 5, 25); // Max 25 streak bonus
              
              shooter.kills++;
              shooter.score += baseScore + comboBonus + streakBonus;
              
              // Emit combo event for special effects
              if (shooter.combo > 1) {
                io.emit("combo", { playerId: shooter.id, combo: shooter.combo, score: baseScore + comboBonus + streakBonus });
              }
              
              // Emit kill streak event for special effects
              if (shooter.killStreak > 0 && shooter.killStreak % 3 === 0) {
                io.emit("killStreak", { playerId: shooter.id, streak: shooter.killStreak });
              }
            }
            
            // Reset victim's kill streak and respawn
            player.killStreak = 0;
            player.combo = 0;
            player.deaths++;
            player.score = Math.max(0, player.score - 5); // Lose 5 points for dying
            player.hits = 0; // Reset hit counter
            
            // Respawn player at random position near center
            const respawnPos = getRandomRespawnPosition();
            player.x = respawnPos.x;
            player.y = respawnPos.y;
          }
          
          snowball.timeLeft = -1;
          break;
        }
      }
    }
  }
  snowballs = snowballs.filter((snowball) => snowball.timeLeft > 0);

      io.emit("players", players);
      io.emit("snowballs", snowballs);
      io.emit("powerUps", powerUps);
      io.emit("particles", particles);
      io.emit("buildings", buildings);
}

async function main() {
  ({ ground2D, decal2D } = await loadMap());
  initializeBuildings();

  io.on("connect", (socket) => {

    inputsMap[socket.id] = {
      up: false,
      down: false,
      left: false,
      right: false,
    };

    const spawnPos = getRandomRespawnPosition();
    players.push({
      id: socket.id,
      x: spawnPos.x,
      y: spawnPos.y,
      score: 0,
      kills: 0,
      deaths: 0,
      killStreak: 0,
      lastKillTime: 0,
      combo: 0,
      hits: 0, // Track number of hits taken
      maxHits: 3, // Default: 3 hits to kill
      lastShotTime: 0, // Track last shot time for fire rate limiting
      character: 'santa', // Default character
    });

    socket.emit("map", {
      ground: ground2D,
      decal: decal2D,
    });

    socket.on("inputs", (inputs) => {
      inputsMap[socket.id] = inputs;
    });

    socket.on("mute", (isMuted) => {
      const player = players.find((player) => player.id === socket.id);
      player.isMuted = isMuted;
    });

    socket.on("voiceId", (voiceId) => {
      const player = players.find((player) => player.id === socket.id);
      player.voiceId = voiceId;
    });

    socket.on("selectCharacter", (data) => {
      const player = players.find((player) => player.id === socket.id);
      if (player) {
        player.character = data.character || 'santa';
      }
    });

    socket.on("snowball", (data) => {
      const player = players.find((player) => player.id === socket.id);
      const angle = data.angle || data; // Support both old and new format
      const type = data.type || 'normal'; // Default to normal snowball
      
      const now = Date.now();
      const fireRate = getSnowballFireRate(type);
      
      // Check fire rate limiting
      if (now - player.lastShotTime < fireRate) {
        return; // Too soon to fire again
      }
      
      player.lastShotTime = now;
      
      // Check for rapid fire
      if (player.rapidFire && player.rapidFire > now) {
        // Rapid fire: shoot 3 snowballs in a spread
        const spread = 0.3; // radians
        for (let i = -1; i <= 1; i++) {
          snowballs.push({
            angle: angle + (i * spread),
            x: player.x,
            y: player.y,
            timeLeft: 1000,
            playerId: socket.id,
            type: type,
            bounces: type === 'bouncy' ? 3 : 0,
            hitPlayers: [],
            damage: getSnowballDamage(type)
          });
        }
      } else {
        // Normal single snowball
        snowballs.push({
          angle,
          x: player.x,
          y: player.y,
          timeLeft: 1000,
          playerId: socket.id,
          type: type,
          bounces: type === 'bouncy' ? 3 : 0, // Bouncy snowballs can bounce 3 times
          hitPlayers: [], // Track which players this snowball has already hit
          damage: getSnowballDamage(type) // Different damage per snowball type
        });
      }
    });

    socket.on("disconnect", () => {
      players = players.filter((player) => player.id !== socket.id);
    });
  });

  app.use(express.static("public"));

  // Health check endpoint for Railway
  app.get("/health", (req, res) => {
    res.status(200).json({ 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  httpServer.listen(PORT);

  let lastUpdate = Date.now();
  setInterval(() => {
    const now = Date.now();
    const delta = now - lastUpdate;
    tick(delta);
    lastUpdate = now;
  }, 1000 / TICK_RATE);
}

main();
