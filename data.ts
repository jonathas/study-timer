import { stat } from 'fs/promises';

class Data {
  public async save(courseName: string) {
    const fileName = this.getFilename(courseName);
    try {
      await stat(fileName);
    } catch (err) {
      await this.createCourseFile(fileName, {});
    }
  }

  private getFilename(courseName: string) {
    return `${__dirname}/data/${courseName}.json`;
  }

  private async createCourseFile(fileName: string, fileContent: unknown) {
    // return jsonfile.writeFile(fileName, fileContent, { spaces: 2 });
    return { fileName, fileContent };
  }
}

export default new Data();
