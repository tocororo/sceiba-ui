import { Component, Input, OnInit } from '@angular/core';
import { Source } from 'toco-lib';

@Component({
  selector: 'app-record-view-source',
  templateUrl: './sourcerecord-view.component.html',
  styleUrls: ['./sourcerecord-view.component.scss']
})
export class SourcerecordViewComponent implements OnInit {

  @Input() public source: Source = null;

  constructor() { }

  ngOnInit() {
  }

}
