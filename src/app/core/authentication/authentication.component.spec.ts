
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceibaUiAuthenticationComponent } from './authentication.component';

describe('SceibaUiAuthenticationComponent', () => {
    let component: SceibaUiAuthenticationComponent;
    let fixture: ComponentFixture<SceibaUiAuthenticationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SceibaUiAuthenticationComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SceibaUiAuthenticationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
