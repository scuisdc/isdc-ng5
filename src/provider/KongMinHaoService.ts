import {Injectable} from '@angular/core';
import {Api} from './api';
import 'rxjs/Rx';
import {Headers, RequestOptions} from '@angular/http';
import {Holder} from './holder';
@Injectable()
export class KongMinHaoService {
  private headers: Headers = new Headers();
  private requestOption: RequestOptions = new RequestOptions({headers: this.headers, withCredentials: true});

  constructor(private api: Api, private holder: Holder) {
  }

  increaseAsset(payload: { name:string,money: number}) {
    let seq = this.api.post('service/KongMinHao/increase', payload, this.requestOption).share();//发包
    seq.subscribe(() => {
    }, err => {
      console.error('ERROR', err);
      this.holder.alerts.push({level: 'alert-danger', content: '服务器故障，请稍后再试'});
    });
    return seq;
  }

  getAsset(payload: { name:string,money: number}){
    let seq = this.api.post('service/KongMinHao/getAsset', payload, this.requestOption).share();//发包
    seq.subscribe(() => {
    }, err => {
      console.error('ERROR', err);
      this.holder.alerts.push({level: 'alert-danger', content: '服务器故障，请稍后再试'});
    });
    return seq;
  }
  getRank(){
    let seq = this.api.post('service/KongMinHao/getRank', this.requestOption).share();//发包
    seq.subscribe(() => {
    }, err => {
      console.error('ERROR', err);
      this.holder.alerts.push({level: 'alert-danger', content: '服务器故障，请稍后再试'});
    });
    return seq;
  }



}
