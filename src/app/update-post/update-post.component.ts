import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../provider/blog-service';
import {User} from '../../provider/user';
import {Holder} from '../../provider/holder';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {

  postId = -1;
  title = '';
  preview = '';
  content = '';
  author = '';

  loading = false; // 发送时是否在加载
  isPostExist = true;

  constructor(public blogService: BlogService, public userService: User, public holder: Holder, private route: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {
    this.postId = this.route.params['value']['id'];
    this.blogService.getBlogContent(this.postId).map(data => data.json()).subscribe(data => {
      if (data.code === 200) {
        this.title = data.data.title;
        this.preview = data.data.preview;
        this.content = data.data.content;
        this.author = data.data.authorUserName;
      } else {
        this.holder.alerts.push({level: 'alert-danger', content: '没有这篇博文，载入失败'});
        this.router.navigateByUrl('/blog');
      }
    });
  }

  updatePost() {
    this.loading = true;
    this.blogService.updatePost(this.title, this.preview, this.content, this.postId).map(data => data.json()).subscribe(data => {
      if (data.code === 200) {
        this.holder.alerts.push({level: 'alert-success', content: '编辑博文成功'});
        this.router.navigateByUrl('/blog');
      } else {
        this.holder.alerts.push({level: 'alert-danger', content: '更改博文失败'});
      }
      this.loading = false;
    });
  }

}
