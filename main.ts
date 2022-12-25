import { app, BrowserWindow, ipcMain, Tray, Menu } from 'electron';
import Data from './app/helpers/data';
import Template from './app/helpers/template';

class Main {
  private aboutWindow: BrowserWindow | null;

  private trayIcon = `${__dirname}/app/assets/img/icon-tray.png`;

  public constructor() {
    this.init();
    this.setOpenAboutWindowListener();
    this.setCloseAboutWindowListener();
    this.setStopTimerListener();
  }

  private init() {
    app.on('ready', async () => {
      const mainWindow = this.getMainWindow();
      await this.setTrayMenu(mainWindow);
      this.setCourseAddedListener(mainWindow);
      await mainWindow.loadURL(this.getScreenPath('main'));
    });
  }

  private async setTrayMenu(mainWindow: BrowserWindow, newCourse?: string) {
    const tray = new Tray(this.trayIcon);

    const template = !newCourse
      ? await Template.generateTrayTemplate(mainWindow)
      : await Template.addCourseToTray(newCourse, mainWindow);

    const trayMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(trayMenu);
  }

  private getScreenPath(screenName: string) {
    return `file://${__dirname}/app/views/${screenName}.html`;
  }

  private getMainWindow() {
    return new BrowserWindow({
      width: 600,
      height: 400,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });
  }

  private setOpenAboutWindowListener() {
    ipcMain.on('open-about-window', async () => {
      if (this.aboutWindow) {
        return;
      }
      this.aboutWindow = this.getAboutWindow();

      this.aboutWindow.on('closed', () => {
        this.aboutWindow = null;
      });

      await this.aboutWindow.loadURL(this.getScreenPath('about'));
    });
  }

  private getAboutWindow() {
    return new BrowserWindow({
      width: 300,
      height: 220,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      },
      alwaysOnTop: true,
      frame: false
    });
  }

  private setCloseAboutWindowListener() {
    ipcMain.on('close-about-window', () => {
      this.aboutWindow?.close();
    });
  }

  private setStopTimerListener() {
    ipcMain.on('stop-timer', async (_event, courseName, time) => {
      await Data.save(courseName, time);
    });
  }

  private setCourseAddedListener(mainWindow: BrowserWindow) {
    ipcMain.on('course-added', async (_event, courseName) => {
      await this.setTrayMenu(mainWindow, courseName);
    });
  }
}

new Main();
