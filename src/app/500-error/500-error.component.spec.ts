import {APP_BASE_HREF} from '@angular/common';
import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {AppModule} from 'app/app.module';
import {ErrorComponent} from 'app/500-error/500-error.component';


describe('Error Component', () => {

    let component: ErrorComponent;
    let fixture: ComponentFixture<ErrorComponent>;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers:[ {provide: APP_BASE_HREF, useValue : '/' }],
            imports:[AppModule
            ]
          }).compileComponents();
          fixture = TestBed.createComponent(ErrorComponent);
          component = fixture.debugElement.componentInstance;
          compiled = fixture.debugElement.nativeElement;
    }));

    it('template should contain header text as 500', fakeAsync(() => {
        expect(compiled.querySelector('h1').innerHTML).toEqual('500');
    }));

});
