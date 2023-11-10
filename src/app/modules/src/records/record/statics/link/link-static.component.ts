import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'static-link',
  templateUrl: './link-static.component.html',
  styleUrls: ['./link-static.component.scss']
})
export class LinkStaticComponent {

  @Input()
  className = "";

  @Input()
  routerlink = "";

  @Input()
  queryparams = {};

  @Input()
  value = "";

  @Input()
  desc = "";

  constructor() { }

}
