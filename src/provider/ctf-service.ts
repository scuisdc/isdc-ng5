import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Api} from './api';
import {Headers, RequestOptions} from '@angular/http';
import {Holder} from './holder';

@Injectable()
export class CTFService {
  private headers: Headers = new Headers();
  private requestOption: RequestOptions = new RequestOptions({headers: this.headers, withCredentials: true});

  constructor(private api: Api, private holder: Holder) {
  }
  getForm(){
    let seq = this.api.get('ctf/form').share();//发包
    seq.subscribe(() => {
    }, err => {
      console.error('ERROR', err);
      this.holder.alerts.push({level: 'alert-danger', content: '服务器故障，请稍后再试'});
    });
    return seq;
  }
  submitAnswer(payload: { problemID:number,flag:string}){
    let seq = this.api.post('ctf/answer',payload,this.requestOption).share();//发包
    seq.subscribe(() => {

    }, err => {
      console.error('ERROR', err);
      this.holder.alerts.push({level: 'alert-danger', content: '服务器故障，请稍后再试'});
    });
    return seq;
  }

}
