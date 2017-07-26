import {Component, OnInit} from '@angular/core';
import {Holder} from '../../provider/holder';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts: any;

  constructor(private holder: Holder) {
    holder.getPosts().map(data => data.json()).subscribe(data => {
      this.posts = data.data;
    });
  }

  ngOnInit() {
  }

  parseDate(time: number): string {
    return new Date(time).toLocaleString();
  }

}
