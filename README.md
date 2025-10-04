# SnowballGame
 ![Alt text](SnowballGame.png)

Javascript Node and React project that allows users to connect to the server hosted on Railway and play a multiplayer snowball game that teleports the user to a random spawn point after being hit with a snowball. The user can click around their screen to select where they wish to throw the snowball and use their arrow keys to move.
The server accomplishes hosting this service by tracking each player by their port and allowing each port to send an input before updating the server for everyone else on the server giving the user 60 frames to provide an input before updating.



## Features

### Core Gameplay
- **Obstacles**: Obstacles cover the player while preventing the player from progressing through them
- **Moving Map**: Players are given a small area of the map to see and as they move the map will change around them creating a 2.5D simulation
- **Connection Check**: Automatically removes any players that have disconnected from the server

### New Fun Features Added
- **Power-up System**: 
  - Speed Boost (Green): Increases movement speed for 10 seconds
  - Rapid Fire (Red): Shoots 3 snowballs in a spread pattern for 15 seconds
  - Shield (Blue): Blocks incoming snowballs for 8 seconds

- **Special Snowball Types**:
  - Normal: Standard white snowball
  - Ice (Sky Blue): Freezes the target for 3 seconds
  - Explosive (Orange): Creates area damage affecting nearby players
  - Freeze (Deep Sky Blue): Slows the target for 5 seconds

- **Particle Effects**: 
  - Impact particles when snowballs hit players
  - Pickup particles when collecting power-ups
  - Movement particles for enhanced visual feedback

- **Scoring System**:
  - Real-time leaderboard showing kills, deaths, and scores
  - +10 points for each kill
  - -5 points for each death
  - Live score tracking and ranking

- **Weather Effects**:
  - Dynamic snowfall with wind effects
  - Atmospheric particle system

- **Enhanced UI**:
  - Minimap showing player positions, obstacles, and power-ups
  - Snowball type selector
  - Controls guide
  - Real-time leaderboard
  - Visual effects for player status (frozen, slowed, powered up)

### Controls

#### Desktop
- **WASD**: Move your character
- **Click**: Throw snowball in the direction of your mouse
- **Snowball Selector**: Choose different snowball types from the bottom-left panel
- **Mute Button**: Toggle voice chat on/off

#### Mobile
- **Virtual Joystick**: Touch and drag the left joystick to move your character
- **Shoot Button**: Tap the red "SHOOT" button to throw snowballs
- **Touch to Shoot**: Tap anywhere on the game area to shoot in that direction
- **Snowball Selector**: Choose different snowball types from the bottom-left panel
- **Mute Button**: Toggle voice chat on/off

### Mobile Features
- **Responsive Design**: Automatically adapts to different screen sizes
- **Touch Controls**: Intuitive virtual joystick and touch-to-shoot mechanics
- **Performance Optimized**: Reduced particle effects and optimized rendering for mobile devices
- **Orientation Support**: Handles device rotation and screen size changes
- **Mobile UI**: Reorganized interface elements for better mobile experience
