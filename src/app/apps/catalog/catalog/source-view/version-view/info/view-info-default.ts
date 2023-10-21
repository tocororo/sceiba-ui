import { Component, Input } from "@angular/core";
import { IdentifierSchemas, SourceData, SourceSystems, SourceTypes } from "toco-lib";



@Component({
  selector: "catalog-source-view-version-info-default",
  templateUrl: "./view-info-default.html",
  styleUrls: ["../version-view.component.scss"],
})
export class SourceViewInfoSourceDefaultComponent {
  @Input() public sourceData: SourceData;

  public IdentifierSchemas = IdentifierSchemas;

  public tipos = SourceTypes;
  public sistemas = SourceSystems;
  constructor(
  ) {
  }

  getIdentifier(idtype: IdentifierSchemas) {
    var r = this.sourceData
    ? this.sourceData.getIdentifierValue(idtype)
    : "";

  return r;
  }
}
