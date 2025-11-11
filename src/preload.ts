import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

export interface ElectronAPI {
  onExit: () => Promise<any>;
  onStatusUpdate: (callback: (message: string) => void) => void;
}

// Create the API object
const electronAPI: ElectronAPI = {
  onExit: () => ipcRenderer.invoke("handle-exit"),
  onStatusUpdate: function (callback: (message: string) => void): void {
    ipcRenderer.on(
      "status-update",
      (event: IpcRendererEvent, message: string) => {
        callback(message);
      }
    );
  },
};

// Expose the API to the renderer process
contextBridge.exposeInMainWorld("electronAPI", electronAPI);
