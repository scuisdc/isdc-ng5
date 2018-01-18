import {Injectable} from '@angular/core';
import {Api} from './api';
import 'rxjs/Rx';
import {Headers, RequestOptions} from '@angular/http';
import {Holder} from './holder';

@Injectable()
export class JWCService {
  private headers: Headers = new Headers();
  private requestOption: RequestOptions = new RequestOptions({headers: this.headers, withCredentials: true});

  constructor(private api: Api, private holder: Holder) {
  }

  calScore(payload: { zjh: string, mm: string, date: Date }) {
    let seq = this.api.post('service/jwc/score', payload, this.requestOption).share();//发包
    seq.subscribe(() => {
    }, err => {
      console.error('ERROR', err);
      this.holder.alerts.push({level: 'alert-danger', content: '服务器故障，请稍后再试'});
    });
    return seq;
  }

  getScoreResult(payload: { zjh: string, mm: string, date: Date }) {
    let seq = this.api.post('service/jwc/score/result', payload, this.requestOption).share();
    seq.subscribe(() => {
    }, err => {
      console.error('ERROR', err);
      this.holder.alerts.push({level: 'alert-danger', content: '服务器故障，请稍后再试'});
    });
    return seq;
  }
}
