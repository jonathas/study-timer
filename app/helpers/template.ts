import { BrowserWindow } from 'electron';
import Data from './data';

class Template {
  public async generateTrayTemplate(mainWindow: BrowserWindow): Promise<Electron.MenuItem[]> {
    const courses = await Data.getCourses();
    return [{ label: 'Courses' }, { label: '', type: 'separator' }]
      .concat(courses.map(label => ({ label, type: 'radio', 
        click: () => mainWindow.webContents.send('course-changed', label) }))) as Electron.MenuItem[];
  }
}

export default new Template();
