import { ipcRenderer } from 'electron';
import Timer from './timer';
import Data from '../helpers/data';

class Renderer {
  public constructor() {
    this.addEventListeners();
  }

  private addEventListeners() {
    const linkAbout = document.querySelector('#link-about');
    const playButton = document.querySelector('.play-button') as HTMLImageElement;
    const time = document.querySelector('.time') as Element;
    const course = document.querySelector('.course') as Element;

    window.onload = async () => {
      const data = await Data.get(course?.textContent || '');
      time.textContent = data?.time || '00:00:00';
    };
    
    linkAbout?.addEventListener('click' , function(){
      ipcRenderer.send('open-about-window');
    });
    
    let imgs = ['play', 'stop'];
    let play = false;
    playButton?.addEventListener('click', function(){
      if (play) {
        Timer.stop(course?.textContent || '');
        play = false;
      } else {
        Timer.start(time);
        play = true;
      }
    
      imgs = imgs.reverse();
      playButton.src = `../assets/img/${imgs[0]}-button.svg`;
    });

    ipcRenderer.on('course-changed', async (_event, courseName) => {
      await this.updateCourseData(course, time, courseName);
    });
  }

  private async updateCourseData(course: Element, time: Element, courseName: string) {
    course.textContent = courseName;
    const courseData = await Data.get(courseName);
    time.textContent = courseData?.time || '00:00:00';
  }
}

export default new Renderer();
