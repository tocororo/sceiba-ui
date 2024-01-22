import { Component } from '@angular/core';

@Component({
  selector: 'app-query-result-detail',
  templateUrl: './query-result-detail.component.html',
  styleUrls: ['./query-result-detail.component.scss']
})
export class QueryResultDetailComponent {

  items = Array.from({length: 10}).map((_, i) => `Item #${i}`);
}
