import { app, BrowserWindow, ipcMain } from 'electron';
import Data from './data';

app.on('ready', () => {
  console.log('App is ready!');
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => {
  app.quit();
});

let aboutWindow: BrowserWindow | null;
ipcMain.on('open-about-window', () => {
  if (aboutWindow) {
    return;
  }
  aboutWindow = new BrowserWindow({
    width: 300,
    height: 220,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    alwaysOnTop: true,
    frame: false
  });

  aboutWindow.on('closed', () => {
    aboutWindow = null;
  });

  aboutWindow.loadURL(`file://${__dirname}/app/about.html`);
});

ipcMain.on('close-about-window', () => {
  aboutWindow?.close();
});

ipcMain.on('stop-timer', async (event, courseName, time) => {
  console.log(`The course ${courseName} was studied for ${time}. ${JSON.stringify(event)}`);
  await Data.save(courseName);
});
