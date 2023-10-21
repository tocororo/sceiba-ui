import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SceibaFooterComponent } from './footer.component';


describe('FooterComponent', () => {
  let component: SceibaFooterComponent;
  let fixture: ComponentFixture<SceibaFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceibaFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceibaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
