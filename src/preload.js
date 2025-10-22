// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Send events to main process
  startSelection: () => ipcRenderer.send('start-selection'),
  clearSelection: () => ipcRenderer.send('clear-selection'),

  // Receive events from main process
  onSelectionStored: (callback) => {
    ipcRenderer.on('selection-stored', (event, coordinates) => callback(coordinates));
  },
  onSelectionCleared: (callback) => {
    ipcRenderer.on('selection-cleared', () => callback());
  }
});