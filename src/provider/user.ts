import {Injectable} from '@angular/core';
import {Api} from './api';
import 'rxjs/Rx';
import {Headers, RequestOptions} from '@angular/http';
@Injectable()
export class User {
  private headers: Headers = new Headers();
  private requestOption: RequestOptions = new RequestOptions({headers: this.headers});
  public user: { userName: string, accessToken: string, email: string };

  constructor(public api: Api) {
    //TODO: use token to auth
  }

  signUp(registerUser: { userName: string, email: string, password: string, checkCode: string }) {
    let seq = this.api.post('user', registerUser).share();
    seq.subscribe(() => {
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  login(loginUser: { email: string, password: string, checkCode: string }) {
    let seq = this.api.post('user/auth', loginUser).share();
    seq.subscribe((data) => {
      let res = data.json();
      if (res.code == 200) {
        this.user = res.data;
        //TODO:save token to cookies
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
