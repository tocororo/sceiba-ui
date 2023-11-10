import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../people/person.entity';

@Component({
  selector: 'app-people-view',
  templateUrl: './people-view.component.html',
  styleUrls: ['./people-view.component.scss']
})
export class PeopleViewComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute,) { }

  public person: Person = null;

  ngOnInit() {
    
    this._activatedRoute.parent.data.subscribe(
      (data) => {
        console.log(data);
        
          this.person = data.person.metadata;
      }
    );
  }

}
