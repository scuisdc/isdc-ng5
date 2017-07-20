import {Injectable} from '@angular/core';
import {Api} from './api';
import 'rxjs/Rx';
import {Headers, RequestOptions} from '@angular/http';

@Injectable()
export class User {

  public _token: string;
  public email: string = '';
  public password: string = '';
  public name: string = '';
  private headers: Headers = new Headers();
  private requestOption: RequestOptions = new RequestOptions({headers: this.headers});


  constructor(public api: Api) {

  }


  logout() {
    this._token = null;
  }


  _loggedIn(resp, phone) {
    this._token = resp;
    this.headers.set('_token', this._token);
  }
}
