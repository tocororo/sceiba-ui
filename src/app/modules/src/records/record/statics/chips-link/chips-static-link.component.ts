import { Component, Input } from '@angular/core';

/**
 * Represents a static control that shows an array of texts using chips.
 */
@Component({
  selector: 'static-chips-link',
  templateUrl: './chips-static-link.component.html',
  styleUrls: ['./chips-static-link.component.scss'],
})
export class StaticChipsLinkComponent {
  @Input()
  className = '';
  /**
   * The control's appearance.
   * By default, its value is `'outline'`.
   */
  @Input()
  public appearance: string;

  /**
   * The control's description.
   * By default, its value is `undefined` and it is not showed.
   */
  @Input()
  public desc: string;

  /**
   * The array of items for displaying.
   * By default, its value is `[]`.
   */
  @Input()
  public value: string[];

  @Input()
  routerlink: string = '';

  /**
   * The variable of the queryParam, the value will be the input `value`
   */
  @Input()
  queryparamVariable = '';

  public constructor() {
    this.appearance = 'outline';
    this.desc = undefined;
    this.value = [];
  }

  queryParams(item) {
    let param = {};
    param[this.queryparamVariable] = item;
    return param;
  }
}
