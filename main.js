const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile('index.html');
  win.setFullScreenable(true);

  let isMoveModeActive = false;
  let isMetaHeld = false;
  let isMouseDown = false;

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
        accelerator: 'CmdOrCtrl+M',
        click: () => {
          isMoveModeActive = !isMoveModeActive;
          win.webContents.send('toggle-move-mode', isMoveModeActive);
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

  // win.webContents.on('before-input-event', (event, input) => {
  //   if (input.key === 'Meta' && input.type === 'keyDown') {
  //     console.log('Meta key pressed');
  //     isMetaHeld = true;
  //   }
  //   else if (input.key === 'Meta' && input.type === 'keyUp') {
  //     console.log('Meta key released');
  //     isMetaHeld = false;
  //   }
  // })

  // win.webContents.on('before-mouse-event', (event, input) => {
  //   if (input.type === 'mouseUp'){
  //     win.webContents.send('deactivate-move-mode');
  //   }
  // })

  function test() {
    setInterval(() => {
      if (isMetaHeld) {
        console.log('down');
        win.webContents.send('toggle-move-mode', true);
      } else if (!isMetaHeld) {
        console.log('false');
        win.webContents.send('toggle-move-mode', false);
      }
    }, 100);
  };

  test ();

  win.on('blur', () => {
    if (isMoveModeActive) {
      isMoveModeActive = false;
      win.webContents.send('toggle-move-mode', false);
      console.log('Pencere odak dışına çıktı - Taşıma modu PASİF');
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});