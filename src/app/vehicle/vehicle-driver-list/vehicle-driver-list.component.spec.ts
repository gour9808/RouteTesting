import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VehicleDriverListComponent} from './vehicle-driver-list.component';

xdescribe('DriverListComponent', () => {
    let component: VehicleDriverListComponent;
    let fixture: ComponentFixture<VehicleDriverListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VehicleDriverListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VehicleDriverListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
