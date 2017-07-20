import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-log-in-or-sign-up',
  templateUrl: './log-in-or-sign-up.component.html',
  styleUrls: ['./log-in-or-sign-up.component.css']
})
export class LogInOrSignUpComponent implements OnInit {

  isRegister: boolean = false;

  loginUser: { name: string, password: string, checkCode: string } = {name: '', password: '', checkCode: ''};

  registerUser: { name: string, email: string, password: string, checkCode: string } = {name: '', password: '', email: '', checkCode: ''};

  constructor() {
  }

  ngOnInit() {
  }

  toggleState(v: boolean) {
    this.isRegister = v;
  }

  login() {
    console.log('log in', this.loginUser);
  }

  register() {
    console.log('register', this.registerUser);
  }

}
