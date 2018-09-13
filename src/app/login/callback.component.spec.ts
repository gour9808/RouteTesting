import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CallbackComponent} from "./callback.component";


fdescribe('CallBackComponent', () => {
    let component: CallbackComponent;
    let fixture: ComponentFixture<CallbackComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CallbackComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CallbackComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return access_token', () => {
        const string = '#expires_in=99999996&access_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjZlNDI3MzEzLTQyMzktNGM1Yy1hN2Q0LTJhNjVhYzY1ODg3OSJ9.eyJzaWQiOiIyOWU1NDQwZi1lZGI1LTQyMWQtYTVmOC01Njg5NGI1YjUyYWUiLCJzdWIiOiJkYTgxYjZhMC03ZTQ3LTQ5ODQtOWRjNi1kNzA2ZTc1MTQzZmQiLCJpc3ViIjoiNTgwODk1Y2EyYWI3OWMwMDAxMGY2NjgwIiwiYXVkIjoiZmIwYmQ1MmNjNjQ5NDFiNWFiZWQwNDMzMTkwZmNiZTAiLCJleHAiOjE2MjIyNDQ3MzQsImlhdCI6MTUyMjI0NDczOCwiYXV0aF90aW1lIjoxNTIyMjQ0NzM4LCJpc3MiOiJodHRwczovL2FwaXMtY2lkYWFzLXN0YWdpbmcudGVzdC5jYXJib29rcGx1cy5jb20iLCJqdGkiOiIwOTUzYjA0ZC1iOTU3LTQwMGQtODY4Mi01ZjI5NDJjNzk2MGIiLCJzY29wZXMiOlsib3BlbmlkIiwiZnVlbGNvc3Q6d3JpdGUiLCJpbmNpZGVudHJlcG9ydDp3cml0ZSIsInZlbmRvcjpyZWFkIiwiaW5zdXJhbmNlcG9saWN5OndyaXRlIiwiY2lkYWFzOmdyb3VwLXdyaXRlIiwidmVoaWNsZWRldGFpbHM6cmVhZCIsImZ1ZWxjb3N0OnJlYWQiLCJjaWRhYXM6cmVnaXN0ZXIiLCJvcmdhbmlzYXRpb246d3JpdGUiLCJpbnN1cmFuY2Vwb2xpY3k6cmVhZCIsImNpZGFhczpsb2dpbiIsIm9iZHRyaXA6cmVhZCIsInZlaGljbGU6d3JpdGUiLCJ2ZWhpY2xlY29zdDp3cml0ZSIsIm9yZ2FuaXNhdGlvbjpyZWFkIiwidmVoaWNsZTpyZWFkIiwidmVoaWNsZWRldGFpbHM6d3JpdGUiLCJjaWRhYXM6Z3JvdXAtcmVhZCIsInRyaXA6d3JpdGUiLCJvYmR0cmlwOndyaXRlIiwiY2FyYm9va3BsdXM6ZGVhbGVycmVhZCIsImNhcmJvb2twbHVzOmRlYWxlcndyaXRlIiwidmVuZG9yOndyaXRlIiwiY2lkYWFzOnVzZXJ1cGRhdGUiLCJpbmNpZGVudHJlcG9ydDpyZWFkIiwiZmxlZXQ6cmVhZCIsImZsZWV0OndyaXRlIiwiY2lkYWFzOnVzZXJpbmZvIiwidHJpcDpyZWFkIiwiY3VzdG9tZXI6cmVhZCIsImN1c3RvbWVyOndyaXRlIiwiaW52aXRlOnJlYWQiLCJpbnZpdGU6d3JpdGUiLCJkcml2ZXI6d3JpdGUiLCJkcml2ZXI6cmVhZCJdLCJyb2xlcyI6WyJVU0VSIl0sImdyb3VwcyI6W3siZ3JvdXBJZCI6IjQ1Yzk0OTNiLTI5ODQtNDcyZi05NTA2LTBkNjM5ZGVlMDUzZiIsInBhdGgiOiIvNDVjOTQ5M2ItMjk4NC00NzJmLTk1MDYtMGQ2MzlkZWUwNTNmLyIsInJvbGVzIjpbIkdST1VQX0FETUlOIl19LHsiZ3JvdXBJZCI6InRlc3QxIiwicGF0aCI6Ii90ZXN0MS8iLCJyb2xlcyI6WyJVU0VSIl19XX0.U_gwSWFWsVU6XOxj1qKlNiX-m6nWd_3jm1gc42_-rSfvuIt73AL3h3WcSZcfjRbkgoPFfilcL_V_BQAElV_weg&session_state=K5XBVUyLcjkpTvV3_ZCzRRcaYb2VCDT2i5fyr2mycW0.T4xBnim157Q';
        expect(component.getHashParameter(string)).toBeTruthy();
    })
});
