import { Component } from '@angular/core';

@Component({
  selector: 'seiba-ui-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {
 /**
   * this menu represent all the views of the site
   * by carlosmonterrey17@gmail.com
   */
 public arrayMenuItems=[{content:'HOME',routerlink:"/"},
 {content:'TRANSFORMACION_DATOS',routerlink:"/data"},
 {content:'CONSULTAS_SPARQL',routerlink:"query/view"}]
}
