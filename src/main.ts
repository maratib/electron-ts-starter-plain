import { app, globalShortcut } from "electron";
import { Const, IPCHelper, WindowHelper, Commands } from "./lib";

class Main {
  constructor() {
    this.setupApp();
  }

  private setupApp(): void {
    app.whenReady().then(() => {
      console.log("App is ready");
      new WindowHelper();
      new IPCHelper();
      new Commands();
      // Later, to check if otherWindow is still open:
      setTimeout(() => {
        if (Const.mainWindow !== null) {
          Const.statusUpdate("App is ready");
        }
      }, 2000);

      app.on("activate", () => {
        console.log("app-activated");
        if (Const.mainWindow === null) {
          console.log("calling Const.mainWindow : 1");
          new WindowHelper();
          new Commands();
        } else {
          console.log("calling Const.mainWindow : ");
          Const.mainWindow!.show();
        }
      });
    });

    app.on("window-all-closed", () => {
      console.log("window-all-closed");
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    app.on("will-quit", () => {
      console.log("will-quit");
      // Unregister all shortcuts to prevent memory leaks
      globalShortcut.unregisterAll();
    });

    app.on("before-quit", () => {
      console.log("before-quit");
      Const.isQuitting = true;
    });
  }
}

// Initialize the app
new Main();
