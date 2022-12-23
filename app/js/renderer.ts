import { ipcRenderer } from 'electron';
import Timer from './timer';
import Data from '../../data';

class Renderer {
  public constructor() {
    this.addEventListeners();
  }

  private addEventListeners() {
    const linkAbout = document.querySelector('#link-about');
    const playButton = document.querySelector('.play-button') as HTMLImageElement;
    const time = document.querySelector('.time') as Element;
    const course = document.querySelector('.course');

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
      playButton.src = `img/${imgs[0]}-button.svg`;
    });    
  }
}

export default new Renderer();
