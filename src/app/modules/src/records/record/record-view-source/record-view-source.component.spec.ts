import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordViewSourceComponent } from './record-view-source.component';

describe('RecordViewSourceComponent', () => {
  let component: RecordViewSourceComponent;
  let fixture: ComponentFixture<RecordViewSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordViewSourceComponent]
    });
    fixture = TestBed.createComponent(RecordViewSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
