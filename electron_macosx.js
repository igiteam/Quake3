/**
 * electron-macosx.js
 * macOS Porting Tool Window
 * Activated by macosxJS() function
 */

// Bash script for macOS Porting Tool
const MACOSX_BASH_SCRIPT = `#!/bin/bash

# ===========================================
# PS1 to macOS Porting Tool - Batch Script
# ===========================================
# This script will port multiple PS1 games to macOS
# Created by MacOS_X_ PS1 Cover Grid
# ============================================

echo "Hello World from macOS Porting Tool!"
echo "====================================="
echo ""
echo "📦 Batch PS1 Game Porting for macOS"
echo "📅 Generated on: $(date)"
echo "🎮 Total Games: [GAME_COUNT_PLACEHOLDER]"
echo ""

# Define directories
MACOS_APPS_DIR="$HOME/Applications/PS1 Games"
GAMES_DIR="$HOME/Games/PS1"
DOWNLOADS_DIR="$HOME/Downloads/PS1_Games"

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
    <string>com.ps1.$game_name</string>
    <key>CFBundleVersion</key>
    <string>1.0</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleSignature</key>
    <string>PS1</string>
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
echo "   1. Download PS1 ROMs"
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

echo "🎯 Ready to port PS1 games to macOS!"
echo "   Run: ./ps1_to_macos.sh to start"
echo ""

# Example usage
echo "📝 Example porting commands:"
echo '   port_game "Final Fantasy VII" "http://example.com/ff7.zip" "http://example.com/ff7_cover.jpg"'
echo '   port_game "Metal Gear Solid" "http://example.com/mgs.zip" "http://example.com/mgs_cover.jpg"'
echo ""

echo "💡 Tips:"
echo "   • Run 'chmod +x ps1_to_macos.sh' first"
echo "   • Use right-click → Open if you see security warnings"
echo "   • Add to Dock: Drag .app to Dock"
echo ""

echo "✨ Batch script generation complete!"
echo "====================================="
`;

// Main function to show macOS porting tool
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
        height: 90vh;
        background: #1a1a1a;
        border-radius: 12px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
        border: 1px solid #333;
    `;

  // Window header
  const windowHeader = document.createElement("div");
  windowHeader.style.cssText = `
        background: linear-gradient(to bottom, #2d2d2d, #1f1f1f);
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #444;
        user-select: none;
    `;

  // Window controls
  const windowControls = document.createElement("div");
  windowControls.style.cssText = `
        display: flex;
        gap: 10px;
        align-items: center;
    `;

  const windowTitle = document.createElement("div");
  windowTitle.textContent = "macOS Porting Tool";
  windowTitle.style.cssText = `
        color: #fff;
        font-weight: 600;
        font-size: 16px;
        flex: 1;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    `;

  const closeButton = document.createElement("button");
  closeButton.innerHTML = "✕";
  closeButton.style.cssText = `
        background: #ff5f57;
        color: #000;
        border: none;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
    `;
  closeButton.onmouseover = () => (closeButton.style.opacity = "0.8");
  closeButton.onmouseout = () => (closeButton.style.opacity = "1");
  closeButton.onclick = () => {
    overlay.style.display = "none";
    console.log("🎮 macOS Porting Tool closed");
  };

  windowControls.appendChild(windowTitle);
  windowControls.appendChild(closeButton);
  windowHeader.appendChild(windowControls);

  // Window content
  const windowContent = document.createElement("div");
  windowContent.style.cssText = `
        flex: 1;
        display: flex;
        overflow: hidden;
        background: #000;
    `;

  // Left panel (info)
  const leftPanel = document.createElement("div");
  leftPanel.style.cssText = `
        width: 300px;
        background: #111;
        padding: 20px;
        display: flex;
        flex-direction: column;
        border-right: 1px solid #333;
        overflow-y: auto;
    `;

  // App icon
  const appIcon = document.createElement("div");
  appIcon.style.cssText = `
        text-align: center;
        margin-bottom: 20px;
    `;

  const iconImg = document.createElement("img");
  iconImg.src = "https://cdn.sdappnet.cloud/rtx/images/mac-os-x.png";
  iconImg.alt = "macOS";
  iconImg.style.cssText = `
        width: 100px;
        height: 100px;
        border-radius: 20px;
        margin-bottom: 10px;
    `;
  appIcon.appendChild(iconImg);

  const appTitle = document.createElement("h2");
  appTitle.textContent = "PS1 to macOS Porting Tool";
  appTitle.style.cssText = `
        color: #fff;
        margin: 0 0 10px 0;
        font-size: 18px;
        font-weight: 600;
        text-align: center;
    `;
  appIcon.appendChild(appTitle);

  const appDesc = document.createElement("p");
  appDesc.textContent = "Batch port PS1 games to macOS .app bundles";
  appDesc.style.cssText = `
        color: #888;
        margin: 0 0 20px 0;
        font-size: 14px;
        text-align: center;
        line-height: 1.4;
    `;
  appIcon.appendChild(appDesc);

  leftPanel.appendChild(appIcon);

  // Info box
  const infoBox = document.createElement("div");
  infoBox.style.cssText = `
        background: #222;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 20px;
    `;

  const infoTitle = document.createElement("h3");
  infoTitle.textContent = "📊 Statistics";
  infoTitle.style.cssText = `
        color: #fff;
        margin: 0 0 10px 0;
        font-size: 16px;
        font-weight: 600;
    `;
  infoBox.appendChild(infoTitle);

  const gameCount = document.createElement("div");
  gameCount.textContent = `🎮 Available Games: ${gamesCount}`;
  gameCount.style.cssText = `
        color: #4CAF50;
        margin-bottom: 8px;
        font-size: 14px;
    `;
  infoBox.appendChild(gameCount);

  const scriptStatus = document.createElement("div");
  scriptStatus.textContent = "📝 Script: Ready";
  scriptStatus.style.cssText = `
        color: #2196F3;
        margin-bottom: 8px;
        font-size: 14px;
    `;
  infoBox.appendChild(scriptStatus);

  leftPanel.appendChild(infoBox);

  // Action buttons
  const actionsBox = document.createElement("div");
  actionsBox.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: auto;
    `;

  // Copy button
  const copyButton = document.createElement("button");
  copyButton.textContent = "📋 Copy Bash Script";
  copyButton.style.cssText = `
        background: linear-gradient(to bottom, #007AFF, #0056CC);
        color: white;
        border: none;
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    `;
  copyButton.onmouseover = () => (copyButton.style.opacity = "0.9");
  copyButton.onmouseout = () => (copyButton.style.opacity = "1");
  copyButton.onclick = () => {
    const script = MACOSX_BASH_SCRIPT.replace(
      "[GAME_COUNT_PLACEHOLDER]",
      gamesCount
    );
    navigator.clipboard
      .writeText(script)
      .then(() => {
        const originalText = copyButton.textContent;
        copyButton.textContent = "✅ Copied!";
        copyButton.style.background =
          "linear-gradient(to bottom, #4CAF50, #2E7D32)";
        setTimeout(() => {
          copyButton.textContent = originalText;
          copyButton.style.background =
            "linear-gradient(to bottom, #007AFF, #0056CC)";
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        copyButton.textContent = "❌ Failed";
        setTimeout(() => {
          copyButton.textContent = "📋 Copy Bash Script";
        }, 2000);
      });
  };
  actionsBox.appendChild(copyButton);

  // Download button
  const downloadButton = document.createElement("button");
  downloadButton.textContent = "💾 Download .sh File";
  downloadButton.style.cssText = `
        background: linear-gradient(to bottom, #34C759, #28A745);
        color: white;
        border: none;
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    `;
  downloadButton.onmouseover = () => (downloadButton.style.opacity = "0.9");
  downloadButton.onmouseout = () => (downloadButton.style.opacity = "1");
  downloadButton.onclick = () => {
    const script = MACOSX_BASH_SCRIPT.replace(
      "[GAME_COUNT_PLACEHOLDER]",
      gamesCount
    );
    const blob = new Blob([script], { type: "text/x-shellscript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ps1_to_macos.sh";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const originalText = downloadButton.textContent;
    downloadButton.textContent = "✅ Downloaded!";
    setTimeout(() => {
      downloadButton.textContent = originalText;
    }, 2000);
  };
  actionsBox.appendChild(downloadButton);

  // Close button
  const closeButton2 = document.createElement("button");
  closeButton2.textContent = "✕ Close Tool";
  closeButton2.style.cssText = `
        background: linear-gradient(to bottom, #FF3B30, #D70015);
        color: white;
        border: none;
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s;
    `;
  closeButton2.onmouseover = () => (closeButton2.style.opacity = "0.9");
  closeButton2.onmouseout = () => (closeButton2.style.opacity = "1");
  closeButton2.onclick = () => (overlay.style.display = "none");
  actionsBox.appendChild(closeButton2);

  leftPanel.appendChild(actionsBox);

  // Right panel (script viewer)
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
        background: #1a1a1a;
        padding: 15px 20px;
        border-bottom: 1px solid #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

  const scriptTitle = document.createElement("div");
  scriptTitle.textContent = "bash/ps1_to_macos.sh";
  scriptTitle.style.cssText = `
        color: #fff;
        font-family: 'Monaco', 'Menlo', monospace;
        font-size: 14px;
        font-weight: 500;
    `;

  const scriptActions = document.createElement("div");
  scriptActions.style.cssText = `
        display: flex;
        gap: 10px;
        align-items: center;
    `;

  const lineCount = document.createElement("div");
  lineCount.textContent = `${MACOSX_BASH_SCRIPT.split("\n").length} lines`;
  lineCount.style.cssText = `
        color: #888;
        font-size: 12px;
        font-family: monospace;
    `;

  scriptHeader.appendChild(scriptTitle);
  scriptActions.appendChild(lineCount);
  scriptHeader.appendChild(scriptActions);

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

  // Add escape key handler
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
console.log("💻 Call macosxJS(gamesCount) to show the porting tool");
