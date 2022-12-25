import { writeFile, readFile, readdir } from 'fs/promises';
import { mkdirSync } from 'fs';

interface CourseFile {
  lastStudy: string;
  time: string;
}

class Data {
  private readonly dataDirPath = `${__dirname}/../../data`;

  public constructor() {
    mkdirSync(this.dataDirPath, { recursive: true });
  }

  private getFilename(courseName: string) {
    return `${this.dataDirPath}/${courseName}.json`;
  }

  public async save(courseName: string, time = '00:00:00') {
    const fileName = this.getFilename(courseName);
    const data = {
      lastStudy: new Date().toISOString(),
      time
    };
    await writeFile(fileName, JSON.stringify(data, null, 2), { encoding: 'utf-8' });
  }

  public async get(courseName: string) {
    if (!courseName) {
      return;
    }
    const loadedFile = await readFile(this.getFilename(courseName), { encoding: 'utf-8' });
    return JSON.parse(loadedFile) as CourseFile;
  }

  public async getCourses() {
    const courses = await readdir(this.dataDirPath, { encoding: 'utf-8' });
    return courses.map((course) => course.replace('.json', ''));
  }
}

export default new Data();
