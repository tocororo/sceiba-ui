import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SceibaUIHeaderComponent } from './header.component';


describe('SceibaUIHeaderComponent', () => {
  let component: SceibaUIHeaderComponent;
  let fixture: ComponentFixture<SceibaUIHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SceibaUIHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceibaUIHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
