import {Injectable} from '@angular/core';
import {Api} from './api';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';

@Injectable()
export class Holder {

  announces: Response;
  alerts: { level: string, content: string }[] = [];
  semester: Response;
  banners: Response;
  scores: any[];
  posts: Response;
  myPosts: Response;
  content: { [key: string]: Response; } = {};
  myContent: { [key: string]: Response } = {};
  comment: { [key: string]: Response; } = {};
  money: number;
  Rank: any[];
  CTFProblems: any[];
  switch: boolean;
  accounts: any[];
  folders: { [key: number]: any[]; } = {};
  activeMailAccount: number;
  activeMailFolder: number;

  constructor(public api: Api) {

  }

  getAnnounce(): Observable<Response> {
    if (this.announces) {
      return Observable.of(this.announces);
    }
    const seq = this.api.get('intro/announce').share();
    seq.subscribe((data) => {
      this.announces = data;
    }, err => {
      this.alerts.push({level: 'alert-danger', content: '公告获取失败，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;
  }

  getSemester(): Observable<Response> {
    if (this.semester) {
      return Observable.of(this.semester);
    }
    const seq = this.api.get('schedule').share();
    seq.subscribe((data) => {
      this.semester = data;
    }, err => {
      this.alerts.push({level: 'alert-danger', content: '课表获取失败，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;

  }

  getBanner(): Observable<Response> {
    if (this.banners) {
      return Observable.of(this.banners);
    }
    const seq = this.api.get('banner').share();
    seq.subscribe((data) => {
      this.banners = data;
    }, err => {
      this.alerts.push({level: 'alert-danger', content: '横幅获取失败，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;
  }
}
