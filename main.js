const { app, BrowserWindow, screen } = require("electron");
const path = require("path");

// Hot-reloading setup 
require("electron-reload")(__dirname, {
	electron: path.join(__dirname, "node_modules", ".bin", "electron"),
});

app.commandLine.appendSwitch("high-dpi-support", "true");
app.commandLine.appendSwitch("force-device-scale-factor", "1");

app.whenReady().then(() => {
	const primaryDisplay = screen.getPrimaryDisplay();
	const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;

	const windowWidth = 450;
	const windowHeight = 844;

	function createWindow() {
		const win = new BrowserWindow({
			width: windowWidth,
			height: windowHeight,
			x: screenWidth - windowWidth, // Right side
			y: screenHeight - windowHeight, // Bottom side
			frame: false,
			resizable: true,
			webPreferences: {
				preload: path.join(__dirname, "preload.js"),
				contextIsolation: true,
				webSecurity: false,
			},
		});

		win.loadFile("index.html");
		// win.setAlwaysOnTop(true, "screen-saver");
		win.setMenuBarVisibility(false);
	}

	createWindow();
});

