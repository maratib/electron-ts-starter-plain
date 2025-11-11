class RendererApp {
  private exitButton: HTMLButtonElement;
  private statusInfoDiv: HTMLDivElement;

  constructor() {
    this.initializeApp();
  }

  private async initializeApp(): Promise<void> {
    document.addEventListener("DOMContentLoaded", () => {
      this.setupDOM();
      this.setupEventListeners();
      this.setupMainMessageListener();
    });
  }

  setupDOM() {
    this.exitButton = document.getElementById(
      "exitButton"
    ) as HTMLButtonElement;

    this.statusInfoDiv = document.getElementById(
      "statusInfo"
    ) as HTMLDivElement;
  }
  setupEventListeners() {
    this.exitButton.addEventListener("click", () =>
      window.electronAPI.onExit()
    );
  }
  setupMainMessageListener() {
    window.electronAPI.onStatusUpdate((message: string) => {
      console.log(message);
      this.statusUpdate(message);
    });
  }

  private statusUpdate(message: string): void {
    this.statusInfoDiv.innerText = message;
  }
}

new RendererApp();
