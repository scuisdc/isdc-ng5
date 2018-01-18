import {Component, OnInit} from '@angular/core';
import {CTFService} from "../../provider/ctf-service";
import {Holder} from '../../provider/holder';

@Component({
  selector: 'app-service-ctf',
  templateUrl: './service-ctf.component.html',
  styleUrls: ['./service-ctf.component.css']
})
export class ServiceCTFComponent implements OnInit {
  /* payload: { problemID:number,flag:string } = {problemID:0,flag: ''};*/
  ctfProblem: { data: string, flag: string, id: number, magnet: string, time: string, title: string, userEmail: string, userName: string };

  constructor(private CTFService: CTFService, public holder: Holder) {
  }

  ngOnInit() {
    this.getForm();
  }

  getForm() {
    this.CTFService.getForm().map(data => data.json()).subscribe(data => {
      if (data.code === 200) {
        this.holder.CTFProblems = data.data;

      } else {
        this.holder.CTFProblems = undefined;
      }
    });
  }

  submitAnswer(problemID: number, flag: string ) {
    let payload: { problemID: number, flag: string } ={problemID,flag};
    this.CTFService.submitAnswer(payload).map(data => data.json()).subscribe(data => {
      if (data.code === 200) {
        this.holder.switch = false;
        alert("答案正确");
      }
      else {
        alert("答案错误");
      }
    });
  }

}
