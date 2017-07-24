import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'app-service-jwc',
  templateUrl: './service-jwc.component.html',
  styleUrls: ['./service-jwc.component.css']
})
export class ServiceJWCComponent implements OnInit {

  param: { zjh: string, mm: string } = {zjh: '', mm: ''};

  loading: boolean = false;

  status: string = '查 询';

  constructor(private http: Http) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.loading = true;
    this.status = '正在连接教务处……';
    //TODO: connect JWC
  }

}
