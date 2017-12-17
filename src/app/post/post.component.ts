import {Component, OnDestroy, OnInit} from '@angular/core';
import {Holder} from '../../provider/holder';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../provider/user';
import {BlogService} from '../../provider/blog-service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  post: any = {content: ''};
  comments: any;
  sub: Subscription;
  myComment = '';
  loading = false;

  constructor(public holder: Holder, private route: ActivatedRoute, public user: User, public blogService: BlogService, public router: Router) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.post.id = params['id'];
      this.blogService.getBlogContent(params['id']).map(data => data.json()).subscribe(data => {
        if (data.code === 200) {
          this.post = data.data;
        } else {
          this.holder.alerts.push({level: 'alert-danger', content: '没有这篇博文，载入失败'});
          this.router.navigateByUrl('/blog');
        }
      });
      this.blogService.getBlogComment(+params['id']).map(data => data.json()).subscribe(data => {
        this.comments = data.data;
      });
    });
    this.myComment = '';
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  parseDate(time: number): string {
    return new Date(time).toLocaleString();
  }

  onSubmit() {
    this.loading = true;
    this.blogService.sendComment(this.myComment, this.post.id).map(data => data.json()).subscribe(data => {
      if (data.code === 200) {
        this.holder.alerts.push({level: 'alert-success', content: '评论成功'});
        this.ngOnInit();
      } else {
        this.holder.alerts.push({level: 'alert-danger', content: '评论失败'});
      }
      this.loading = false;
    });
  }

  delComment(postId: number, commentId: number) {
    this.blogService.delComment(postId, commentId).map(data => data.json()).subscribe(data => {
      if (data.code === 200) {
        this.holder.alerts.push({level: 'alert-success', content: '删除评论成功'});
      } else {
        this.holder.alerts.push({level: 'alert-danger', content: '删除评论失败'});
      }
      this.ngOnInit();
    });
  }
}
