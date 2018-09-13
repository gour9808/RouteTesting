import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {VehicleCreateComponent} from './vehicle-create.component';
import {AppModule} from 'app/app.module';
import {APP_BASE_HREF} from '@angular/common';
import {VehicleModule} from '../vehicle.module';

describe('VehicleCreateComponent', () => {

    let component: VehicleCreateComponent;
    let fixture: ComponentFixture<VehicleCreateComponent>;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [{provide: APP_BASE_HREF, useValue: '/'}],
            imports: [AppModule, VehicleModule
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(VehicleCreateComponent);
        component = fixture.debugElement.componentInstance;
        compiled = fixture.debugElement.nativeElement;
    }));

    it('should create component', async(() => {
        expect(component).toBeTruthy();
    }));

    it('create vehicle option should be disabled when there is no vehicle name', async(() => {
        component.newVehicle.numberPlate.strLicense = 'KA22 4415';
        expect(component.ignition()).toBe(undefined);
    }));

    it('create vehicle option should be disabled when there is no license plate number', async(() => {
        component.newVehicle.name = 'test name';
        expect(component.ignition()).toBe(undefined);
    }));

    it('create vehicle option should be enabled when there is are both vehicle name and license plate number', async(() => {
        component.newVehicle.name = 'test name';
        component.newVehicle.numberPlate.strLicense = 'KA22 4415';
        expect(component.ignition()).toBe(true);
    }));

});
