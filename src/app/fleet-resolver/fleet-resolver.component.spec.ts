import {APP_BASE_HREF} from '@angular/common';
import {async, TestBed} from '@angular/core/testing';
import {AppModule} from 'app/app.module';

describe('Fleet resolver component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [{provide: APP_BASE_HREF, useValue: '/'}],
            imports: [AppModule]
        }).compileComponents();
    }));
});
