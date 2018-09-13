import {APP_BASE_HREF} from '@angular/common';
import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {AppModule} from 'app/app.module';
import {CreateFleetComponent} from './create-fleet.component';

describe('Create Fleet Component', () => {

    let component: CreateFleetComponent;
    let fixture: ComponentFixture<CreateFleetComponent>;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
            imports: [AppModule
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(CreateFleetComponent);
        component = fixture.componentInstance;
        compiled = fixture.debugElement.nativeElement;
    }));

    it('template should contain cbp-input-field-autocomplete-address widget', fakeAsync(() => {
        expect(compiled.querySelector('cbp-input-field-autocomplete-address')).not.toBe(null);
    }));

    it('save option should be disabled when there is no fleet name', async(() => {
        expect(component.goForFleet()).toBe('');
    }));

    it('save option should be enabled when there is a fleet name', () => {
        component.fleet.fleetName = 'Test';
        expect(component.goForFleet()).toBeTruthy();
    });

    it('fleet name input field should be mandatory', () => {
        expect(compiled.querySelector('cbp-input-field-text:nth-child(1)').getAttribute('mandatory')).toBe('true');
    });

    it('fleet description input field should be mandatory', () => {
        expect(compiled.querySelector('cbp-input-field-text:nth-child(2)').getAttribute('mandatory')).toBe('true');
    });

});
