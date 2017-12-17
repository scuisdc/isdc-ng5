import {Injectable} from '@angular/core';
import {Headers, RequestOptions} from '@angular/http';
import {Api} from './api';
import {Holder} from './holder';
import {User} from './user';


@Injectable()
export class MailService {
  private headers: Headers = new Headers();
  private requestOption: RequestOptions = new RequestOptions({headers: this.headers, withCredentials: true});

  constructor(private api: Api, private holder: Holder, private userService: User) {
    userService.createAuthorizationHeader(this.headers);
  }

  readAccounts() {
    const seq = this.api.get('mail/', {}, this.requestOption).share();
    seq.subscribe(data => {
      this.holder.accounts = data.json().data;
    }, err => {
      this.holder.alerts.push({level: 'alert-danger', content: '账户列表获取失败，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;
  }

  readFolders(mailboxId: number) {
    const seq = this.api.get(`mail/${mailboxId}`, {}, this.requestOption).share();
    seq.subscribe(data => {
      this.holder.folders[mailboxId] = data.json().data;
    }, err => {
      this.holder.alerts.push({level: 'alert-danger', content: '文件夹列表获取失败，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;
  }

  markAsSeen(mailboxId: number, folderId: number, mailId: number) {
    const seq = this.api.post(`mail/${mailboxId}/${folderId}/${mailId}`, {}, this.requestOption).share();
    seq.subscribe(() => {
    }, err => {
      this.holder.alerts.push({level: 'alert-danger', content: '标记为已读失败，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;
  }

  deleteMail(mailboxId: number, folderId: number, mailId: number) {
    const seq = this.api.delete(`mail/${mailboxId}/${folderId}/${mailId}`, this.requestOption).share();
    seq.subscribe(() => {
    }, err => {
      this.holder.alerts.push({level: 'alert-danger', content: '删除失败，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;
  }

  sendMail(accountId: number, mail: any) {
    const seq = this.api.put(`mail/${accountId}`, mail, this.requestOption).share();
    seq.subscribe(() => {
      this.holder.alerts.push({level: 'alert-success', content: '发送成功'});
    }, err => {
      this.holder.alerts.push({level: 'alert-danger', content: '发送失败，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;
  }

  refresh(mailboxId: number, folderId: number) {
    const seq = this.api.get(`mail/${mailboxId}/${folderId}`, {}, this.requestOption).share();
    seq.subscribe(data => {
      for (const obj of this.holder.folders[mailboxId]) {
        if (obj.id === folderId) {
          const mails: any[] = data.json().data;
          obj.mailList.length = 0;
          for (const item of mails) {
            obj.mailList.push(item);
          }
        }
      }
      this.holder.alerts.push({level: 'alert-success', content: '刷新成功'});
    }, err => {
      this.holder.alerts.push({level: 'alert-danger', content: '刷新失败，请稍后再试'});
      console.error('ERROR', err);
    });
    return seq;
  }
}
