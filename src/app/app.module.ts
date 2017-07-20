import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ResponsiveModule} from 'ng2-responsive';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {IndexComponent} from './index/index.component';
import {WhatToDoComponent} from './what-to-do/what-to-do.component';
import {IntroComponent} from './intro/intro.component';
import {AboutIndexComponent} from './about-index/about-index.component';
import {AboutAnnounceComponent} from './about-announce/about-announce.component';
import {AboutSuggestComponent} from './about-suggest/about-suggest.component';
import {AboutContactComponent} from './about-contact/about-contact.component';
import {User} from '../Provider/user';
import {Api} from '../Provider/api'
import {MarkdownModule} from 'angular2-markdown';
import {LogInOrSignUpComponent} from './log-in-or-sign-up/log-in-or-sign-up.component';

const appRoutes: Routes = [{
  path: '',
  component: IndexComponent,
  data: {title: '四川大学信息安全与网络攻防协会', color: '#FFFFFF'}
}, {
  path: 'login',
  component: LogInOrSignUpComponent,
  data: {title: '登录/注册', color: '#FFFFFF'}
}, {
  path: 'intro',
  component: IntroComponent,
  children: [{
    path: 'index',
    component: AboutIndexComponent,
    data: {title: '社团简介', color: '#FFFFFF'}
  }, {
    path: 'announce',
    component: AboutAnnounceComponent,
    data: {title: '社团公告', color: '#FFFFFF'}
  }, {
    path: 'suggest',
    component: AboutSuggestComponent,
    data: {title: '提交建议', color: '#FFFFFF'}
  }, {
    path: 'contact',
    component: AboutContactComponent,
    data: {title: '联系我们', color: '#FFFFFF'}
  }, {
    path: '**',
    redirectTo: 'index'
  }],
  data: {title: '关于我们', color: '#FFFFFF'}
}, {path: '**', component: PageNotFoundComponent, data: {title: '出错啦', color: '#000000'}}];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    IndexComponent,
    WhatToDoComponent,
    IntroComponent,
    AboutIndexComponent,
    AboutAnnounceComponent,
    AboutSuggestComponent,
    AboutContactComponent,
    LogInOrSignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ResponsiveModule,
    RouterModule.forRoot(appRoutes),
    MarkdownModule.forRoot(),
  ],
  providers: [User, Api],
  bootstrap: [AppComponent]
})
export class AppModule {
}
