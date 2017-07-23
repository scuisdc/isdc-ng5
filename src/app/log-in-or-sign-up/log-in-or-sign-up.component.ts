import {Component, OnInit} from '@angular/core';
import {User} from '../../provider/user';
import {Router} from '@angular/router';
import {Api} from '../../provider/api';

@Component({
  selector: 'app-log-in-or-sign-up',
  templateUrl: './log-in-or-sign-up.component.html',
  styleUrls: ['./log-in-or-sign-up.component.css']
})
export class LogInOrSignUpComponent implements OnInit {

  isRegister: boolean = false;
  loading: boolean = false;

  checkCode: string = this.api.url + '/user/authCode?a=' + Math.random();

  loginUser: { email: string, password: string, checkCode: string } = {email: '', password: '', checkCode: ''};
  arr: { level: string, content: string }[] = [];
  registerUser: { userName: string, email: string, password: string, checkCode: string } = {
    userName: '',
    password: '',
    email: '',
    checkCode: ''
  };

  constructor(private user: User, private router: Router, private api: Api) {
  }

  ngOnInit() {
  }

  toggleState(v: boolean) {
    if (!this.loading)
      this.isRegister = v;
  }

  login() {
    this.loading = true;
    console.log('log in', this.loginUser);
    this.user.login(this.loginUser).map(res => res.json()).subscribe(data => {
      if (data.code == 200) {
        this.router.navigateByUrl('/');
      } else {
        this.arr.push({level: 'alert-danger', content: data.message});
      }
    }, () => {
      this.loading = false;
      this.arr.push({level: 'alert-danger', content: '服务器故障，稍后再试'});
    }, () => {
      this.loading = false;
      this.generateCheckCode();
    });
  }

  register() {
    this.loading = true;
    console.log('register', this.registerUser);
    this.user.signUp(this.registerUser).map(res => res.json()).subscribe(data => {
      if (data.code == 200) {
        this.isRegister = false;
      }
      this.arr.push({level: data.code == 200 ? 'alert-success' : 'alert-danger', content: data.message});
    }, () => {
      this.loading = false;
      this.arr.push({level: 'alert-danger', content: '服务器故障，稍后再试'});
    }, () => {
      this.loading = false;
      this.generateCheckCode();
    });
  }

  generateCheckCode() {
    this.checkCode = this.api.url + '/user/authCode?a=' + Math.random();
  }

}
