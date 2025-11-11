import { app, BrowserWindow, globalShortcut, screen } from "electron";
import { Const } from "./Const";
import path from "path";

export class WindowHelper {
  constructor() {
    this.createWindow();
  }

  private createWindow(): void {
    if (Const.mainWindow !== null) return;

    const primaryDisplay = screen.getPrimaryDisplay();
    // const primaryDisplay = screen.getAllDisplays()[0];
    // console.log("Displays :", primaryDisplay);
    const { width, height } = primaryDisplay.workAreaSize;
    Const.screenHeight = height;
    Const.screenWidth = width;

    const windowSettings: Electron.BrowserWindowConstructorOptions = {
      minWidth: 800,
      minHeight: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "../preload.js"),
      },
    };

    Const.mainWindow = new BrowserWindow(windowSettings);
    Const.mainWindow
      .loadFile(path.join(__dirname, "../index.html"))
      .catch((err) => {
        console.error("Failed to load URL:", err);
      });

    Const.mainWindow.webContents.openDevTools();

    Const.mainWindow.on("close", (event) => {
      //   Const.mainWindow = null; // Dereference the window object
      console.log("MainWindow Close called");
      if (Const.isMac) {
        if (!Const.isQuitting) {
          if (Const.mainWindow !== null) {
            console.log("Hiding the main window on macOS");
            event.preventDefault();
            Const.mainWindow.hide();
          }
        }
      }
    });

    Const.mainWindow.on("closed", () => {
      console.log("MainWindow CloseD called");
      Const.mainWindow = null; // Dereference the window object
    });
  }
}
