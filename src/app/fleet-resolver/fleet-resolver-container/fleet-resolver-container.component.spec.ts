import { APP_BASE_HREF } from '@angular/common';
import { async, TestBed } from '@angular/core/testing';
import { AppModule } from 'app/app.module';
import {
    FleetResolverContainerComponent,
} from 'app/fleet-resolver/fleet-resolver-container/fleet-resolver-container.component';

describe('Fleet resolver container component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppModule],
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
        }).compileComponents();
    }));

    it('should create component', async(() => {
        const fixture = TestBed.createComponent(FleetResolverContainerComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy;
    }));
});