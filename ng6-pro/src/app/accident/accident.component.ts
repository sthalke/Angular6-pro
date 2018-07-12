import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.css']
})
export class AccidentComponent implements OnInit {
  public tabName: string;
  constructor() { }

  ngOnInit() {
    this.tabName = 'Human-Factor';
  }

  onTabChange(name) {
    this.tabName = name; 
  }

}
