import { Component, OnInit,OnDestroy } from '@angular/core';
import {KongMinHaoService} from '../../provider/KongMinHaoService';
import {Holder} from '../../provider/holder';
import {takeWhile} from "rxjs/operator/takeWhile";

@Component({
  selector: 'app-service-kong-min-hao',
  templateUrl: './service-kong-min-hao.component.html',
  styleUrls: ['./service-kong-min-hao.component.css']
})
export class ServiceKongMinHaoComponent implements OnInit,OnDestroy {
  private alive: boolean = true;
  payload: { name:string , money:number } = { name : 'KongMinHao', money : 0};
  constructor(private kongMinHaoService: KongMinHaoService, public holder: Holder) {


  }

  ngOnInit() {
  takeWhile(() => this.alive).subscribe(user => {
    this.getAsset();
  });
  }

 increaseAsset() {

    this.kongMinHaoService.increaseAsset(this.payload);
    this.getAsset();
  }
getAsset(){
    console.log("孔壕最有钱了");
    this.kongMinHaoService.getAsset(this.payload).delay(100).map(data => data.json()).subscribe(data => {
      if (data.code == 200) {
            this.holder.money = JSON.parse(data.data.money);
            this.getAsset();
      } else {
        this.holder.money = 0;
      }
    });

}
  public ngOnDestroy() {
    this.alive = false;
  }

}
