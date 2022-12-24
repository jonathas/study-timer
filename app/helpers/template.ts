import Data from './data';

class Template {
  public async generateTrayTemplate(): Promise<Electron.MenuItem[]> {
    const courses = await Data.getCourses();
    return courses.map(label => ({ label, type: 'radio' })) as Electron.MenuItem[];
  }
}

export default new Template();
