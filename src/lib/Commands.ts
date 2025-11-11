import { Const } from "./Const";
import { globalShortcut } from "electron";

export class Commands {
  private TOGGLE_WINDOW: boolean = true;
  constructor() {
    this.registerCommands();
  }

  private registerCommands(): void {
    this.registerShortcut("CommandOrControl+\\", () => this.toggleWindow());
  }
  private registerShortcut(shortcut: string, handler: () => void): void {
    const success = globalShortcut.register(shortcut, handler);
    if (!success) {
      console.log(`Registration failed for: ${shortcut}`);
    }
  }

  private toggleWindow(): void {
    if (Const.mainWindow === null) return;
    this.TOGGLE_WINDOW = !this.TOGGLE_WINDOW;
    if (this.TOGGLE_WINDOW) {
      Const.mainWindow.show();
    } else {
      Const.mainWindow.hide();
    }
  }
}
