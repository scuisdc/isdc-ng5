import {Component} from '@angular/core';

@Component({
  selector: 'app-about-suggest',
  templateUrl: './about-suggest.component.html',
  styleUrls: ['./about-suggest.component.css']
})
export class AboutSuggestComponent {

  suggest: { name: string, email: string, message: string } = {name: '', email: '', message: ''};

  constructor() {
  }

  onSubmit() {
    console.log(this.suggest);
  }
}
