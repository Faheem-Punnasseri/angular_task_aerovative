import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationSum'
})

export class DurationSumPipe implements PipeTransform {

  transform(duration1: string, duration2: string, duration3: string): string {      
      const sumInMilliseconds = this.parseDuration(duration1) + this.parseDuration(duration2) + this.parseDuration(duration3);
      const sumFormatted = this.formatDuration(sumInMilliseconds);
      return sumFormatted;    
  }

  private parseDuration(duration: string): number {
    let minutes = 0;
    let seconds = 0;

    if (duration === null) {
      return 0;
    }

    if (duration.includes(':')) {
      // mm:ss format
      const [min, sec] = duration.split(':').map(Number);
      minutes = min;
      seconds = sec;
    } else {
      // mmss format
      minutes = Math.floor(parseInt(duration.slice(0, 2), 10));
      seconds = parseInt(duration.slice(2), 10);
    }
    const totalMilliseconds = minutes * 60000 + seconds * 1000;
    return totalMilliseconds;
  }

  private formatDuration(duration: number | string): string {
    const durationInMilliseconds = typeof duration === 'string' ? parseInt(duration, 10) : duration;
    const minutes = Math.floor(durationInMilliseconds / 60000);
    const seconds = Math.floor((durationInMilliseconds % 60000) / 1000);
    const formattedDuration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formattedDuration;
  }

}