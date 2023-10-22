import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySourcesTermPermissionComponent } from './term-permission.component';

describe('TermPermissionComponent', () => {
  let component: MySourcesTermPermissionComponent;
  let fixture: ComponentFixture<MySourcesTermPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySourcesTermPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySourcesTermPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
