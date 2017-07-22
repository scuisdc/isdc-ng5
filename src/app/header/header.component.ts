import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {User} from '../../provider/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  titleNow: string;

  constructor(public router: Router, public activatedRoute: ActivatedRoute, public user: User) {
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
        this.titleNow = event['title'];
      });
  }

  ngOnInit() {
  }

  logOut() {
    this.user.logOut();
  }
}
