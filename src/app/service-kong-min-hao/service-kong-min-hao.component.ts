import { Component, OnInit } from '@angular/core';
import {KongMinHaoService} from '../../provider/KongMinHaoService';
import {Holder} from '../../provider/holder';

@Component({
  selector: 'app-service-kong-min-hao',
  templateUrl: './service-kong-min-hao.component.html',
  styleUrls: ['./service-kong-min-hao.component.css']
})
export class ServiceKongMinHaoComponent implements OnInit {

  payload: { name:string , money:number } = { name : 'KongMinHao', money : 0};
  constructor(private kongMinHaoService: KongMinHaoService, public holder: Holder) {


  }

  ngOnInit() {

    this.getAsset();//这样就可以用
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

}
