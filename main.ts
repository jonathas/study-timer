import { app, BrowserWindow, ipcMain, Tray, Menu } from 'electron';
import Data from './app/helpers/data';
import Template from './app/helpers/template';

class Main {
  private aboutWindow: BrowserWindow | null;

  public constructor() {
    this.init();
    this.setOpenAboutWindowListener();
    this.setCloseAboutWindowListener();
    this.setStopTimerListener();
  }

  private init() {
    app.on('ready', async () => {
      console.log('The app is ready!');
      const mainWindow = this.getMainWindow();      
      await this.setTrayMenu();
      mainWindow.loadURL(this.getScreenPath('index'));
    });
  }

  private async setTrayMenu() {
    const tray = new Tray(`${__dirname}/app/assets/img/icon-tray.png`);
    const trayMenu = Menu.buildFromTemplate(await Template.generateTrayTemplate());
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
    ipcMain.on('open-about-window', () => {
      if (this.aboutWindow) {
        return;
      }
      this.aboutWindow = this.getAboutWindow();
    
      this.aboutWindow.on('closed', () => {
        this.aboutWindow = null;
      });
    
      this.aboutWindow.loadURL(this.getScreenPath('about'));
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
      console.log(`The course ${courseName} was studied for ${time}.`);
      await Data.save(courseName, time);
    });    
  }
}

const main = new Main();
