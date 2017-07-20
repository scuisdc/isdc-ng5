import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  todos: { title: string, detail: string, items: { icon: string, title: string, detail: string }[] } = {
    title: '这学期我们都做些什么', detail: '先甭管计划赶不赶得上变化，但没有计划就是寸步难行', items: [{
      icon: 'assets/ic_settings_black.svg',
      title: '基础技能学习',
      detail: '打实基础技能是最为重要的一步，不好高、不骛远、不激进。我们每周六的授课将从算法数据结构与计算机网络切入，打实基础技能。'
    }, {
      icon: 'assets/ic_flash_black.svg',
      title: '信息安全入门',
      detail: '只有实践才是最好的掌握方式，我们要深刻贯彻这一点。每周日下午的信息安全实践，从信息获取到漏洞发掘再到信息隐藏，Let\'s Hack'
    }, {
      icon: 'assets/ic_favorite_black.svg',
      title: '精彩活动继续',
      detail: '我们将会邀请工作一线的前辈们来传传道，邀请数字图像、软件工程协会的老师们学长们来通通气。并且素拓、聚餐一个都不少。'
    }, {
      icon: 'assets/ic_flag_black.svg',
      title: '竞赛能力丰收',
      detail: '何愁没有机会展现自己，我们将会尽量详细的提供信息安全类比赛的信息，并且在允许的范围内提供尽可能的帮助。让大家都有机会能够参与其中。'
    }]
  };
  banners: { pic: string, title: string, detail: string, action: string, link: string }[] = [{
    pic: 'https://o11vcttoe.qnssl.com/images_wooyun.jpg',
    title: 'Wooyun漏洞查找上线',
    detail: '不是白帽子不能找漏洞？没关系，来试试我们的吧。',
    action: '点击体验',
    link: 'services/exploit'
  }, {
    pic: 'https://o11vcttoe.qnssl.com/images_bg_header.jpg',
    title: '关注ISDC开源项目计划',
    detail: '参与到我们当中，一起体验开源',
    action: '加入GitHub小组',
    link: 'intro/contact'
  }, {
    pic: 'https://o11vcttoe.qnssl.com/images_amazing.jpg',
    title: '你们不要总想着搞个大新闻',
    detail: '筹备了一学年的计划，终于要和大家见面了',
    action: '三月上线',
    link: 'mirrors'
  }];

  slogan: { title: string, detail: string } = {title: 'A WAY TO HACKER!', detail: '无关乎基础与天赋，只在乎你是否一往无前'};

  constructor() {
  }

  ngOnInit() {
  }

}
