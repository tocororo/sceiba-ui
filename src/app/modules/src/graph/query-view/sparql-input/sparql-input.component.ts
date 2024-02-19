import { Component } from '@angular/core';
import { SparqlService } from '../../_services/sparql.service';

@Component({
  selector: 'app-sparql-input',
  templateUrl: './sparql-input.component.html',
  styleUrls: ['./sparql-input.component.scss']
})
export class SparqlInputComponent {
  editorOptions = {theme: 'vs-light', language: 'sparql'};
  editorOptionsjson={theme: 'vs-light', language: 'json'}
  code: string = 'SELECT ?s ?p ?o WHERE { ?s ?p ?o FILTER (?o = "active") }';



  originalCode: string = 'SELECT ?s ?p ?o WHERE { ?s ?p ?o FILTER (?o = "active") }';
  label_response:string
constructor(private sparql_service:SparqlService){}

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
    deleteQuery(){
      this.code='#Add a SPARQL query'
    }
}
