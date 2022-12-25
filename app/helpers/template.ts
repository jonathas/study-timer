import { BrowserWindow } from 'electron';
import Data from './data';

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
        click: () => mainWindow.webContents.send('course-changed', label)
      }))
    ) as Electron.MenuItem[];
  }

  public async addCourseToTray(courseName: string, mainWindow: BrowserWindow) {
    const trayTemplate = await this.generateTrayTemplate(mainWindow);
    const newCourse = {
      label: courseName,
      type: 'radio',
      click: () => mainWindow.webContents.send('course-changed', courseName)
    } as unknown as Electron.MenuItem;
    return trayTemplate.concat([newCourse]);
  }
}

export default new Template();
