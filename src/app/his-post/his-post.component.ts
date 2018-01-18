import {Component, OnInit} from '@angular/core';
import {Holder} from '../../provider/holder';
import {BlogService} from '../../provider/blog-service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../provider/user';


@Component({
  selector: 'app-his-post',
  templateUrl: './his-post.component.html',
  styleUrls: ['./his-post.component.css']
})
export class HisPostComponent implements OnInit {

  hisPosts: any;
  userName: string;

  constructor(private holder: Holder, public blogService: BlogService, public userService: User, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userName = this.route.params['value']['user_name'];
    this.blogService.getHisPosts(this.userName).map(data => data.json()).subscribe(data => {
      this.hisPosts = data.data;
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
