import {Injectable} from '@angular/core';
import {Api} from './api';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class Holder {

  announces: any;
  alerts: { level: string, content: string }[] = [];
  schedule: any;
  banners: any;

  constructor(public api: Api) {

  }

  getAnnounce() {
    if (this.announces) {
      return Observable.of(this.announces);
    }
    let seq = this.api.get('intro/announce').share();
    seq.subscribe((data) => {
      this.announces = data;
    }, err => {
      this.alerts.push({level: 'alert-danger', content: '公告获取失败，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;
  }

  getSchedule() {
    if (this.schedule) {
      return Observable.of(this.schedule);
    }
    let seq = this.api.get('schedule').share();
    seq.subscribe((data) => {
      this.schedule = data;
    }, err => {
      this.alerts.push({level: 'alert-danger', content: '课表获取失败，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;

  }

  getBanner() {
    if (this.banners) {
      return Observable.of(this.banners);
    }
    let seq = this.api.get('banner').share();
    seq.subscribe((data) => {
      this.banners = data;
    }, err => {
      this.alerts.push({level: 'alert-danger', content: '横幅获取失败，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;
  }
}
