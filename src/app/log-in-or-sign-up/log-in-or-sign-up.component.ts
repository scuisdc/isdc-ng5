import {Component, OnInit} from '@angular/core';
import {User} from '../../provider/user';
import {Router} from '@angular/router';
import {Api} from '../../provider/api';
import {Holder} from '../../provider/holder';

@Component({
  selector: 'app-log-in-or-sign-up',
  templateUrl: './log-in-or-sign-up.component.html',
  styleUrls: ['./log-in-or-sign-up.component.css']
})
export class LogInOrSignUpComponent implements OnInit {

  isRegister = false;
  loading = false;

  checkCode: string = this.api.url + '/user/authCode?a=' + Math.random();

  loginUser: { email: string, password: string, checkCode: string } = {email: '', password: '', checkCode: ''};
  registerUser: { userName: string, email: string, password: string, checkCode: string } = {
    userName: '',
    password: '',
    email: '',
    checkCode: ''
  };

  constructor(private user: User, private router: Router, private api: Api, private holder: Holder) {
  }

  ngOnInit() {
  }

  toggleState(v: boolean) {
    if (!this.loading) {
      this.isRegister = v;
    }
  }

  login() {
    this.loading = true;
    this.user.login(this.loginUser).map(res => res.json()).subscribe(data => {
      if (data.code === 200) {
        this.holder.alerts.push({level: 'alert-success', content: `欢迎回来，${data.data.userName}`});
        this.router.navigateByUrl('/');
      } else {
        this.holder.alerts.push({level: 'alert-danger', content: data.message});
      }
    }, () => {
      this.loading = false;
    }, () => {
      this.loading = false;
      this.generateCheckCode();
    });
  }

  register() {
    this.loading = true;
    this.user.signUp(this.registerUser).map(res => res.json()).subscribe(data => {
      if (data.code === 200) {
        this.isRegister = false;
      }
      this.holder.alerts.push({level: data.code === 200 ? 'alert-success' : 'alert-danger', content: data.message});
    }, () => {
      this.loading = false;
    }, () => {
      this.loading = false;
      this.generateCheckCode();
    });
  }

  generateCheckCode() {
    this.checkCode = this.api.url + '/user/authCode?a=' + Math.random();
  }

}
