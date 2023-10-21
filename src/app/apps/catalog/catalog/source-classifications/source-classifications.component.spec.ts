import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceClassificationsComponent } from './source-classifications.component';

describe('SourceClassificationsComponent', () => {
  let component: SourceClassificationsComponent;
  let fixture: ComponentFixture<SourceClassificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceClassificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceClassificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
