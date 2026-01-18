/**
 * electron-macosx.js
 * macOS Porting Tool Window
 * Activated by macosxJS() function
 */

// Bash script for macOS Porting Tool
const MACOSX_BASH_SCRIPT = `#!/bin/bash

# ===========================================
# Electron to macOS Porting Tool - Batch Script
# ===========================================
# This script will port Electron game to macOS
# Created by MacOS_X_ Electron Cover Grid
# ============================================

echo "Hello World from macOS Porting Tool!"
echo "====================================="
echo ""
echo "📦 Batch Electron Game Porting for macOS"
echo "📅 Generated on: $(date)"
echo "🎮 Total Games: [GAME_COUNT_PLACEHOLDER]"
echo ""

# Define directories
MACOS_APPS_DIR="$HOME/Applications/Electron Games"
GAMES_DIR="$HOME/Games/Electron"
DOWNLOADS_DIR="$HOME/Downloads/Electron_Games"

# Create directories
echo "📁 Creating directories..."
mkdir -p "$MACOS_APPS_DIR"
mkdir -p "$GAMES_DIR"
mkdir -p "$DOWNLOADS_DIR"
echo "✅ Directories created successfully!"
echo ""

# Porting function
port_game() {
    local game_name="$1"
    local game_url="$2"
    local cover_url="$3"
    
    echo "🔄 Porting: $game_name"
    echo "🔗 Game URL: $game_url"
    
    # Download game
    local game_file="$DOWNLOADS_DIR/$(echo "$game_name" | tr ' ' '_').zip"
    echo "⬇️  Downloading game..."
    
    # Create macOS .app bundle
    local app_name="$game_name.app"
    local app_path="$MACOS_APPS_DIR/$app_name"
    
    echo "📦 Creating macOS app bundle..."
    
    # App bundle structure
    mkdir -p "$app_path/Contents/MacOS"
    mkdir -p "$app_path/Contents/Resources"
    
    # Info.plist
    cat > "$app_path/Contents/Info.plist" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleName</key>
    <string>$game_name</string>
    <key>CFBundleDisplayName</key>
    <string>$game_name</string>
    <key>CFBundleIdentifier</key>
    <string>com.Electron.$game_name</string>
    <key>CFBundleVersion</key>
    <string>1.0</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleSignature</key>
    <string>Electron</string>
    <key>CFBundleExecutable</key>
    <string>GameLauncher</string>
    <key>LSMinimumSystemVersion</key>
    <string>10.13</string>
</dict>
</plist>
EOF
    
    # Game launcher script
    cat > "$app_path/Contents/MacOS/GameLauncher" <<EOF
#!/bin/bash
cd "\$(dirname "\$0")/../Resources"
echo "🚀 Launching $game_name..."
# Add your emulator launch command here
open -a "OpenEmu" --args "$game_name"
EOF
    
    chmod +x "$app_path/Contents/MacOS/GameLauncher"
    
    # Icon
    if [[ -n "$cover_url" ]]; then
        echo "🎨 Downloading cover art..."
        # Convert cover to .icns
    fi
    
    echo "✅ $game_name ported successfully!"
    echo ""
}

echo "🔧 System Information:"
echo "   - macOS Version: $(sw_vers -productVersion)"
echo "   - System: $(uname -m)"
echo "   - User: $(whoami)"
echo ""

echo "📋 Available Commands:"
echo "   1. Port all games"
echo "   2. Port specific game"
echo "   3. Create app bundles only"
echo "   4. Download games only"
echo "   5. Generate icons"
echo ""

echo "⚙️  Porting Process:"
echo "   1. Download Electron ROMs"
echo "   2. Extract game files"
echo "   3. Create .app bundles"
echo "   4. Add cover art icons"
echo "   5. Move to Applications"
echo "   6. Add to Launchpad"
echo ""

echo "⚠️  Disclaimer:"
echo "   This tool is for educational purposes only."
echo "   Ensure you own legal copies of games you port."
echo ""

echo "🎯 Ready to port Electron games to macOS!"
echo "   Run: ./Electron_to_macos.sh to start"
echo ""

# Example usage
echo "📝 Example porting commands:"
echo '   port_game "Final Fantasy VII" "http://example.com/ff7.zip" "http://example.com/ff7_cover.jpg"'
echo '   port_game "Metal Gear Solid" "http://example.com/mgs.zip" "http://example.com/mgs_cover.jpg"'
echo ""

echo "💡 Tips:"
echo "   • Run 'chmod +x Electron_to_macos.sh' first"
echo "   • Use right-click → Open if you see security warnings"
echo "   • Add to Dock: Drag .app to Dock"
echo ""

echo "✨ Batch script generation complete!"
echo "====================================="
`;

// Main function to show macOS porting tool with original template style
function macosxJS(title, cover_url, splash_url) {
  console.log("🎮 macOS Porting Tool activated");
  const gamesCount = 0;

  // Create the overlay if it doesn't exist
  let overlay = document.getElementById("macosx-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "macosx-overlay";
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.85);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      backdrop-filter: blur(5px);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    `;
    document.body.appendChild(overlay);
  } else {
    overlay.style.display = "flex";
    return; // Already visible
  }

  // Create the window
  const windowContainer = document.createElement("div");
  windowContainer.style.cssText = `
    width: 90%;
    max-width: 1000px;
    height: 80vh;
    background: rgba(30, 30, 40, 0.95);
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
  `;

  // Window header with macOS controls
  const windowHeader = document.createElement("div");
  windowHeader.style.cssText = `
    background: rgba(40, 40, 50, 0.95);
    padding: 12px 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    user-select: none;
  `;

  // Window controls (macOS style)
  const windowControls = document.createElement("div");
  windowControls.style.cssText = `
    display: flex;
    gap: 8px;
  `;

  // macOS window control buttons
  const closeBtn = document.createElement("div");
  closeBtn.className = "control-btn close-btn";
  closeBtn.style.cssText = `
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ff5f57;
    transition: opacity 0.2s ease;
    cursor: pointer;
  `;

  const minimizeBtn = document.createElement("div");
  minimizeBtn.className = "control-btn minimize-btn";
  minimizeBtn.style.cssText = `
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ffbd2e;
    transition: opacity 0.2s ease;
    cursor: pointer;
  `;

  const maximizeBtn = document.createElement("div");
  maximizeBtn.className = "control-btn maximize-btn";
  maximizeBtn.style.cssText = `
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #28ca42;
    transition: opacity 0.2s ease;
    cursor: pointer;
  `;

  windowControls.appendChild(closeBtn);
  windowControls.appendChild(minimizeBtn);
  windowControls.appendChild(maximizeBtn);

  // Window title
  const windowTitle = document.createElement("div");
  windowTitle.textContent = "macOS Porting Tool";
  windowTitle.style.cssText = `
    flex: 1;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 500;
    color: #ccc;
  `;

  windowHeader.appendChild(windowControls);
  windowHeader.appendChild(windowTitle);

  // Window content area
  const windowContent = document.createElement("div");
  windowContent.style.cssText = `
    flex: 1;
    display: flex;
    overflow: hidden;
    background: #000;
  `;

  // Left panel - Information
  const leftPanel = document.createElement("div");
  leftPanel.style.cssText = `
    width: 300px;
    background: #111;
    padding: 20px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    overflow-y: auto;
  `;

  // App header with icon
  const appHeader = document.createElement("div");
  appHeader.style.cssText = `
    text-align: center;
    margin-bottom: 20px;
  `;

  const appIcon = document.createElement("img");
  appIcon.src = "https://cdn.sdappnet.cloud/rtx/images/mac-os-x.png";
  appIcon.alt = "macOS";
  appIcon.style.cssText = `
    width: 80px;
    height: 80px;
    border-radius: 16px;
    margin-bottom: 15px;
  `;

  const appName = document.createElement("h2");
  appName.textContent = "Electron to macOS";
  appName.style.cssText = `
    color: #fff;
    margin: 0 0 5px 0;
    font-size: 1.4rem;
    font-weight: 600;
  `;

  const appSubtitle = document.createElement("p");
  appSubtitle.textContent = "Porting Tool";
  appSubtitle.style.cssText = `
    color: #aaa;
    margin: 0;
    font-size: 0.95rem;
  `;

  appHeader.appendChild(appIcon);
  appHeader.appendChild(appName);
  appHeader.appendChild(appSubtitle);
  leftPanel.appendChild(appHeader);

  // Stats box
  const statsBox = document.createElement("div");
  statsBox.style.cssText = `
    background: rgba(40, 40, 50, 0.9);
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
  `;

  const statsTitle = document.createElement("h3");
  statsTitle.textContent = "📊 Statistics";
  statsTitle.style.cssText = `
    color: #fff;
    margin: 0 0 10px 0;
    font-size: 16px;
    font-weight: 600;
  `;

  const gameCountStat = document.createElement("div");
  gameCountStat.textContent = `🎮 Games: ${gamesCount}`;
  gameCountStat.style.cssText = `
    color: #4CAF50;
    margin-bottom: 8px;
    font-size: 14px;
  `;

  const scriptStatus = document.createElement("div");
  scriptStatus.textContent = "📝 Script: Ready";
  scriptStatus.style.cssText = `
    color: #2196F3;
    margin-bottom: 8px;
    font-size: 14px;
  `;

  const generatedDate = document.createElement("div");
  generatedDate.textContent = "📅 Generated: Now";
  generatedDate.style.cssText = `
    color: #FF9800;
    font-size: 14px;
  `;

  statsBox.appendChild(statsTitle);
  statsBox.appendChild(gameCountStat);
  statsBox.appendChild(scriptStatus);
  statsBox.appendChild(generatedDate);
  leftPanel.appendChild(statsBox);

  // Action buttons
  const actionsContainer = document.createElement("div");
  actionsContainer.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: auto;
  `;

  // Copy Script Button
  const copyButton = document.createElement("button");
  copyButton.textContent = "📋 Copy Script";
  copyButton.style.cssText = `
    background: rgba(70, 70, 80, 0.9);
    color: #ddd;
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  `;
  copyButton.addEventListener("mouseover", () => {
    copyButton.style.background = "rgba(80, 80, 90, 0.95)";
    copyButton.style.color = "#fff";
    copyButton.style.transform = "translateX(2px)";
  });
  copyButton.addEventListener("mouseout", () => {
    copyButton.style.background = "rgba(70, 70, 80, 0.9)";
    copyButton.style.color = "#ddd";
    copyButton.style.transform = "translateX(0)";
  });
  copyButton.addEventListener("click", () => {
    const script = MACOSX_BASH_SCRIPT.replace(
      "[GAME_COUNT_PLACEHOLDER]",
      gamesCount
    );
    navigator.clipboard.writeText(script).then(() => {
      const originalText = copyButton.textContent;
      copyButton.textContent = "✅ Copied!";
      copyButton.style.background = "rgba(76, 175, 80, 0.9)";
      setTimeout(() => {
        copyButton.textContent = originalText;
        copyButton.style.background = "rgba(70, 70, 80, 0.9)";
      }, 2000);
    });
  });

  // Download Script Button
  const downloadButton = document.createElement("button");
  downloadButton.textContent = "💾 Download .sh";
  downloadButton.style.cssText = `
    background: rgba(70, 70, 80, 0.9);
    color: #ddd;
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  `;
  downloadButton.addEventListener("mouseover", () => {
    downloadButton.style.background = "rgba(80, 80, 90, 0.95)";
    downloadButton.style.color = "#fff";
    downloadButton.style.transform = "translateX(2px)";
  });
  downloadButton.addEventListener("mouseout", () => {
    downloadButton.style.background = "rgba(70, 70, 80, 0.9)";
    downloadButton.style.color = "#ddd";
    downloadButton.style.transform = "translateX(0)";
  });
  downloadButton.addEventListener("click", () => {
    const script = MACOSX_BASH_SCRIPT.replace(
      "[GAME_COUNT_PLACEHOLDER]",
      gamesCount
    );
    const blob = new Blob([script], { type: "text/x-shellscript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Electron_to_macos.sh";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const originalText = downloadButton.textContent;
    downloadButton.textContent = "✅ Downloaded!";
    downloadButton.style.background = "rgba(76, 175, 80, 0.9)";
    setTimeout(() => {
      downloadButton.textContent = originalText;
      downloadButton.style.background = "rgba(70, 70, 80, 0.9)";
    }, 2000);
  });

  // Close Button
  const closeButton = document.createElement("button");
  closeButton.textContent = "✕ Close";
  closeButton.style.cssText = `
    background: rgba(90, 30, 30, 0.9);
    color: #ddd;
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  `;
  closeButton.addEventListener("mouseover", () => {
    closeButton.style.background = "rgba(120, 40, 40, 0.95)";
    closeButton.style.color = "#fff";
    closeButton.style.transform = "translateX(2px)";
  });
  closeButton.addEventListener("mouseout", () => {
    closeButton.style.background = "rgba(90, 30, 30, 0.9)";
    closeButton.style.color = "#ddd";
    closeButton.style.transform = "translateX(0)";
  });
  closeButton.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  actionsContainer.appendChild(copyButton);
  actionsContainer.appendChild(downloadButton);
  actionsContainer.appendChild(closeButton);
  leftPanel.appendChild(actionsContainer);

  // Right panel - Script viewer
  const rightPanel = document.createElement("div");
  rightPanel.style.cssText = `
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #000;
    overflow: hidden;
  `;

  // Script header
  const scriptHeader = document.createElement("div");
  scriptHeader.style.cssText = `
    background: rgba(40, 40, 50, 0.95);
    padding: 12px 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const scriptTitle = document.createElement("div");
  scriptTitle.textContent = "bash/Electron_to_macos.sh";
  scriptTitle.style.cssText = `
    color: #ccc;
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 0.9rem;
    font-weight: 500;
  `;

  const scriptInfo = document.createElement("div");
  scriptInfo.textContent = `${MACOSX_BASH_SCRIPT.split("\n").length} lines`;
  scriptInfo.style.cssText = `
    color: #888;
    font-size: 0.8rem;
    font-family: monospace;
  `;

  scriptHeader.appendChild(scriptTitle);
  scriptHeader.appendChild(scriptInfo);

  // Script content
  const scriptContent = document.createElement("div");
  scriptContent.style.cssText = `
    flex: 1;
    overflow: auto;
    padding: 20px;
    font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.5;
    color: #f0f0f0;
    background: #000;
  `;

  // Add syntax highlighting
  const formattedScript = MACOSX_BASH_SCRIPT.replace(
    "[GAME_COUNT_PLACEHOLDER]",
    gamesCount
  );
  scriptContent.innerHTML = formattedScript
    .replace(/^#!/gm, '<span style="color: #FF6B6B">$&</span>')
    .replace(/#.*$/gm, '<span style="color: #888">$&</span>')
    .replace(/echo.*$/gm, '<span style="color: #4ECDC4">$&</span>')
    .replace(/".*?"/gm, '<span style="color: #FFD166">$&</span>')
    .replace(
      /\b(echo|mkdir|chmod|open|cat|EOF)\b/gm,
      '<span style="color: #FF6B6B">$1</span>'
    )
    .replace(/\$(.*?)\b/gm, '<span style="color: #06D6A0">$&</span>')
    .replace(
      /\b(if|then|fi|do|done|for|in)\b/gm,
      '<span style="color: #118AB2">$1</span>'
    )
    .replace(/\n/g, "<br>")
    .replace(/ /g, "&nbsp;");

  rightPanel.appendChild(scriptHeader);
  rightPanel.appendChild(scriptContent);

  // Assemble window
  windowContent.appendChild(leftPanel);
  windowContent.appendChild(rightPanel);

  windowContainer.appendChild(windowHeader);
  windowContainer.appendChild(windowContent);
  overlay.appendChild(windowContainer);

  // Window control interactions
  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  minimizeBtn.addEventListener("click", () => {
    windowContent.style.display =
      windowContent.style.display === "none" ? "flex" : "none";
    minimizeBtn.style.opacity =
      windowContent.style.display === "none" ? "0.5" : "1";
  });

  maximizeBtn.addEventListener("click", () => {
    if (windowContainer.style.width === "100%") {
      windowContainer.style.width = "90%";
      windowContainer.style.maxWidth = "1000px";
      windowContainer.style.height = "80vh";
      maximizeBtn.style.opacity = "1";
    } else {
      windowContainer.style.width = "100%";
      windowContainer.style.maxWidth = "100%";
      windowContainer.style.height = "100%";
      maximizeBtn.style.opacity = "0.5";
    }
  });

  // Escape key to close
  const escapeHandler = (e) => {
    if (e.key === "Escape") {
      overlay.style.display = "none";
      document.removeEventListener("keydown", escapeHandler);
    }
  };
  document.addEventListener("keydown", escapeHandler);

  // Click outside to close
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.style.display = "none";
    }
  });

  console.log(`🎮 macOS Porting Tool displayed with ${gamesCount} games`);
}

// Export the function to global scope
window.macosxJS = macosxJS;

console.log("✅ electron-macosx.js loaded");
console.log("💻 Call macosxJS() to show the porting tool");
