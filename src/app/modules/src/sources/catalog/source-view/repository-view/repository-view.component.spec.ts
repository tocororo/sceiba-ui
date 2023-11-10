import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SourceRepositoryViewComponent } from './repository-view.component';


describe('RepositoryViewComponent', () => {
  let component: SourceRepositoryViewComponent;
  let fixture: ComponentFixture<SourceRepositoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceRepositoryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceRepositoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
