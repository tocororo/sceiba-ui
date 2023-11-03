import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuElement } from './header/header.component';


export class HeaderServiceData {
  icon: string;
  iconLabel: string;
  iconAlt: string;
  iconRoute: string;
  secondaryMenuElements: MenuElement[];
  extraMenuAuthenticatedUser: MenuElement[];
}

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor() {
  }
  private headerDataSubject = new Subject<any>();

  headerDataObservable$ = this.headerDataSubject.asObservable();

  setHeaderData(data: HeaderServiceData) {
    this.headerDataSubject.next(data);
  }
}
