import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuElement } from "../header.component";

@Component({
  selector: 'sceiba-ui-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SceibaUiMenuComponent implements OnInit {
  @Input() menuItems: MenuElement[];

  constructor() { }

  ngOnInit() {
  }

}
