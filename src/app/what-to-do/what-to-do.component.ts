import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-what-to-do',
  templateUrl: './what-to-do.component.html',
  styleUrls: ['./what-to-do.component.css']
})
export class WhatToDoComponent implements OnInit {

  @Input() item: { icon: string, title: string, detail: string };

  constructor() {
  }

  ngOnInit() {
  }

}
