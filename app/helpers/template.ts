import { BrowserWindow, ipcMain } from 'electron';
import Data from './data';
import { Events } from './events';

class Template {
  public async generateTrayTemplate(
    mainWindow: BrowserWindow,
    selectedCourse?: string
  ): Promise<Electron.MenuItem[]> {
    const baseTemplate = [{ label: 'Courses' }, { label: '', type: 'separator' }];
    const courses = await Data.getCourses();
    return baseTemplate.concat(
      courses.map((label) => ({
        label,
        type: 'radio',
        checked: label === selectedCourse,
        click: () => mainWindow.webContents.send(Events.COURSE_CHANGED, label)
      }))
    ) as Electron.MenuItem[];
  }

  public generateMainMenuTemplate(app: Electron.App): Electron.MenuItem[] {
    return [
      {
        label: app.getName(),
        submenu: [{ label: 'Quit', role: 'quit' }]
      },
      {
        label: 'View',
        submenu: [
          { label: 'Reload', role: 'reload' },
          { label: 'Toggle Developer Tools', role: 'toggledevtools' }
        ]
      },
      {
        label: 'Window',
        submenu: [{ label: 'Minimize', role: 'minimize' }]
      },
      {
        label: 'About',
        submenu: [
          {
            label: 'About Study Timer',
            click: () => ipcMain.emit(Events.OPEN_ABOUT_WINDOW),
            accelerator: 'CmdOrCtrl+Shift+I'
          }
        ]
      }
    ] as unknown as Electron.MenuItem[];
  }
}

export default new Template();
