import { ipcRenderer, shell } from 'electron';
import * as process from 'process';

class About {
  public constructor() {
    window.onload = () => {
      const electronVersion = document.querySelector('#electron-version');
      if (electronVersion) {
        electronVersion.textContent = process.versions.electron;
      }

      this.addListeners();
    };
  }

  private addListeners() {
    const linkClose = document.querySelector('#link-close');
    const linkWebsite = document.querySelector('#link-website');

    linkClose?.addEventListener('click', () => {
      ipcRenderer.send('close-about-window');
    });

    linkWebsite?.addEventListener('click', async () => {
      await shell.openExternal('https://jonathas.com');
    });
  }
}

export default new About();
