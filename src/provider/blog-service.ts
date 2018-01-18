import {Injectable} from '@angular/core';
import {Api} from './api';
import 'rxjs/Rx';
import {Headers, RequestOptions} from '@angular/http';
import {Holder} from './holder';
import {Observable} from 'rxjs/Observable';
import {User} from './user';

@Injectable()

export class BlogService {
  private headers: Headers = new Headers();
  private requestOption: RequestOptions = new RequestOptions({headers: this.headers, withCredentials: true});

  constructor(public api: Api, public holder: Holder, public userService: User) {
    userService.createAuthorizationHeader(this.headers);
  }

  getPosts() {
    // if (this.holder.posts) {
    //   return Observable.of(this.holder.posts);
    // }
    const seq = this.api.get('blog/post').share();
    seq.subscribe((data) => {
      this.holder.posts = data;
    }, err => {
      this.holder.alerts.push({level: 'alert-danger', content: '博文获取失败，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;
  }

  getMyPosts() {
    if (!this.userService.user) {
      this.holder.alerts.push({level: 'alert-danger', content: '未登录，请登陆后再试'});
      return;
    }
    const seq = this.api.get('blog/post/my-post').share();
    seq.subscribe((data) => {
      this.holder.myPosts = data;
    }, err => {
      this.holder.alerts.push({level: 'alert-danger', content: '个人博文获取失败，请稍后再试'});
    });
    return seq;
  }

  getHisPosts(userName: string) {
    const seq = this.api.get(`blog/${userName}`).share();
    seq.subscribe(data => {
      this.holder.myPosts = data;
    }, err => {
      this.holder.alerts.push({level: 'alert-danger', content: '暂时找不到他的博文哦'});
    });
    return seq;
  }

  getBlogContent(id: number) {
    if (this.holder.content[id]) {
      return Observable.of(this.holder.content[id]);
    }
    const seq = this.api.get(`blog/post/${id}`).share();
    seq.subscribe((data) => {
      this.holder.content[id.toString()] = data;
    }, err => {
      this.holder.alerts.push({level: 'alert-danger', content: '博文详情获取失败，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;
  }

  getBlogComment(id: number) {
    // if (this.comment[id]) {
    //   return Observable.of(this.comment[id]);
    // }
    const seq = this.api.get(`blog/post/${id}/comment`).share();
    seq.subscribe((data) => {
      this.holder.comment[id.toString()] = data;
    }, err => {
      this.holder.alerts.push({level: 'alert-danger', content: '博文评论获取失败，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;
  }

  sendComment(myComment: string, postId: number) {
    const seq = this.api.put(`blog/post/${postId}/comment`, {
      content: myComment,
      commentDate: new Date()
    }, this.requestOption).share();
    seq.subscribe(() => {
    }, err => {
      console.error('ERROR', err);
      this.holder.alerts.push({level: 'alert-danger', content: '评论失败，请稍后再试'});
    });
    return seq;
  }

  sendPost(title: string, preview: string, content: string) {
    const seq = this.api.put('blog/post', {
      title: title,
      preview: preview,
      content: content
    }, this.requestOption).share();
    seq.subscribe(() => {
    }, err => {
      console.error('ERROR', err);
      this.holder.alerts.push({level: 'alert-danger', content: '发送博文失败，请稍后再试'});
    });
    return seq;
  }

  updatePost(title: string, preview: string, content: string, postId: number) {
    const seq = this.api.post('blog/post/update-post', {
      id: postId,
      title: title,
      preview: preview,
      content: content
    }, this.requestOption).share();
    seq.subscribe(() => {
    }, err => {
      console.error('ERROR', err);
      this.holder.alerts.push({level: 'alert-danger', content: '更改博文失败，请稍后再试'});
    });
    return seq;
  }

  delComment(postId: number, commentId: number) {
    const seq = this.api.delete(`blog/post/${postId}/comment/${commentId}`, this.requestOption).share();
    seq.subscribe(() => {
    }, err => {
      console.error('ERROR', err);
      this.holder.alerts.push({level: 'alert-danger', content: '删除评论失败，请稍后再试'});
    });
    return seq;
  }

  delPost(postId: number) {
    const seq = this.api.delete(`blog/post/${postId}`, this.requestOption).share();
    seq.subscribe(() => {
    }, err => {
      console.error('ERROR', err);
      this.holder.alerts.push({level: 'alert-danger', content: '删除博文失败，请稍后再试'});
    });
    return seq;
  }
}
