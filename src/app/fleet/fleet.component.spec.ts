import {APP_BASE_HREF} from '@angular/common';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from 'app/app.module';
import {FleetComponent} from './fleet.component';

describe('Fleet Component', () => {

    let fixture: ComponentFixture<FleetComponent>;
    let component: FleetComponent;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppModule],
            providers: [{provide: APP_BASE_HREF, useValue: '/'}],

        }).compileComponents();
        fixture = TestBed.createComponent(FleetComponent);
        component = fixture.debugElement.componentInstance;
        compiled = fixture.debugElement.nativeElement;
    }));

    it('should create component', async(() => {
        expect(component).toBeTruthy;
    }));

    it('template should contain toolbar', async(() => {
        expect(compiled.querySelector('cbp-toolbar')).not.toBe(null);
    }));

});
