import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../people/person.entity';

@Component({
  selector: 'app-people-view',
  templateUrl: './people-view.component.html',
  styleUrls: ['./people-view.component.scss'],
})
export class PeopleViewComponent implements OnInit {
  constructor(private _activatedRoute: ActivatedRoute) {}

  public person: any = null;

  ngOnInit() {
    this._activatedRoute.parent.data.subscribe((data) => {
      this.person = {
        ...data.person.metadata,
        country:
          // `${data.person.metadata.country.code.toLowerCase()}-${
          data.person.metadata.country.name,
        // }`,
      };
    });
  }
}
