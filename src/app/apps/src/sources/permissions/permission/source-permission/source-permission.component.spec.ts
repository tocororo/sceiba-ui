import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySourcesSourcePermissionComponent } from './source-permission.component';

describe('SourcePermissionComponent', () => {
  let component: MySourcesSourcePermissionComponent;
  let fixture: ComponentFixture<MySourcesSourcePermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySourcesSourcePermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySourcesSourcePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
