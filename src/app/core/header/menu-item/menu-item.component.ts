import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuElement } from "../header.component";

@Component({
  selector: 'sceiba-ui-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class SceibaUiMenuItemComponent implements OnInit {
  @Input() subMenuElements: MenuElement[];
  @Input() isMenuApps = false;
  @ViewChild('childMenu', { static: true }) public childMenu;

  constructor() { }

  ngOnInit() {
  }

}
