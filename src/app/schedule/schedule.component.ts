import {Component, OnInit} from '@angular/core';
import {Holder} from '../../provider/holder';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  data: {
    title: string,
    schedule: {
      target: string,
      course: {
        week: string,
        date: string,
        time: string,
        host: string,
        content: string,
        files: {
          href: string,
          name: string
        }[]
      }[]
    }[]
  };

  constructor(private holder: Holder) {
  }

  ngOnInit() {
  }

}
