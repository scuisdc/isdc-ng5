import {Component, OnDestroy, OnInit} from '@angular/core';
import {Holder} from '../../provider/holder';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../provider/user';
import {Api} from '../../provider/api';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  post: any = {content: ''};
  comments: any;
  sub: Subscription;
  myComment: string = '';
  loading = false;

  constructor(public holder: Holder, private route: ActivatedRoute, public user: User, private api: Api) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.post.id = +params['id'];
      this.holder.getBlogContent(+params['id']).map(data => data.json()).subscribe(data => {
        this.post = data.data;
      });

      this.holder.getBlogComment(+params['id']).map(data => data.json()).subscribe(data => {
        this.comments = data.data;
      });

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  parseDate(time: number): string {
    return new Date(time).toLocaleString();
  }

  onSubmit() {
    this.loading = true;
    this.user.sendComment(this.myComment, this.post.id).map(data => data.json()).subscribe(data => {
      if (data.code == 200) {
        this.holder.alerts.push({level: 'alert-success', content: '评论成功'});
        this.comments.push({content: this.myComment, userName: this.user.user.userName, commentDate: new Date()});
        this.myComment = '';
      } else {
        this.holder.alerts.push({level: 'alert-success', content: '评论成功'});
      }
      this.loading = false;
    })
  }
}
