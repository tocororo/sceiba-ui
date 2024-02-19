import { Component, OnInit } from '@angular/core';
import { SparqlService } from '../../_services/sparql.service';
import { Edge,Node } from '@swimlane/ngx-graph';

@Component({
  selector: 'app-query-result',
  templateUrl: './query-result.component.html',
  styleUrls: ['./query-result.component.scss']
})
export class QueryResultComponent implements OnInit {

   ELEMENT_DATA:any[]=[]
   dataSource:any
   columns = [
    {
      columnDef: 'position',
      header: 'No.',
      cell: (element: any) => `${element.position}`,
    },
    {
      columnDef: 'subject',
      header: 'Subject',
      cell: (element: any) => `${element.subject}`,
    },
    {
      columnDef: 'predicate',
      header: 'Predicate',
      cell: (element: any) => `${element.predicate}`,
    },
    {
      columnDef: 'object',
      header: 'Object',
      cell: (element: any) => `${element.object_value}`,
    },
  ];
   displayedColumns = this.columns.map(c => c.columnDef);
  code: any = JSON.stringify({
    "type": "team",
    "test": {
      "testPage": "tools/testing/run-tests.htm",
      "enabled": true
    }
  })
  json_array_to_display: any[] = []
  editorOptions = { theme: 'vs-light', language: 'json' };

  nodes: Node[] = [
 
  ]
  links: Edge[] = [
    
  ]
  temp_data:any
  constructor(private sparql_service: SparqlService) {

  }
  public ngOnInit(): void {
    this.sparql_service.getQueryResponse().subscribe((response) => {
      if (response) {
        console.log("response",response.results);
        
        const results: Array<any> = response.results
        this.nodes = []
        this.links = []
        this.code = []
        this.ELEMENT_DATA=[]

        this.dataSource = this.ELEMENT_DATA;

        results.forEach((element:Array<any>, index) => {
          if (element) {

            if (element.length===3) {
              console.log(22222);
              element.forEach((item)=>{
                this.addNode(item.value,this.checkSubstring(item.type))

              })
              this.addLink(Math.random(), element[0].value, element[1].value, "")
              this.addLink(Math.random(), element[1].value, element[2].value, "")
              this.temp_data={position:index,subject:element[0].value,predicate:element[1].value,object_value:element[2].value}
this.ELEMENT_DATA.push(this.temp_data)
              
            }
            
            if (element.length===2) {
              console.log(22222);
              element.forEach((item)=>{
                this.addNode(item.value,this.checkSubstring(item.type))

              })
              this.addLink(Math.random(), element[0].value, element[1].value, "---")
              this.temp_data={position:index,subject:element[0].value,predicate:element[1].value,object_value:"---"}
              this.ELEMENT_DATA.push(this.temp_data)

              
              
            }
            if (element.length===1) {
              console.log(1111);
              this.addNode(element[0].value,this.checkSubstring(element[0].type))
              this.temp_data={position:index,subject:element[0].value,predicate:"---",object_value:"---"}
              this.ELEMENT_DATA.push(this.temp_data)
              
              
              
            }
            this.parseToJson(element, index)
            this.dataSource=this.ELEMENT_DATA
            console.log("this.ELEMENT_DATA",this.ELEMENT_DATA);

            
          }
        

        }
        


        );
/*         this.code = JSON.stringify(this.json_array_to_display)
 */



      }

    })
  }
  addToTable( index,subject?,predicate?,object_value?){
    const temp_data={position:index,
      subject:subject,predicate:predicate,
      object_value:object_value}
      this.ELEMENT_DATA.push(temp_data)
       this.dataSource = this.ELEMENT_DATA; 
       console.log("dataSource",this.dataSource);
       
    
  }
 
  checkSubstring(texto) {
    if (texto.includes("URIRef")) {
      return "URIRef"
      
    }
    if (texto.includes("Literal")) {
      return "Literal"
      
    }
  }
  parseToJson(array, index) {
    console.log("entro a parse");

    const json = {
      [index]: {
        subject: array[0],
        predicate: array[1],
        object_value: array[2]
      }
    }
    console.log(json);
    this.json_array_to_display.push(json)



  }
  addNode(id_node: string,type?:string): void {
    const new_node: Node = {
      id: '',
      label: ''
    };
    new_node.id = id_node;
    new_node.label = type;

    try {
      // Validar que el id del nodo no esté vacío
      if (new_node.id === "") {
        throw new Error("El id del nodo no puede estar vacío");
      }
      // Validar que el id del nodo no exista ya
      if (this.nodes.find(node => node.id === new_node.id)) {
      }
      // Añadir el nodo a la lista de nodos
      this.nodes.push(new_node);
    } catch (error) {
      // Manejar el error
      console.error(error);
      // Realizar cualquier acción adicional necesaria, como mostrar un mensaje de error al usuario
    }
  }
  addLink(id_link: any, source: string, target: string, label_link: string): void {
    const new_link: Edge = {
      id: '',
      source: '',
      target: '',
      label: ''
    };
    new_link.id = id_link.toString();
    new_link.source = source;
    new_link.target = target;
    new_link.label = label_link;

    try {
      // Validar que el id del enlace no esté vacío
      if (new_link.id === '') {
        throw new Error('El id del enlace no puede estar vacío');
      }
      // Validar que el id del enlace no exista ya
      if (this.links.find(link => link.id === new_link.id)) {
        throw new Error('El id del enlace ya existe');
      }
      // Añadir el enlace a la lista de enlaces
      this.links.push(new_link);
    } catch (error) {
      // Manejar el error
      console.error(error);
      // Realizar cualquier acción adicional necesaria, como mostrar un mensaje de error al usuario
    }
  }
}