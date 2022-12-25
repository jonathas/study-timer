import { ipcRenderer } from 'electron';
import Timer from './timer';
import Data from '../helpers/data';

class Renderer {
  private linkAbout: Element;

  private playButton: HTMLImageElement;

  private time: Element;

  private course: Element;

  private addButton: Element;

  private addInput: HTMLInputElement;

  public constructor() {
    this.setSelectors();
    this.addEventListeners();
  }

  private setSelectors() {
    this.linkAbout = document.querySelector('#link-about') as Element;
    this.playButton = document.querySelector('.play-button') as HTMLImageElement;
    this.time = document.querySelector('.time') as Element;
    this.course = document.querySelector('.course') as Element;
    this.addButton = document.querySelector('.add-button') as Element;
    this.addInput = document.querySelector('.add-input') as HTMLInputElement;
  }

  private addEventListeners() {
    window.onload = async () => {
      const data = await Data.get(this.course?.textContent || '');
      this.time.textContent = data?.time || '00:00:00';
    };

    this.linkAbout?.addEventListener('click', () => {
      ipcRenderer.send('open-about-window');
    });

    let imgs = ['play', 'stop'];
    let play = false;
    this.playButton?.addEventListener('click', () => {
      if (play) {
        Timer.stop(this.course?.textContent || '');
        play = false;
      } else {
        Timer.start(this.time);
        play = true;
      }

      imgs = imgs.reverse();
      this.playButton.src = `../assets/img/${imgs[0]}-button.svg`;
    });

    this.addButton?.addEventListener('click', async () => {
      await this.addCourse();
    });

    ipcRenderer.on('course-changed', async (_event, courseName) => {
      await this.updateCourseData(courseName);
    });
  }

  private async addCourse() {
    const courseName = this.addInput?.value || '';
    if (!courseName) {
      return;
    }
    this.course.textContent = courseName;
    await Data.save(courseName);
    this.addInput.value = '';
    ipcRenderer.send('course-added', courseName);
  }

  private async updateCourseData(courseName: string) {
    this.course.textContent = courseName;
    const courseData = await Data.get(courseName);
    this.time.textContent = courseData?.time || '00:00:00';
  }
}

export default new Renderer();
