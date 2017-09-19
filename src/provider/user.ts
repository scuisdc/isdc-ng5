import {Injectable} from '@angular/core';
import {Api} from './api';
import 'rxjs/Rx';
import {Headers, RequestOptions} from '@angular/http';
import {Holder} from './holder';
@Injectable()
export class User {
  private headers: Headers = new Headers();
  private requestOption: RequestOptions = new RequestOptions({headers: this.headers, withCredentials: true});
  public user: { userName: string, accessToken: string, email: string };

  constructor(private api: Api, private holder: Holder) {
    if (this.getCookie('accessToken')) {
      this.auth();
    }
  }

  signUp(registerUser: { userName: string, email: string, password: string, checkCode: string }) {
    let seq = this.api.post('user/register', registerUser, this.requestOption).share();
    seq.subscribe(() => {
    }, err => {
      console.error('ERROR', err);
      this.holder.alerts.push({level: 'alert-danger', content: '服务器故障，请稍后再试'});
    });
    return seq;
  }

  login(loginUser: { email: string, password: string, checkCode: string }) {
    let seq = this.api.post('user/auth', loginUser, this.requestOption).share();
    seq.subscribe((data) => {
      let res = data.json();
      if (res.code == 200) {
        this.user = res.data;
        document.cookie = `accessToken=${this.user.accessToken}; expires=Thu, 18 Dec 2018 12:00:00 UTC; path=/`;
      }
    }, err => {
      this.holder.alerts.push({level: 'alert-danger', content: '登录失败，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;
  }

  auth() {
    let seq = this.api.get(`user/auth`, {}, this.requestOption).share();
    seq.subscribe((data) => {
      let res = data.json();
      if (res.code == 200) {
        this.user = res.data;
        document.cookie = `accessToken=${this.user.accessToken}; expires=Thu, 18 Dec 2018 12:00:00 UTC; path=/`;
      } else {
        document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
    }, err => {
      console.error('ERROR', err);
      this.holder.alerts.push({level: 'alert-danger', content: '登录失败，请稍后再试'});
    });
    return seq;
  }

  logOut() {
    this.user = undefined;
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  getCookie(cname: string) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

}
