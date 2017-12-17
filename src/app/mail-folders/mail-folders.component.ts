import {Component, OnDestroy, OnInit} from '@angular/core';
import {MailService} from '../../provider/mail-service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Holder} from '../../provider/holder';

@Component({
  selector: 'app-mail-folders',
  templateUrl: './mail-folders.component.html',
  styleUrls: ['./mail-folders.component.css']
})
export class MailFoldersComponent implements OnInit, OnDestroy {
  private sub: any;
  private id: number;
  private mails: any[];
  private detail: any;

  constructor(private mailService: MailService,
              private router: Router, private activatedRoute: ActivatedRoute, private location: Location, private holder: Holder) {
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = +params['mailFolderId'];
      this.holder.activeMailFolder = this.id;
      if (this.holder.folders && this.holder.folders[this.holder.activeMailAccount]) {
        const folders = this.holder.folders[this.holder.activeMailAccount];
        for (const obj of folders) {
          if (obj.id === this.holder.activeMailFolder) {
            this.mails = obj.mailList;
          }
        }
      }
      // this.mailService.readMails(this.id).map(data => data.json()).subscribe(data => {
      //   this.mails = data.data;
      //
      //   console.log(this.mails);
      // });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  parseDate(stamp: number): string {
    const date = new Date(stamp);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    return (monthIndex + 1) + '/' + day + ' ' + hours + ':' + minutes;
  }

  markAsSeen(mail: any) {
    mail.seen = !mail.seen;
    this.mailService.markAsSeen(this.holder.activeMailAccount, this.holder.activeMailFolder, mail.id);
  }

  deleteMail(mail: any) {
    this.mailService.deleteMail(this.holder.activeMailAccount, this.holder.activeMailFolder, mail.id).subscribe(() => {
      const index = this.mails.indexOf(mail, 0);
      if (index > -1) {
        this.mails.splice(index, 1);
      }
    });
  }

  read(mail: any) {
    this.detail = mail;
    if (!mail.seen) {
      this.markAsSeen(mail);
    }
  }
}
