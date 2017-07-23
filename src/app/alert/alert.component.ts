import {Component, OnInit} from '@angular/core';
import {Holder} from '../../provider/holder';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {


  constructor(public holder: Holder) {

  }

  ngOnInit() {
  }

  dismiss(item: { level: string, content: string }) {
    this.holder.alerts.splice(this.holder.alerts.indexOf(item), 1);
  }

}
