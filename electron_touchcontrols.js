// In your game loop or main.js
function update() {
  if (window.controller && window.controller.isEnabled) {
    const input = window.controller.getInput();

    // Use joystick values
    const left = input.left;
    const right = input.right;

    // Example: Move character with left joystick
    if (left.direction !== "center") {
      character.x += left.x * 5;
      character.y += left.y * 5;
    }

    // Example: Rotate with right joystick
    if (right.direction !== "center") {
      character.rotation = Math.atan2(right.y, right.x);
    }
  }

  requestAnimationFrame(update);
}

// Start your game loop
update();
