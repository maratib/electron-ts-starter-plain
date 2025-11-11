import { app, ipcMain } from "electron";

export class IPCHelper {
  constructor() {
    this.createHandlers();
  }

  private createHandlers(): void {
    ipcMain.handle("handle-exit", () => {
      app.quit();
    });
  }
}
