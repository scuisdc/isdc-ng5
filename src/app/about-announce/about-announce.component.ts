import {Component, OnInit} from '@angular/core';
import {MarkdownService} from 'angular2-markdown';
import {Holder} from '../../provider/holder';

@Component({
  selector: 'app-about-announce',
  templateUrl: './about-announce.component.html',
  styleUrls: ['./about-announce.component.css']
})
export class AboutAnnounceComponent implements OnInit {
  ngOnInit(): void {
    this.holder.getAnnounce().map(data => data.json())
      .subscribe(data => {
        this.announces = data.data;
      });
  }

  announces: { title: string, content: string }[];

  constructor(public _markdown: MarkdownService, public holder: Holder) {
    this._markdown.renderer.table = (header: string, body: string) => {
      return `
      <table class="table table-bordered table-hover table-responsive">
        <tbody>
          ${body}
        </tbody>
      </table>
      `;
    }
  }


}
