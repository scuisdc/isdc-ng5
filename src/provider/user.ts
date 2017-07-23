import {Injectable} from '@angular/core';
import {Api} from './api';
import 'rxjs/Rx';
import {Headers, RequestOptions} from '@angular/http';
import {CookieService} from 'ngx-cookie';
@Injectable()
export class User {
  private headers: Headers = new Headers();
  private requestOption: RequestOptions = new RequestOptions({headers: this.headers, withCredentials: true});
  public user: { userName: string, accessToken: string, email: string };

  constructor(private api: Api, private cookieService: CookieService) {
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
        //TODO: alert
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  logOut() {
    this.user = undefined;
    //TODO: remove token from cookies
  }
}
