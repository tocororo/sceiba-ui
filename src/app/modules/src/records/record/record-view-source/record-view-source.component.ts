import { Component, Input } from '@angular/core';
import { Environment, Source } from 'toco-lib';

@Component({
  selector: 'app-record-view-source',
  templateUrl: './record-view-source.component.html',
  styleUrls: ['./record-view-source.component.scss'],
})
export class RecordViewSourceComponent {
  @Input() public source: Source = null;
  public env: Environment;

  public sourcePath = '';
  public searchPath
  constructor(private _env: Environment
    ) {
      this.env = this._env;
    }

  ngOnInit() {
    if (this.source) {
      this.sourcePath = '/catalog/sources/' + this.source.id;
    }
  }
}
