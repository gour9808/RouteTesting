import {APP_BASE_HREF} from '@angular/common';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from 'app/app.module';
import {OpenReqCreateFormComponent} from './open-req-create-form.component';
import {OpenRequestModule} from '../open-request.module';

describe('Open Req Create Form Component', () => {

    let component: OpenReqCreateFormComponent;
    let fixture: ComponentFixture<OpenReqCreateFormComponent>;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
            imports: [AppModule, OpenRequestModule
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(OpenReqCreateFormComponent);
        component = fixture.componentInstance;
        compiled = fixture.debugElement.nativeElement;
    }));

    it('create request button should not be enabled if there is no client email', () => {
        component.searching = false;
        component.requestor.name = 'test name';
        component.requestor.contacts = ['test'];
        component.requestor.emailId = '';
        component.requestModel.pickupAddress.city = 'test city';
        component.requestModel.dropAddress.city = 'test city';
        expect(component.goForConfirm()).toBeFalsy();
    });

    it('create request button should be enabled if there is a client email', () => {
        component.searching = false;
        component.requestor.name = 'test name';
        component.requestor.contacts = ['test'];
        component.requestor.emailId = 'test@test.com';
        component.requestModel.pickupAddress.city = 'test city';
        component.requestModel.dropAddress.city = 'test city';
        expect(component.goForConfirm()).toBeTruthy();
    });


    it('create request button should not be enabled if there is no pickupaddress', () => {
        component.searching = false;
        component.requestor.name = 'test name';
        component.requestor.contacts = ['test'];
        component.requestor.emailId = 'test@test.com';
        component.requestModel.pickupAddress.city = '';
        component.requestModel.dropAddress.city = 'test city';
        expect(component.goForConfirm()).toBeFalsy();
    });

    it('create request button should be enabled if there is a pickupaddress', () => {
        component.searching = false;
        component.requestor.name = 'test name';
        component.requestor.contacts = ['test'];
        component.requestor.emailId = 'test@test.com';
        component.requestModel.pickupAddress.city = 'test city';
        component.requestModel.dropAddress.city = 'test city';
        expect(component.goForConfirm()).toBeTruthy();
    });

    it('create request button should not be enabled if there is no requestor name', () => {
        component.searching = false;
        component.requestor.name = '';
        component.requestor.contacts = ['test'];
        component.requestor.emailId = 'test@test.com';
        component.requestModel.pickupAddress.city = 'test city';
        component.requestModel.dropAddress.city = 'test city';
        expect(component.goForConfirm()).toBeFalsy();
    });

    it('create request button should not be enabled if there is a requestor name', () => {
        component.searching = false;
        component.requestor.name = 'test name';
        component.requestor.contacts = ['test'];
        component.requestor.emailId = 'test@test.com';
        component.requestModel.pickupAddress.city = 'test city';
        component.requestModel.dropAddress.city = 'test city';
        expect(component.goForConfirm()).toBeTruthy();
    });

    it('create request button should not be enabled if there is no drop address', () => {
        component.searching = false;
        component.requestor.name = 'test name';
        component.requestor.contacts = ['test'];
        component.requestor.emailId = 'test@test.com';
        component.requestModel.pickupAddress.city = 'test city';
        component.requestModel.dropAddress.city = '';
        expect(component.goForConfirm()).toBeFalsy();
    });

    it('create request button should be enabled if there is a drop address', () => {
        component.searching = false;
        component.requestor.name = 'test name';
        component.requestor.contacts = ['test'];
        component.requestor.emailId = 'test@test.com';
        component.requestModel.pickupAddress.city = 'test city';
        component.requestModel.dropAddress.city = 'test city';
        expect(component.goForConfirm()).toBeTruthy();
    });

});
