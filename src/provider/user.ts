import {Injectable} from '@angular/core';
import {Api} from './api';
import 'rxjs/Rx';
import {Headers, RequestOptions} from '@angular/http';
import {CookieService} from 'ngx-cookie';
import {Holder} from './holder';
@Injectable()
export class User {
  private headers: Headers = new Headers();
  private requestOption: RequestOptions = new RequestOptions({headers: this.headers, withCredentials: true});
  public user: { userName: string, accessToken: string, email: string };

  constructor(private api: Api, private cookieService: CookieService, private holder: Holder) {
    let accessToken = cookieService.get('accessToken');
    if (accessToken) {
      this.auth(accessToken);
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
        this.cookieService.put('accessToken', this.user.accessToken, {expires: 'Fri, 31 Dec 9999 23:59:59 GMT'});
      }
    }, err => {
      this.holder.alerts.push({level: 'alert-danger', content: '服务器故障，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;
  }

  auth(accessToken: string) {
    let seq = this.api.get(`user/auth/${accessToken}`, {}, this.requestOption).share();
    seq.subscribe((data) => {
      let res = data.json();
      if (res.code == 200) {
        this.user = res.data;
        this.cookieService.put('accessToken', this.user.accessToken, {expires: 'Fri, 31 Dec 9999 23:59:59 GMT'});
      } else {
        this.cookieService.remove('accessToken');
        this.holder.alerts.push({level: 'alert-warning', content: '登录已过期，请重新登录'});
      }
    }, err => {
      console.error('ERROR', err);
      this.holder.alerts.push({level: 'alert-danger', content: '服务器故障，请稍后再试'});
    });
    return seq;
  }

  logOut() {
    this.user = undefined;
    this.cookieService.remove('accessToken');
  }
}
