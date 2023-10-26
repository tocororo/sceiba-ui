import { Component, Input } from '@angular/core';
import { MenuElement } from '../header.component';

@Component({
  selector: 'sceiba-ui-menu-secondary',
  templateUrl: './menu-secondary.component.html',
  styleUrls: ['./menu-secondary.component.scss']
})
export class MenuSecondaryComponent {
  @Input() public secondaryMenuElements: MenuElement[];

}
