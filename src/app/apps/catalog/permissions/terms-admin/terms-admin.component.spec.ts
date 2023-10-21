import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MySourcesTermsAdminComponent } from './terms-admin.component';

describe('MySourcesTermsAdminComponent', () => {
  let component: MySourcesTermsAdminComponent;
  let fixture: ComponentFixture<MySourcesTermsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySourcesTermsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySourcesTermsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
