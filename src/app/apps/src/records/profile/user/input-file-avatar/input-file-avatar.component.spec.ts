import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InputFileAvatarComponent } from './input-file-avatar.component';

describe('InputFileAvatarComponent', () => {
  let component: InputFileAvatarComponent;
  let fixture: ComponentFixture<InputFileAvatarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFileAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFileAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
