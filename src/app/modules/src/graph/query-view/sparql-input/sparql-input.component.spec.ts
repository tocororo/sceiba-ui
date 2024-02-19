import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparqlInputComponent } from './sparql-input.component';

describe('SparqlInputComponent', () => {
  let component: SparqlInputComponent;
  let fixture: ComponentFixture<SparqlInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SparqlInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SparqlInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
