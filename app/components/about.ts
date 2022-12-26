import { ipcRenderer, shell } from 'electron';
import * as process from 'process';
import { Events } from '../helpers/events';
const pkg = require('../../package.json');

class About {
  public constructor() {
    window.onload = () => {
      const electronVersion = document.querySelector('#electron-version');
      if (electronVersion) {
        electronVersion.textContent = process.versions.electron;
      }

      const appVersion = document.querySelector('#app-version');
      if (appVersion) {
        appVersion.textContent = pkg.version;
      }

      this.addListeners();
    };
  }

  private addListeners() {
    const linkClose = document.querySelector('#link-close');
    const linkWebsite = document.querySelector('#link-website');

    linkClose?.addEventListener('click', () => {
      ipcRenderer.send(Events.CLOSE_ABOUT_WINDOW);
    });

    linkWebsite?.addEventListener('click', async () => {
      await shell.openExternal('https://jonathas.com');
    });
  }
}

export default new About();
