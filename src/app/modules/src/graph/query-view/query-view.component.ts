import { Component } from '@angular/core';
import { ConfigurationJsonService } from '../_services/configuration-json.service';
import { SparqlService } from '../_services/sparql.service';

@Component({
  selector: 'app-query-view',
  templateUrl: './query-view.component.html',
  styleUrls: ['./query-view.component.scss']
})
export class QueryViewComponent {
  editorOptions = {theme: 'vs-light', language: 'sparql'};
  editorOptionsjson={theme: 'vs-light', language: 'json'}
  code: string = 'SELECT ?s ?p ?o WHERE { ?s ?p ?o FILTER (?o = "active") }';
  selectedOutput:string='Grafo'
  panelOpenState = false;

  originalCode: string = 'SELECT ?s ?p ?o WHERE { ?s ?p ?o FILTER (?o = "active") }';
  label_response:string
  graph_label:string
  is_disabled:boolean=true
  constructor( private  configurationService: ConfigurationJsonService,private sparql_service:SparqlService){
    this.selectedOutput='Grafo'

    this.configurationService.getConfigurationJson().subscribe((config)=>{
      if (config) {
        this.graph_label=config.name
        
      }
    })
  }

  public ngOnInit(): void {
    this.sparql_service.getLabelResponse().subscribe(label=>{
      if (label) {
        this.label_response=label
  
      }
    })
  }
  getQuery(){
    console.log(this.code,"code");
    this.sparql_service.getQuery(this.code)
    
  }
  onSelectOutput(label){
    this.selectedOutput = label;
    console.log(label);
    

  }

}
