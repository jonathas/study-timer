import { ipcRenderer } from 'electron';
import Timer from './timer';
import Data from '../helpers/data';

class Renderer {
  private linkAbout: Element;
  private playButton: HTMLImageElement;
  private time: Element;
  private course: Element;

  public constructor() {
    this.setSelectors();
    this.addEventListeners();
  }

  private setSelectors() {
    this.linkAbout = document.querySelector('#link-about') as Element;
    this.playButton = document.querySelector('.play-button') as HTMLImageElement;
    this.time = document.querySelector('.time') as Element;
    this.course = document.querySelector('.course') as Element;
  }

  private addEventListeners() {
    window.onload = async () => {
      const data = await Data.get(this.course?.textContent || '');
      this.time.textContent = data?.time || '00:00:00';
    };
    
    this.linkAbout?.addEventListener('click' , () => {
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

    ipcRenderer.on('course-changed', async (_event, courseName) => {
      await this.updateCourseData(courseName);
    });
  }

  private async updateCourseData(courseName: string) {
    this.course.textContent = courseName;
    const courseData = await Data.get(courseName);
    this.time.textContent = courseData?.time || '00:00:00';
  }
}

export default new Renderer();
