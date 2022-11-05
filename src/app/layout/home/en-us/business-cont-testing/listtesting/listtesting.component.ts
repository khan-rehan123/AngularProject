import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listtesting',
  templateUrl: './listtesting.component.html',
  styleUrls: ['./listtesting.component.scss']
})
export class ListtestingComponent implements OnInit {
  public showSearch:boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
