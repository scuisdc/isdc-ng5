import {Injectable} from '@angular/core';
import {Api} from './api';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class Holder {

  data: any;

  constructor(public api: Api) {

  }

  getAnnounce() {
    if (this.data) {
      return Observable.of(this.data);
    }
    let seq = this.api.get('intro/announce').share();
    seq.subscribe((data) => {
      this.data = data;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
}
