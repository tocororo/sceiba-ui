import { Component, Input } from '@angular/core';
import { MenuElement } from '../header.component';

@Component({
  selector: 'sceiba-ui-menu-secondary-item',
  templateUrl: './menu-secondary-item.component.html',

})
export class MenuSecondaryItemComponent {
  @Input() public item: MenuElement;

}
