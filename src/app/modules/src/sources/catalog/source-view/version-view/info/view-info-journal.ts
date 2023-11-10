import { Component, Input } from "@angular/core";
import { IdentifierSchemas, JournalData, SourceSystems, SourceTypes } from "toco-lib";



@Component({
  selector: "catalog-source-view-version-info-journal",
  templateUrl: "./view-info-journal.html",
  styleUrls: ["../version-view.component.scss"],
})
export class SourceViewInfoJournalComponent {
  @Input() public journalData: JournalData;

  public IdentifierSchemas = IdentifierSchemas;

  public tipos = SourceTypes;
  public sistemas = SourceSystems;
  constructor(
  ) {
  }

  getIdentifier(idtype: IdentifierSchemas) {
    var r = this.journalData
    ? this.journalData.getIdentifierValue(idtype)
    : "";

  return r;
}
}
