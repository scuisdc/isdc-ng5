import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {ResponsiveModule} from 'ng2-responsive';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {IndexComponent} from './index/index.component';
import {IntroComponent} from './intro/intro.component';
import {AboutIndexComponent} from './about-index/about-index.component';
import {AboutAnnounceComponent} from './about-announce/about-announce.component';
import {AboutSuggestComponent} from './about-suggest/about-suggest.component';
import {AboutContactComponent} from './about-contact/about-contact.component';
import {User} from '../provider/user';
import {Api} from '../provider/api';
import {MarkdownModule} from 'angular2-markdown';
import {LogInOrSignUpComponent} from './log-in-or-sign-up/log-in-or-sign-up.component';
import {AlertComponent} from './alert/alert.component';
import {Holder} from '../provider/holder';
import {ScheduleComponent} from './schedule/schedule.component';
import {ServiceComponent} from './service/service.component';
import {ServiceJWCComponent} from './service-jwc/service-jwc.component';
import {JWCService} from '../provider/jwc-service';
import {AllPostComponent} from './all-post/all-post.component';
import {PostComponent} from './post/post.component';
import {BlogService} from '../provider/blog-service';
import {BlogComponent} from './blog/blog.component';
import {SendPostComponent} from './send-post/send-post.component';
import {HisPostComponent} from './his-post/his-post.component';
import {UpdatePostComponent} from './update-post/update-post.component';
import {ServiceMatrixComponent} from './service-matrix/service-matrix.component';
import {MatrixService} from '../provider/matrix-service';
import {CTFService} from '../provider/ctf-service';
import {ServiceCTFComponent} from './service-ctf/service-ctf.component';

const appRoutes: Routes = [{
  path: '',
  component: IndexComponent,
  data: {title: '四川大学信息安全与网络攻防协会', color: '#FFFFFF'}
}, {
  path: 'login',
  component: LogInOrSignUpComponent,
  data: {title: '登录/注册', color: '#FFFFFF'}
}, {
  path: 'blog',
  component: BlogComponent,
  children: [{
    path: '',
    component: AllPostComponent,
    data: {title: '所有博文', color: '#FFFFFF'}
  }, {
    path: 'send-post',
    component: SendPostComponent,
    data: {title: '发博客', color: '#FFFFFF'}
  }, {
    path: 'post/:id',
    component: PostComponent,
    data: {title: '博文详情', color: '#FFFFFF'}
  }, {
    path: 'update-post/:id',
    component: UpdatePostComponent,
    data: {title: '编辑博文', color: '#FFFFFF'}
  }, {
    path: ':user_name',
    component: HisPostComponent,
    data: {title: '那谁的博客', color: '#FFFFFF'}
  }],
  data: {title: '博客', color: '#FFFFFF'}
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
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  }],
  data: {title: '关于我们', color: '#FFFFFF'}
}, {
  path: 'services',
  component: ServiceComponent,
  children: [{
    path: 'jwc',
    component: ServiceJWCComponent,
    data: {title: '教务信息查询', color: '#FFFFFF'}
  }, {
    path: 'matrix',
    component: ServiceMatrixComponent,
    data: {title: '矩阵计算器', color: '#FFFFFF'}
  }, {
    path: 'ctf',
    component: ServiceCTFComponent,
    data: {title: 'CTF平台', color: '#FFFFFF'}
  }, {
    path: '',
    redirectTo: 'jwc',
    pathMatch: 'full'
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
    IntroComponent,
    AboutIndexComponent,
    AboutAnnounceComponent,
    AboutSuggestComponent,
    AboutContactComponent,
    LogInOrSignUpComponent,
    AlertComponent,
    ScheduleComponent,
    ServiceComponent,
    ServiceJWCComponent,
    BlogComponent,
    PostComponent,
    SendPostComponent,
    HisPostComponent,
    UpdatePostComponent,
    PostComponent,
    ServiceMatrixComponent,
    AllPostComponent,
    SendPostComponent,
    PostComponent,
    ServiceCTFComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ResponsiveModule,
    RouterModule.forRoot(appRoutes),
    MarkdownModule.forRoot()
  ],
  providers: [User, Api, Holder, JWCService, BlogService, MatrixService, CTFService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
