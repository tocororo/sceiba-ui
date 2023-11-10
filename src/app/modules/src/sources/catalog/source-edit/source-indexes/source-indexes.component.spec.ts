import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceEditIndexesComponent } from './source-indexes.component';

describe('SourceEditIndexesComponent', () => {
  let component: SourceEditIndexesComponent;
  let fixture: ComponentFixture<SourceEditIndexesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceEditIndexesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceEditIndexesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
