import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {VehicleSearchComponent} from './vehicle-search.component';
import {VehicleModule} from '../vehicle.module';
import {AppModule} from 'app/app.module';
import {APP_BASE_HREF} from '@angular/common';

describe('Vehicle Search Component', () => {
    let component: VehicleSearchComponent;
    let fixture: ComponentFixture<VehicleSearchComponent>;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppModule, VehicleModule],
            providers: [{provide: APP_BASE_HREF, useValue: '/'}]
        })
            .compileComponents();
        fixture = TestBed.createComponent(VehicleSearchComponent);
        component = fixture.componentInstance;
        compiled = fixture.debugElement.nativeElement;

    }));

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('search button should be disabled if the input field contains empty string', () => {
        component.searchLicense = '';
        expect(component.searchLicense.length).toBe(0);
    });

    it('search button should be enabled only if the input field contains string whose length is greater than 1', () => {
        component.searchLicense = 'ab';
        expect(component.searchLicense.length).toBe(2);
    });

});
