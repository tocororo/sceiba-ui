import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SourceVersionViewComponent } from './version-view.component';


describe('JournalViewComponent', () => {
  let component: SourceVersionViewComponent;
  let fixture: ComponentFixture<SourceVersionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceVersionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceVersionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
