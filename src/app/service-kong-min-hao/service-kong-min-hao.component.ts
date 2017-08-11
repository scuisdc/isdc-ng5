import {Component, OnDestroy, OnInit} from '@angular/core';
import {KongMinHaoService} from '../../provider/KongMinHaoService';
import {Holder} from '../../provider/holder';


@Component({
  selector: 'app-service-kong-min-hao',
  templateUrl: './service-kong-min-hao.component.html',
  styleUrls: ['./service-kong-min-hao.component.css']
})
export class ServiceKongMinHaoComponent implements OnInit, OnDestroy {
  private alive = true;
  payload: { name: string, money: number } = {name: '', money: 0};


  constructor(private kongMinHaoService: KongMinHaoService, public holder: Holder) {
  }

  ngOnInit() {
    this.startPulling();
  }

  public ngOnDestroy() {
    this.alive = false;
  }

  increaseAsset() {
    this.holder.money = this.holder.money + 100;
    this.kongMinHaoService.increaseAsset(this.payload);
  }

  getAsset() {
    console.log('孔壕最有钱了');
    if (this.payload.name) {
      this.kongMinHaoService.getAsset(this.payload).takeWhile(() => (this.alive)).delay(300).map(data => data.json()).subscribe(data => {
        if (data.code === 200) {
          this.holder.money = data.data.money;
          this.getAsset();
        } else {
          this.holder.money = undefined;
        }
      });
    }
  }

  startWorship(name: string) {
    this.payload.name = name;
    this.getAsset();
  }

  startPulling() {
    this.kongMinHaoService.getRank().takeWhile(() => (this.alive)).delay(1000).map(data => data.json()).subscribe(data => {
      if (data.code === 200) {
        this.holder.Rank = data.data;
        this.startPulling();
      } else {
        this.holder.alerts.push({level: 'alert-danger', content: data.message});
      }
    });
  }

}
