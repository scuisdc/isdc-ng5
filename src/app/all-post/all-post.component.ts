import {Component, OnInit} from '@angular/core';
import {Holder} from '../../provider/holder';
import {BlogService} from '../../provider/BlogService';
import {User} from '../../provider/user';

@Component({
  selector: 'app-blog',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {

  posts: any;

  constructor(public holder: Holder, public blogService: BlogService, public userService: User) {
  }

  ngOnInit() {
    this.blogService.getPosts().map(data => data.json()).subscribe(data => {
      this.posts = data.data;
    });
  }

  parseDate(time: number): string {
    return new Date(time).toLocaleString();
  }

  delPost(id: number) {
    this.blogService.delPost(id).map(data => data.json()).subscribe(data => {
      if (data.code === 200) {
        this.holder.alerts.push({level: 'alert-success', content: '删除博文成功'});
      } else {
        this.holder.alerts.push({level: 'alert-danger', content: '删除博文失败'});
      }
      this.ngOnInit();
    });
  }
}
