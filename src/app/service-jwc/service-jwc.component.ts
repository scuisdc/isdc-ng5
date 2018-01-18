import {Component, OnInit} from '@angular/core';
import {JWCService} from '../../provider/jwc-service';
import {Holder} from '../../provider/holder';

@Component({
  selector: 'app-service-jwc',
  templateUrl: './service-jwc.component.html',
  styleUrls: ['./service-jwc.component.css']
})
export class ServiceJWCComponent implements OnInit {

  payload: { zjh: string, mm: string, date: Date } = {zjh: '', mm: '', date: new Date()};

  loading = false;

  status = '查 询';


  constructor(private jwcService: JWCService, public holder: Holder) {
  }

  ngOnInit() {

  }

  onSubmit() {
    this.loading = true;
    this.status = '正在连接服务器……';
    this.jwcService.calScore(this.payload).map(data => data.json()).subscribe(data => {
      this.status = data.message;
      this.startPulling();
    }, () => {
      this.loading = false;
      this.status = '查 询';
    });
  }

  startPulling() {
    this.jwcService.getScoreResult(this.payload).delay(1000).map(data => data.json()).subscribe(data => {
      if (data.code === 200) {
        if (data.data.complete) {
          this.status = '查 询';
          this.loading = false;
          if (!data.data.success) {
            this.holder.alerts.push({level: 'alert-danger', content: data.data.result});
          } else {
            this.holder.scores = JSON.parse(data.data.result);
          }
        } else {
          this.status = '正在查询……';
          this.startPulling();
        }
      } else {
        this.loading = false;
        this.status = '查 询';
        this.holder.alerts.push({level: 'alert-danger', content: data.message});
      }
    });
  }


  calculateGPA(items: any[], selected: boolean = false, must: boolean = false): number {
    const filtered = items.filter(item => item.score !== '')
      .filter(item => selected ? item.selected : true)
      .filter(item => must ? item.type === '必修' : true);
    if (filtered.length > 0) {
      const GPA = filtered.map(item => this.parseGPA(this.parseScore(item.score)) * parseInt(item.credit, 10)).reduce((v, v2) => v + v2);
      const credit = filtered.map(item => parseInt(item.credit, 10)).reduce((v, v2) => v + v2);
      if (credit !== 0) {
        return (GPA / credit);
      }
    }
    return 0;
  }

  calculateScore(items: any[], selected: boolean = false, must: boolean = false): number {
    const filtered = items.filter(item => item.score !== '')
      .filter(item => selected ? item.selected : true)
      .filter(item => must ? item.type === '必修' : true);
    if (filtered.length > 0) {
      const score = filtered.map(item => item.score * parseInt(item.credit, 10)).reduce((v, v2) => v + v2);
      const credit = filtered.map(item => parseInt(item.credit, 10)).reduce((v, v2) => v + v2);
      if (credit !== 0) {
        return (score / credit);
      }
    }
    return 0;
  }


  parseScore(str: string): number {
    let score;
    switch (str) {
      case '优秀':
        score = 95;
        break;
      case '良好':
        score = 85;
        break;
      case '中等':
        score = 75;
        break;
      case '通过':
        score = 60;
        break;
      case '及格':
        score = 60;
        break;
      case '未通过':
        score = 0;
        break;
      case '暂无':
        score = 0;
        break;
      default:
        score = parseInt(str, 10);
    }
    return score;
  }

  parseGPA(score: number): number {
    let gpa;
    if (score >= 90) {
      gpa = 4.0;
    } else if (score >= 85) {
      gpa = 3.7;
    } else if (score >= 80) {
      gpa = 3.3;
    } else if (score >= 76) {
      gpa = 3.0;
    } else if (score >= 73) {
      gpa = 2.7;
    } else if (score >= 70) {
      gpa = 2.3;
    } else if (score >= 66) {
      gpa = 2.0;
    } else if (score >= 63) {
      gpa = 1.7;
    } else if (score >= 61) {
      gpa = 1.3;
    } else if (score >= 60) {
      gpa = 1.0;
    } else {
      gpa = 0.0;
    }
    return gpa;
  }

  selectAll() {
    const b = this.holder.scores.filter(item => item.selected).length === 0;
    this.holder.scores.forEach(item => item.selected = b);
  }

  selectMust() {
    this.holder.scores.forEach(item => item.selected = item.type === '必修');
  }

  selectNotMust() {
    this.holder.scores.forEach(item => item.selected = item.type !== '必修');
  }
}
