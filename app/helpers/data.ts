import { stat, writeFile, readFile, mkdir } from 'fs/promises';

interface CourseFile {
  lastStudy: string;
  time: string;
}

class Data {
  public async save(courseName: string, time: string) {
    const fileName = this.getFilename(courseName);
    try {
      await stat(fileName);
    } catch (err) {
      await mkdir(`${__dirname}/data`, { recursive: true });
    } finally {
      await this.addTimeToCourse(courseName, time);
    }
  }

  private getFilename(courseName: string) {
    return `${__dirname}/data/${courseName}.json`;
  }

  private async addTimeToCourse(courseName: string, time: string) {
    const fileName = this.getFilename(courseName);
    const data = {
      lastStudy: new Date().toISOString(),
      time
    };
    await writeFile(fileName, JSON.stringify(data, null, 2), { encoding: 'utf-8' })
  }

  public async get(courseName: string) {
    if (!courseName) {
      return;
    }
    const loadedFile = await readFile(this.getFilename(courseName), { encoding: 'utf-8' });
    return JSON.parse(loadedFile) as CourseFile;
  }
}

export default new Data();
