import { TestBed, async } from '@angular/core/testing';
import { SourceEditJournalComponent } from './journal-edit.component';

describe('JournalEditComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SourceEditJournalComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SourceEditJournalComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'inclusion'`, () => {
    const fixture = TestBed.createComponent(SourceEditJournalComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('inclusion');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(SourceEditJournalComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('inclusion app is running!');
  });
});
