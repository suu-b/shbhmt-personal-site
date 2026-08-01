const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  pushToGitHub: (path, message, content) => {
    return ipcRenderer.invoke('push-to-github', { path, message, content });
  },
  updateOnGitHub: (path, message, content) => {
    return ipcRenderer.invoke('update-on-github', { path, message, content });
  },
  readFileFromGitHub: (path) => {
    return ipcRenderer.invoke('read-from-github', { path });
  },
  readDirFromGitHub: (path) => {
    return ipcRenderer.invoke('read-dir-from-github', { path });
  },
  deployToGitHub: (contentPath, content, message) => {
    return ipcRenderer.invoke('deploy-to-github', { contentPath, content, message });
  }
});

contextBridge.exposeInMainWorld('nav', {
  go: (target) => ipcRenderer.send('navigate', target)
})

contextBridge.exposeInMainWorld('state', {
  set(key, value) {
    ipcRenderer.send('set-state', { key, value });
  },
  async get(key) {
    return await ipcRenderer.invoke('get-state', key);
  }
});

