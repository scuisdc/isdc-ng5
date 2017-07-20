import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  titleNow: string;

  links: { title: string, link: string, selected: boolean }[] = [
    {title: '社团简介', link: 'index', selected: true}, {title: '社团公告', link: 'announce', selected: false}, {
      title: '提交建议',
      link: 'suggest',
      selected: false
    }, {title: '联系我们', link: 'contact', selected: false}];

  constructor(public router: Router, public activatedRoute: ActivatedRoute) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .mergeMap(route => route.data)
      .subscribe((event) => {
        if (this.links.map(l => l.title).indexOf(event['title']) >= 0) {
          this.titleNow = event['title'];
        }
      });
  }

  ngOnInit(): void {
  }
}
