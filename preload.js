const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    dragWindow: (deltaX, deltaY) => ipcRenderer.send('drag-window', { deltaX, deltaY }),
    onToggleMoveMode: (callback) => ipcRenderer.on('toggle-move-mode', callback),
    deactivateMoveMode: () => ipcRenderer.send('deactivate-move-mode')
});