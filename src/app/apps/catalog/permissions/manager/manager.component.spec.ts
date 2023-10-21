import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySourcesManagerComponent } from './manager.component';

describe('MySourcesManagerComponent', () => {
  let component: MySourcesManagerComponent;
  let fixture: ComponentFixture<MySourcesManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySourcesManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySourcesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
