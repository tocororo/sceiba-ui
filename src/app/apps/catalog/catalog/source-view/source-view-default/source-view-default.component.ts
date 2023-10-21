import { Component, Input, OnInit } from '@angular/core';
import { IdentifierSchemas, Source, SourceSystems, SourceTypes } from 'toco-lib';

@Component({
  selector: 'catalog-source-view-default',
  templateUrl: './source-view-default.component.html',
  styleUrls: ['./source-view-default.component.scss']
})
export class SourceViewDefaultComponent implements OnInit {
  @Input() public source: Source;


  public tipos = SourceTypes;
  public sistemas = SourceSystems;
  public IdentifierSchemas = IdentifierSchemas;

  constructor() { }

  ngOnInit() {
  }

  getIdentifier(idtype: IdentifierSchemas) {
    var r = this.source
    ? this.source.data.getIdentifierValue(idtype)
    : "";

  return r;
}


}
