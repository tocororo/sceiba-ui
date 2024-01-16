import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformRulesComponent } from './transform-rules.component';

describe('TransformRulesComponent', () => {
  let component: TransformRulesComponent;
  let fixture: ComponentFixture<TransformRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransformRulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransformRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
