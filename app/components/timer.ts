import { ipcRenderer } from 'electron';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Events } from '../helpers/events';
dayjs.extend(duration);

class Timer {
  private timer: NodeJS.Timer;

  private time = 0;

  public start(courseName: string, e: Element) {
    const parsedDuration = e.textContent?.split(':');
    const input = parsedDuration
      ? {
          hours: parsedDuration[0],
          minutes: parsedDuration[1],
          seconds: parsedDuration[2]
        }
      : 0;
    const duration = dayjs.duration(input as unknown as number);

    this.time = duration.asSeconds();

    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.time++;
      e.textContent = this.getFormattedTime();
    }, 1000);

    new Notification('Study Timer', {
      body: `Timer started for ${courseName}`,
      icon: '../assets/img/play-button.svg'
    });
  }

  public stop(courseName: string) {
    clearInterval(this.timer);
    ipcRenderer.send(Events.STOP_TIMER, courseName, this.getFormattedTime());
    new Notification('Study Timer', {
      body: `Timer stopped for ${courseName}`,
      icon: '../assets/img/stop-button.svg'
    });
  }

  private getFormattedTime() {
    return dayjs().startOf('day').set('seconds', this.time).format('HH:mm:ss');
  }
}

export default new Timer();
