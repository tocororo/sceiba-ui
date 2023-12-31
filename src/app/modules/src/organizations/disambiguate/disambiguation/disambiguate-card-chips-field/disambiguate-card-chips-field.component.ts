import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-disambiguate-card-chips-field',
  templateUrl: './disambiguate-card-chips-field.component.html',
  styleUrls: ['./disambiguate-card-chips-field.component.scss']
})
export class DisambiguateCardChipsFieldComponent implements OnInit {

  @Input() isMaster: boolean = true;
  @Input() chipsTitle: string = null;
  @Input() subtitlesList: string[] = null;
  @Input() contentList: string[] = null;
  @Input() idName: string = null;
  @Input() valueName: string = null;

  @Output() propagate = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit() {
  }

  onPropagate(elements: string[]){
    this.propagate.emit(elements)
    if(!this.isMaster){
      let newContentList: string[] = this.contentList.filter( newElement=> {
        elements.forEach(toDelete => {
          if(newElement == toDelete){
            return false;
          }
        });
        return true;
      })
      this.contentList = newContentList;
    }
  }

}
