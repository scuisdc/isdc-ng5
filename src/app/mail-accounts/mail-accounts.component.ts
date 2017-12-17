import {Component, OnDestroy, OnInit} from '@angular/core';
import {MailService} from '../../provider/mail-service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Holder} from '../../provider/holder';

@Component({
  selector: 'app-mail-accounts',
  templateUrl: './mail-accounts.component.html',
  styleUrls: ['./mail-accounts.component.css']
})
export class MailAccountsComponent implements OnInit, OnDestroy {
  folders: any[];
  private titleNow: string;
  private sub: any;
  private id: number;

  constructor(private mailService: MailService,
              private router: Router, private activatedRoute: ActivatedRoute, private location: Location, private holder: Holder) {
  }


  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = +params['mailboxId'];
      this.holder.activeMailAccount = this.id;
      if (this.holder.folders[this.id] && this.holder.folders[this.id].length > 0) {
        this.folders = this.holder.folders[this.id];
        for (const folder of this.folders) {
          if (folder.folderType === 'INBOX') {
            this.holder.activeMailFolder = folder.id;
            this.router.navigate([`/mail/${this.holder.activeMailAccount}/${folder.id}`]);
          }
        }
      } else {
        this.mailService.readFolders(this.id).map(data => data.json()).subscribe(data => {
          for (const folder of data.data) {
            if (folder.folderType === 'INBOX') {
              this.holder.activeMailFolder = folder.id;
              this.router.navigate([`/mail/${this.holder.activeMailAccount}/${folder.id}`]);
            }
          }
          this.folders = data.data;
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
