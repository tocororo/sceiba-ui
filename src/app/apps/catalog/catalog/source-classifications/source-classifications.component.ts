import { Component, Input, OnInit } from '@angular/core';
import { Source, VocabulariesInmutableNames } from 'toco-lib';

@Component({
  selector: 'catalog-source-classifications',
  templateUrl: './source-classifications.component.html',
  styleUrls: ['./source-classifications.component.scss']
})
export class SourceClassificationsComponent implements OnInit {

  @Input() public source: Source;
  public vocabularies: typeof VocabulariesInmutableNames;

  constructor() { }

  ngOnInit() {
  }
}
