import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  color = '#ffffff';
  private clientHeight: number;

  constructor(public router: Router, public activatedRoute: ActivatedRoute, public titleService: Title) {
    this.clientHeight = window.innerHeight;
  }

  ngOnInit(): void {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe ((event) =>    {
        if (event['title']) {
          this.titleService.setTitle(event['title']);
        }
        if (event['color']) {
          this.color = event['color'];
        }
      });
  }
}
