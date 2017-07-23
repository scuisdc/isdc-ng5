import {Injectable} from '@angular/core';
import {Api} from './api';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class Holder {

  announces: any;
  alerts: { level: string, content: string }[] = [];

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
      this.alerts.push({level: 'alert-danger', content: '服务器故障，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;
  }
}
