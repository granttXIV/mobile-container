const { app, BrowserWindow } = require('electron');
const path = require('path');

// Hot-reloading setup (keep if using)
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

// Ignore SSL cert errors (dev-only!)
app.commandLine.appendSwitch('ignore-certificate-errors');

// Disable site isolation to allow iframe contentDocument access (dev-only! Reduces security)
app.commandLine.appendSwitch('disable-site-isolation-trials');

function createWindow () {
  const win = new BrowserWindow({
    width: 390,
    height: 844,
    frame: false,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      webSecurity: false  // Required for cross-origin iframe access
    }
  });

  win.loadFile('index.html');

  // Optional: Open DevTools for debugging
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);