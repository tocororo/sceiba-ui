import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySourcesEditorComponent } from './editor.component';

describe('MySourcesEditorComponent', () => {
  let component: MySourcesEditorComponent;
  let fixture: ComponentFixture<MySourcesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySourcesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySourcesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
