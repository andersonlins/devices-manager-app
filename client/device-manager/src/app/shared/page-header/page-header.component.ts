import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  styleUrls: ['page-header.component.scss'],
  templateUrl: './page-header.component.html'
})

export class PageHeaderComponent implements OnInit {

  @Input()
  title = 'untitled'
  constructor() { }

  ngOnInit() { }
}
