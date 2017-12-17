import {Component, OnInit} from '@angular/core';
import {MailService} from '../../provider/mail-service';
import {Holder} from '../../provider/holder';
import {Router} from '@angular/router';

@Component({
  selector: 'app-service-mail',
  templateUrl: './service-mail.component.html',
  styleUrls: ['./service-mail.component.css']
})
export class ServiceMailComponent implements OnInit {
  private accounts: any[];
  private titleNow: string;
  private sub: any;
  private temp: any = {};

  constructor(private mailService: MailService,
              private holder: Holder, private router: Router) {
  }

  ngOnInit() {
    if (this.holder.accounts && this.holder.accounts.length > 0) {
      this.holder.activeMailAccount = this.holder.accounts[0].id;
      this.accounts = this.holder.accounts;
      this.router.navigate([`/mail/${this.holder.activeMailAccount}`]);

    } else {
      this.mailService.readAccounts().map(data => data.json()).subscribe(data => {
        if (data.data.length > 0) {
          this.holder.activeMailAccount = data.data[0].id;
          this.router.navigate([`/mail/${this.holder.activeMailAccount}`]);
        }
        this.accounts = data.data;
      });
    }

  }

  sendMail() {
    this.temp.from = this.temp.accountId.split(' ')[1];
    this.temp.contentType = 'text/plain;charset=UTF-8';
    this.temp.sendDate = new Date().getTime();
    this.mailService.sendMail(+this.temp.accountId.split(' ')[0], this.temp).subscribe(() => {

    });
  }

  refresh() {
    this.mailService.refresh(this.holder.activeMailAccount, this.holder.activeMailFolder).subscribe(() => {
    });
  }

}
