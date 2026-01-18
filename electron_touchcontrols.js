/**
 * controller-js.js
 * Mobile game controller wrapper for JoyStick library
 * Auto-injects dual joystick controls for mobile/touch devices
 */

(function () {
  // Configuration
  const CONFIG = {
    enabled: true,
    zIndex: 9999,
    position: "fixed",
    opacity: 0.8,
    showLogs: true,
    autoReturnToCenter: true,
    joystickSize: 120,
    joystickMargin: 40,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    leftColor: "#3498db",
    rightColor: "#e74c3c",
  };

  // Mobile detection
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;

  // State management
  let leftJoystick = null;
  let rightJoystick = null;
  let leftContainer = null;
  let rightContainer = null;
  let controllerEnabled = CONFIG.enabled;
  let currentInput = {
    left: { x: 0, y: 0, direction: "C", normalized: { x: 0, y: 0 } },
    right: { x: 0, y: 0, direction: "C", normalized: { x: 0, y: 0 } },
  };

  // Create controller CSS
  function injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
            .mobile-controller {
                position: ${CONFIG.position};
                z-index: ${CONFIG.zIndex};
                touch-action: none;
                pointer-events: auto;
                opacity: ${CONFIG.opacity};
            }
            
            .mobile-controller.left {
                bottom: ${CONFIG.joystickMargin}px;
                left: ${CONFIG.joystickMargin}px;
            }
            
            .mobile-controller.right {
                bottom: ${CONFIG.joystickMargin}px;
                right: ${CONFIG.joystickMargin}px;
            }
            
            .mobile-controller canvas {
                background-color: ${CONFIG.backgroundColor};
                border-radius: 50%;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }
            
            .mobile-controller.left canvas {
                border: 3px solid ${CONFIG.leftColor};
            }
            
            .mobile-controller.right canvas {
                border: 3px solid ${CONFIG.rightColor};
            }
            
            .mobile-controller.disabled {
                opacity: 0.1;
                pointer-events: none;
            }
            
            @media (max-width: 768px) {
                .mobile-controller {
                    width: ${CONFIG.joystickSize}px !important;
                    height: ${CONFIG.joystickSize}px !important;
                }
            }
        `;
    document.head.appendChild(style);
  }

  // Create joystick containers
  function createContainers() {
    // Left container
    leftContainer = document.createElement("div");
    leftContainer.className = "mobile-controller left";
    leftContainer.id = "left-joystick-container";
    leftContainer.style.width = CONFIG.joystickSize + "px";
    leftContainer.style.height = CONFIG.joystickSize + "px";

    // Right container
    rightContainer = document.createElement("div");
    rightContainer.className = "mobile-controller right";
    rightContainer.id = "right-joystick-container";
    rightContainer.style.width = CONFIG.joystickSize + "px";
    rightContainer.style.height = CONFIG.joystickSize + "px";

    // Append to body
    document.body.appendChild(leftContainer);
    document.body.appendChild(rightContainer);
  }

  // Initialize joysticks
  function initializeJoysticks() {
    // Left joystick (Movement)
    leftJoystick = new JoyStick(
      "left-joystick-container",
      {
        title: "left-joystick",
        width: CONFIG.joystickSize,
        height: CONFIG.joystickSize,
        internalFillColor: CONFIG.leftColor,
        internalStrokeColor: "#2980b9",
        externalStrokeColor: "#3498db",
        autoReturnToCenter: CONFIG.autoReturnToCenter,
      },
      function (stickData) {
        updateInput("left", stickData);
        logInput("LEFT", stickData);
      }
    );

    // Right joystick (Look/Camera)
    rightJoystick = new JoyStick(
      "right-joystick-container",
      {
        title: "right-joystick",
        width: CONFIG.joystickSize,
        height: CONFIG.joystickSize,
        internalFillColor: CONFIG.rightColor,
        internalStrokeColor: "#c0392b",
        externalStrokeColor: "#e74c3c",
        autoReturnToCenter: CONFIG.autoReturnToCenter,
      },
      function (stickData) {
        updateInput("right", stickData);
        logInput("RIGHT", stickData);
      }
    );

    if (CONFIG.showLogs) {
      console.log("🎮 Dual joystick controller initialized");
      console.log("📱 Mobile detection:", isMobile);
      console.log("🎯 Left: Movement | Right: Look/Camera");
    }
  }

  // Update input state
  function updateInput(side, stickData) {
    currentInput[side] = {
      x: parseInt(stickData.x),
      y: parseInt(stickData.y),
      direction: stickData.cardinalDirection,
      normalized: {
        x: parseInt(stickData.x) / 100,
        y: parseInt(stickData.y) / 100,
      },
      raw: stickData,
    };
  }

  // Log input changes
  function logInput(side, stickData) {
    if (!CONFIG.showLogs) return;

    const directionMap = {
      C: "CENTER",
      N: "UP",
      NE: "UP-RIGHT",
      E: "RIGHT",
      SE: "DOWN-RIGHT",
      S: "DOWN",
      SW: "DOWN-LEFT",
      W: "LEFT",
      NW: "UP-LEFT",
    };

    const direction =
      directionMap[stickData.cardinalDirection] || stickData.cardinalDirection;
    console.log(
      `🎮 ${side}: ${direction} (X: ${stickData.x}, Y: ${stickData.y})`
    );
  }

  // Handle window resize
  function handleResize() {
    if (leftContainer && rightContainer) {
      const size = Math.min(CONFIG.joystickSize, window.innerWidth / 6);
      leftContainer.style.width = size + "px";
      leftContainer.style.height = size + "px";
      rightContainer.style.width = size + "px";
      rightContainer.style.height = size + "px";

      // Recreate joysticks with new size
      if (leftJoystick && rightJoystick) {
        leftContainer.innerHTML = "";
        rightContainer.innerHTML = "";
        initializeJoysticks();
      }
    }
  }

  // Toggle controller visibility
  function toggleController() {
    controllerEnabled = !controllerEnabled;

    if (leftContainer && rightContainer) {
      if (controllerEnabled) {
        leftContainer.classList.remove("disabled");
        rightContainer.classList.remove("disabled");
      } else {
        leftContainer.classList.add("disabled");
        rightContainer.classList.add("disabled");
      }
    }

    if (CONFIG.showLogs) {
      console.log(
        `🎮 Controller ${controllerEnabled ? "enabled" : "disabled"}`
      );
    }

    return controllerEnabled;
  }

  // Enable controller
  function enableController() {
    controllerEnabled = true;
    if (leftContainer && rightContainer) {
      leftContainer.classList.remove("disabled");
      rightContainer.classList.remove("disabled");
    }
  }

  // Disable controller
  function disableController() {
    controllerEnabled = false;
    if (leftContainer && rightContainer) {
      leftContainer.classList.add("disabled");
      rightContainer.classList.add("disabled");
    }
  }

  // Destroy controller
  function destroyController() {
    if (leftContainer && leftContainer.parentNode) {
      leftContainer.parentNode.removeChild(leftContainer);
    }
    if (rightContainer && rightContainer.parentNode) {
      rightContainer.parentNode.removeChild(rightContainer);
    }

    leftJoystick = null;
    rightJoystick = null;
    leftContainer = null;
    rightContainer = null;

    if (CONFIG.showLogs) {
      console.log("🎮 Controller destroyed");
    }
  }

  // Initialize controller
  function init() {
    if (!isMobile) {
      if (CONFIG.showLogs) {
        console.log("🎮 Controller not initialized (not a mobile device)");
      }
      return false;
    }

    try {
      injectStyles();
      createContainers();
      initializeJoysticks();

      // Add resize handler
      window.addEventListener("resize", handleResize);

      // Add toggle shortcuts
      document.addEventListener("keydown", function (e) {
        // Ctrl+Shift+C to toggle
        if (e.ctrlKey && e.shiftKey && e.key === "C") {
          toggleController();
        }
      });

      // Triple tap to toggle on mobile
      let tapCount = 0;
      let lastTap = 0;
      document.addEventListener("touchstart", function (e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;

        if (tapLength < 300 && tapLength > 0) {
          tapCount++;
          if (tapCount === 3) {
            toggleController();
            tapCount = 0;
          }
        } else {
          tapCount = 1;
        }
        lastTap = currentTime;
      });

      if (CONFIG.showLogs) {
        console.log("🎮 Mobile controller initialized successfully");
        console.log("📱 Triple-tap screen to toggle controller");
        console.log("🖥️ Desktop: Ctrl+Shift+C to toggle");
      }

      return true;
    } catch (error) {
      console.error("🎮 Failed to initialize controller:", error);
      return false;
    }
  }

  // Auto-initialize on mobile
  let initialized = false;

  // Public API
  window.MobileController = {
    init: function () {
      if (!initialized) {
        initialized = init();
      }
      return initialized;
    },

    toggle: toggleController,
    enable: enableController,
    disable: disableController,
    destroy: destroyController,

    getInput: function () {
      return currentInput;
    },

    getLeftInput: function () {
      return currentInput.left;
    },

    getRightInput: function () {
      return currentInput.right;
    },

    isEnabled: function () {
      return controllerEnabled;
    },

    isMobile: function () {
      return isMobile;
    },

    updateConfig: function (newConfig) {
      Object.assign(CONFIG, newConfig);
      if (initialized) {
        destroyController();
        initialized = init();
      }
    },
  };

  // Auto-initialize if on mobile
  if (isMobile) {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        setTimeout(() => MobileController.init(), 100);
      });
    } else {
      setTimeout(() => MobileController.init(), 100);
    }
  }

  // Log initialization
  console.log("🎮 controller-js.js loaded");
  console.log("📱 Mobile detection:", isMobile);
  if (!isMobile) {
    console.log("💡 To enable on desktop: MobileController.init()");
  }
})();
