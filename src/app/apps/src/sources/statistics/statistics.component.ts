import { Component, OnInit } from '@angular/core';
import { Journal, ResponseStatus, SourceServiceNoAuth, SourceTypes } from 'toco-lib';

@Component({
  selector: 'catalog-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  public lastSources: Array<Journal>;

  public homeCharts = {
    types: [],
    subjects: [],
    indexes: []
  }
  public stats = null;
  public error = false;
  loadCharts= false;
  // xAxisLabel = 'Total de Organizaciones';
  view: any[] = [700, 300];
  barView: any[] = [340, 300]
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  legendPosition: string = 'below';
  colorScheme = {
    domain: [ // all colors light
      '#A9A9A9',
      '#85E96E',
      '#E3E96E',
      '#E9AC6E',
      '#E96E70',
      '#E96EB6',
      '#AE6EE9',
      '#6F6EE9',
      '#6EBBE9',
      '#6EE9B5'
    ]
  };
  constructor(
    private sourceServiceNoAuth: SourceServiceNoAuth,
  ) { }

  ngOnInit() {
    this.lastSources = new Array();
    this.init();
}

init(){
  this.sourceServiceNoAuth.getSourcesStats(null).subscribe(
    response => {
      if(response && response.status == ResponseStatus.SUCCESS){
          this.stats = response.data.aggr;
          let types = [];
          this.stats.source_types.forEach(element => {
            if (element.source_type == SourceTypes.JOURNAL.value) {
              element['label'] = SourceTypes.JOURNAL.label;
              types.push(element);
            }
            if (element.source_type == SourceTypes.STUDENT.value) {
              element['label'] = SourceTypes.STUDENT.label;
              types.push(element);
            }
            if (element.source_type == SourceTypes.POPULARIZATION.value) {
              element['label'] = SourceTypes.POPULARIZATION.label;
              types.push(element);
            }
            if (element.source_type == SourceTypes.REPOSITORY.value) {
              element['label'] = SourceTypes.REPOSITORY.label;
              types.push(element);
            }
            if (element.source_type == SourceTypes.SERIAL.value) {
              element['label'] = SourceTypes.SERIAL.label;
              types.push(element);
            }
            if (element.source_type == SourceTypes.WEBSITE.value) {
              element['label'] = SourceTypes.WEBSITE.label;
              types.push(element);
            }
            if (element.source_type == SourceTypes.OTHER.value) {
              element['label'] = SourceTypes.OTHER.label;
              types.push(element);
            }
            if(element['source_count'] && element['source_count'] != 0){
              this.homeCharts.types.push({ name: element['label'], value: element['source_count']})
            }
          });
          this.stats.indexes.forEach(element => {
            this.homeCharts.indexes.push({ name: element['description'], value: element['source_count']?element['source_count']:0})
          });
          this.stats.subjects.forEach(element => {
            this.homeCharts.subjects.push({ name: element['description'], value: element['source_count']?element['source_count']:0})
          });
          this.stats.source_types = types;
          console.log(this.stats);
          this.loadCharts = true;
      }

    },
    (err: any) => {
      console.log("error: " + err + ".");
      this.error = true;
    },
    () => {
      console.log("complete");
    }
  )
}

}
