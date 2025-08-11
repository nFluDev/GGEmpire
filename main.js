const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

let win;
let currentTitleBarStyle = 'hiddenInset';
let currentFrameState = true;

function createWindow(titleBarStyle, frameState, bounds = { width: 1280, height: 720 }) {
  win = new BrowserWindow({
    ...bounds,
    titleBarStyle: titleBarStyle,
    frame: frameState,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile('index.html');
  win.setFullScreenable(true);

  let isMoveModeActive = false;

  const setupWindowListeners = () => {
    win.webContents.on('context-menu', (e, params) => {
      e.preventDefault();

      const isFullscreen = win.isFullScreen();

      const menu = Menu.buildFromTemplate([
        {
          label: isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen',
          click: () => win.setFullScreen(!isFullscreen),
        },
        { label: 'Minimize', click: () => win.minimize() },
        {
          label: isMoveModeActive ? 'Taşımayı Kapat' : 'Taşı',
          click: () => {
            isMoveModeActive = !isMoveModeActive;
            win.webContents.send('toggle-move-mode', isMoveModeActive);
          },
        },
        {
          label: 'Toggle Frame',
          click: () => {
            let nextStyle;
            let nextFrameState;
            
            if (titleBarStyle === 'hiddenInset' && frameState === true) {
              nextStyle = 'default';
              nextFrameState = true;
            } else if (titleBarStyle === 'default' && frameState === true) {
              nextStyle = 'default';
              nextFrameState = false;
            } else if (titleBarStyle === 'default' && frameState === false) {
              nextStyle = 'hiddenInset';
              nextFrameState = true;
            } else {
              nextStyle = 'hiddenInset';
              nextFrameState = true;
            }

            currentTitleBarStyle = nextStyle;
            currentFrameState = nextFrameState;

            const currentBounds = win.getBounds();
            win.close();
            createWindow(currentTitleBarStyle, currentFrameState, currentBounds);
          },
        },
        { type: 'separator' },
        {
          label: 'Geliştirici Konsolu',
          click: () => win.webContents.toggleDevTools(),
        },
        { type: 'separator' },
        { label: 'Quit', click: () => app.quit() },
      ]);
      menu.popup({ window: win, x: params.x, y: params.y });
    });

    ipcMain.on('drag-window', (_, { deltaX, deltaY }) => {
      if (isMoveModeActive) {
        const [winX, winY] = win.getPosition();
        win.setPosition(winX + deltaX, winY + deltaY);
      }
    });

    win.on('blur', () => {
      if (isMoveModeActive) {
        isMoveModeActive = false;
        win.webContents.send('toggle-move-mode', false);
      }
    });
  };

  setupWindowListeners();
}

app.whenReady().then(() => {
  createWindow(currentTitleBarStyle, currentFrameState);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow(currentTitleBarStyle, currentFrameState);
    }
  });
});

app.on('window-all-closed', () => {
  app.quit();
});