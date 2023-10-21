import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InputOrgSearchComponent } from './input-org-search.component';



describe('OrgSearchComponent', () => {
  let component: InputOrgSearchComponent;
  let fixture: ComponentFixture<InputOrgSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InputOrgSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputOrgSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
