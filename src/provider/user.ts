import {Injectable} from '@angular/core';
import {Api} from './api';
import 'rxjs/Rx';
import {Headers, RequestOptions} from '@angular/http';
import {Holder} from './holder';

@Injectable()
export class User {
  private headers: Headers = new Headers();
  private requestOption: RequestOptions = new RequestOptions({headers: this.headers, withCredentials: true});
  public user: { userName: string, accessToken: string, email: string } = {userName: '', accessToken: '', email: ''};

  constructor(private api: Api, private holder: Holder) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.user.accessToken = token;
      this.createAuthorizationHeader(this.headers);
      this.auth();
    }
  }

  public createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' +
      this.user.accessToken);
  }

  signUp(registerUser: { userName: string, email: string, password: string, checkCode: string }) {
    const seq = this.api.post('user/register', registerUser, this.requestOption).share();
    seq.subscribe(() => {
    }, err => {
      console.error('ERROR', err);
      this.holder.alerts.push({level: 'alert-danger', content: '服务器故障，请稍后再试'});
    });
    return seq;
  }

  login(loginUser: { email: string, password: string, checkCode: string }) {
    const seq = this.api.post('user/auth', loginUser, this.requestOption).share();
    seq.subscribe((data) => {
      const res = data.json();
      if (res.code === 200) {
        this.user = res.data;
        this.createAuthorizationHeader(this.headers);
        localStorage.setItem('accessToken', this.user.accessToken);
      }
    }, err => {
      localStorage.removeItem('accessToken');
      this.holder.alerts.push({level: 'alert-danger', content: '登录失败，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;
  }

  auth() {
    const seq = this.api.get(`user/auth`, {}, this.requestOption).share();
    seq.subscribe((data) => {
      const res = data.json();
      if (res.code === 200) {
        this.user = res.data;
        this.createAuthorizationHeader(this.headers);
        localStorage.setItem('accessToken', this.user.accessToken);
      } else {
        localStorage.removeItem('accessToken');
      }
    }, err => {
      console.error('ERROR', err);
      this.holder.alerts.push({level: 'alert-danger', content: '登录失败，请稍后再试'});
      localStorage.removeItem('accessToken');
    });
    return seq;
  }

  logOut() {
    this.user = {userName: '', accessToken: '', email: ''};
    localStorage.removeItem('accessToken');
  }

}
