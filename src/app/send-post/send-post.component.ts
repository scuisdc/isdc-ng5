import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../provider/blog-service';
import {Holder} from '../../provider/holder';
import {User} from '../../provider/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-send-post',
  templateUrl: './send-post.component.html',
  styleUrls: ['./send-post.component.css']
})
export class SendPostComponent implements OnInit {

  title = '';
  preview = '';
  content = '';

  loading = false; //发送时是否在加载

  constructor(public blogService: BlogService, public userService: User, holder: Holder, public router: Router) {
  }

  ngOnInit() {
    // this.getPostCookie();
    // window.setInterval(() => {
    //   this.setPostCookie();
    // },30000);
  }

  sendPost() {
    this.loading = true;
    this.blogService.sendPost(this.title, this.preview, this.content).map(data => data.json()).subscribe(data => {
      if (data.code === 200) {
        this.blogService.holder.alerts.push({level: 'alert-success', content: '发表博文成功'});
        // this.emptyPostCookie();
        this.router.navigateByUrl('/blog');
      } else {
        this.blogService.holder.alerts.push({level: 'alert-danger', content: '发表博文失败'});
      }
      this.loading = false;
    });
  }

  // setPostCookie() {
  //   document.cookie = `editing_post_title=${this.title};expires=Thu, 18 Dec 2018 12:00:00 UTC; path=/`;
  //   document.cookie = `editing_post_preview=${this.preview};expires=Thu, 18 Dec 2018 12:00:00 UTC; path=/`;
  //   document.cookie = `editing_post_content=${this.content};expires=Thu, 18 Dec 2018 12:00:00 UTC; path=/`;
  // }
  //
  // getPostCookie() {
  //   let title = this.getCookie('title');
  //   let preview = this.getCookie('preview');
  //   let content = this.getCookie('content');
  //   if (title && preview && content) {
  //     this.title = title;
  //     this.preview = preview;
  //     this.content = content;
  //   }
  //   alert(this.title+this.preview+this.content);
  // }
  //
  // emptyPostCookie() {
  //   document.cookie = `editing_post_title=;expires=Thu, 18 Dec 2018 12:00:00 UTC;path=/`;
  //   document.cookie = `editing_post_preview=;expires=Thu, 18 Dec 2018 12:00:00 UTC;path=/`;
  //   document.cookie = `editing_post_content=;expires=Thu, 18 Dec 2018 12:00:00 UTC;path=/`;
  // }
  //
  // getCookie(cookieName: string) {
  //   let cookies = document.cookie;
  //   let cookiesAry = cookies.split(';');
  //   for (let i = 0; i < cookiesAry.length; i++) {
  //     let curCookie = cookiesAry[i];
  //     let curCookieAry = curCookie.split('=');
  //     if (curCookieAry[0] == cookieName)
  //       return curCookieAry[1];
  //   }
  //   return undefined;
  // }

}
