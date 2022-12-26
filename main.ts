import { app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut } from 'electron';
import Data from './app/helpers/data';
import { Events } from './app/helpers/events';
import Template from './app/helpers/template';

class Main {
  private aboutWindow: BrowserWindow | null;

  private applicationMenu: Menu;

  private tray: Tray;

  public constructor() {
    this.init();
    this.setOpenAboutWindowListener();
    this.setCloseAboutWindowListener();
    this.setStopTimerListener();
  }

  private init() {
    app.on('ready', async () => {
      const mainWindow = this.getMainWindow();
      this.tray = new Tray(`${__dirname}/app/assets/img/icon-tray.png`);
      await this.setTrayMenu(mainWindow);
      this.setApplicationMenu(app);
      this.setCourseAddedListener(mainWindow);

      globalShortcut.register('CommandOrControl+Shift+S', () => {
        mainWindow.webContents.send(Events.START_STOP_TIMER);
      });

      await mainWindow.loadURL(this.getScreenPath('main'));
    });
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

  private async setTrayMenu(mainWindow: BrowserWindow, selectedCourse?: string) {
    const template = await Template.generateTrayTemplate(mainWindow, selectedCourse);
    this.tray.setContextMenu(Menu.buildFromTemplate(template));
  }

  private setApplicationMenu(app: Electron.App) {
    this.applicationMenu = Menu.buildFromTemplate(Template.generateMainMenuTemplate(app));
    Menu.setApplicationMenu(this.applicationMenu);
  }

  private setCourseAddedListener(mainWindow: BrowserWindow) {
    ipcMain.on('course-added', async (_event, courseName: string) => {
      await this.setTrayMenu(mainWindow, courseName);
    });
  }

  private getScreenPath(screenName: string) {
    return `file://${__dirname}/app/views/${screenName}.html`;
  }

  private setOpenAboutWindowListener() {
    ipcMain.on(Events.OPEN_ABOUT_WINDOW, async () => {
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
    ipcMain.on(Events.CLOSE_ABOUT_WINDOW, () => {
      this.aboutWindow?.close();
    });
  }

  private setStopTimerListener() {
    ipcMain.on(Events.STOP_TIMER, async (_event, courseName: string, time: string) => {
      await Data.save(courseName, time);
    });
  }
}

new Main();
