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
  content: { [key: string]: Response; } = {};
  comment: { [key: string]: Response; } = {};

  constructor(public api: Api) {

  }

  getAnnounce(): Observable<Response> {
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

  getSemester(): Observable<Response> {
    if (this.semester) {
      return Observable.of(this.semester);
    }
    let seq = this.api.get('schedule').share();
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
    let seq = this.api.get('banner').share();
    seq.subscribe((data) => {
      this.banners = data;
    }, err => {
      this.alerts.push({level: 'alert-danger', content: '横幅获取失败，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;
  }

  getPosts(): Observable<Response> {
    if (this.posts) {
      return Observable.of(this.posts);
    }
    let seq = this.api.get('blog/post').share();
    seq.subscribe((data) => {
      this.posts = data;
    }, err => {
      this.alerts.push({level: 'alert-danger', content: '博文获取失败，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;
  }

  getBlogContent(id: number) {
    if (this.content[id]) {
      return Observable.of(this.content[id]);
    }
    let seq = this.api.get(`blog/post/${id}`).share();
    seq.subscribe((data) => {
      this.content[id.toString()] = data;
    }, err => {
      this.alerts.push({level: 'alert-danger', content: '博文详情获取失败，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;
  }

  getBlogComment(id: number) {
    // if (this.comment[id]) {
    //   return Observable.of(this.comment[id]);
    // }
    let seq = this.api.get(`blog/post/${id}/comment`).share();
    seq.subscribe((data) => {
      this.comment[id.toString()] = data;
    }, err => {
      this.alerts.push({level: 'alert-danger', content: '博文评论获取失败，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;
  }
}
