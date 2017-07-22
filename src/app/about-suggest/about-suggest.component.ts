import {Component} from '@angular/core';
import {User} from '../../provider/user';

@Component({
  selector: 'app-about-suggest',
  templateUrl: './about-suggest.component.html',
  styleUrls: ['./about-suggest.component.css']
})
export class AboutSuggestComponent {

  suggest: { userName: string, email: string, message: string } = {userName: '', email: '', message: ''};

  constructor(public user: User) {
    if (user.user) {
      this.suggest.email = user.user.email;
      this.suggest.userName = user.user.userName;
    }
  }

  onSubmit() {
    console.log(this.suggest);
  }
}
