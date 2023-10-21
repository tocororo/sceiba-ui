import { Component, OnInit } from '@angular/core';
import {Person} from '../../people/person.entity';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from 'src/app/people/people.service';

@Component({
  selector: 'app-people-layout',
  templateUrl: './people-layout.component.html',
  styleUrls: ['./people-layout.component.scss']
})
export class PeopleLayoutComponent implements OnInit {

  public person: Person;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private service: PeopleService,) { }

  ngOnInit() {
    // console.log(this.route.root);
    
		// let uuid = this.route.snapshot.paramMap.get('uuid');
    // this.service.getPeopleById(uuid).subscribe(
    //   (data) => {
    //     console.log(data);
        
    //       this.person = data.person.metadata;
    //   }
    // );

    this._activatedRoute.data.subscribe(
      (data) => {
        console.log(data);
        
          this.person = data.person.metadata;
      }
    );
  }

}
