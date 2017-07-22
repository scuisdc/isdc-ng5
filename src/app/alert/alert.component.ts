import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() arr: { level: string, content: string }[];

  constructor() {
  }

  ngOnInit() {
  }

  dismiss(item: { level: string, content: string }) {
    this.arr.splice(this.arr.indexOf(item), 1);
  }

}
