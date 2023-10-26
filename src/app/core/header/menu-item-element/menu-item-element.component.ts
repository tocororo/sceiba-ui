import { Component, Input } from '@angular/core';
import { MenuElement } from '../header.component';

@Component({
  selector: 'sceiba-ui-menu-item-element',
  templateUrl: './menu-item-element.component.html',
  styleUrls: ['./menu-item-element.component.scss']
})
export class SceibaUiMenuItemElementComponent {
  @Input() item: MenuElement;
}
