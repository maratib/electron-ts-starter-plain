import { BrowserWindow } from "electron";

export class Const {
  static isMac: boolean = process.platform === "darwin";
  static isQuitting: boolean = false;
  static mainWindow: BrowserWindow | null = null;
  static screenWidth: number = 0;
  static screenHeight: number = 0;

  static statusUpdate(msg: string) {
    console.log(`MSG: ${msg}`);
    Const.mainWindow?.webContents.send("status-update", msg);
  }
}
