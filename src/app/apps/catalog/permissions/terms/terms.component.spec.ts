import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySourcesTermsComponent } from './terms.component';

describe('MySourcesTermsComponent', () => {
  let component: MySourcesTermsComponent;
  let fixture: ComponentFixture<MySourcesTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySourcesTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySourcesTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
