import { ipcRenderer } from 'electron';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

class Timer {
  private timer: NodeJS.Timer;
  private time: number = 0;

  public start(e: Element) {
    const parsedDuration = e.textContent?.split(':');
    const input = parsedDuration ? {
      hours: parsedDuration[0],
      minutes: parsedDuration[1],
      seconds: parsedDuration[2]
    } : 0;
    const duration = dayjs.duration(input as unknown as number);

    this.time = duration.asSeconds();

    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.time++;
      e.textContent = this.getFormattedTime();
    }, 1000);
  }

  public stop(courseName: string) {
    clearInterval(this.timer);
    ipcRenderer.send('stop-timer', courseName, this.getFormattedTime());
  }

  private getFormattedTime() {
    return dayjs().startOf('day').set('seconds', this.time).format('HH:mm:ss');
  }
}

export default new Timer();
