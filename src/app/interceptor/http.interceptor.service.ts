import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';
import {Router} from '@angular/router';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {Cache} from '../utils/storage.provider';
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';
import {ToastyService} from 'ng2-toasty';
import { AuthService } from '../services/auth.service';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    @Cache({pool: 'User'}) userInfo: any;
    private _pendingRequests = 0;
    private _pendingRequestsStatus = new Subject();

    constructor(private router: Router, private auth: AuthService, private loader: SlimLoadingBarService, private toast: ToastyService) {
        this.loader.color = '#0d4ca6';
        this.loader.height = '8px';
        this._pendingRequestsStatus.subscribe((progress: any) => {
            if (progress.started) {
                this.loader.start();
            }
            if (progress.completed) {
                this.loader.complete();
            }
        });
    }

    prepareAuthHeader(req: HttpRequest<any>) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('access_token', this.auth.getToken());
        return headers;
    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('lang-')) {
            return next.handle(req);
        } else if (req.url.includes('https://freegeoip.net/json/')) {
            return next.handle(req);
        } else if (req.url.includes('https://maps.googleapis.com')) {
            return next.handle(req);
        } else if (this.auth.isAuthenticated()) {
            this._requestStarted();
            return next.handle(this.prepareHeaders(req))
                .catch(error => this.handleError(error))
                .finally(() => {
                    this._requestEnded();
                });
        } else {
            this.router.navigate(['/auth'], {queryParams: {redirect: true}});
            this._requestEnded();
            return new EmptyObservable();
        }
    }

    private _requestStarted() {
        this._pendingRequestsStatus.next({
            started: this._pendingRequests === 0,
            pendingRequests: ++this._pendingRequests
        });
    }

    private _requestEnded() {
        this._pendingRequestsStatus.next({
            completed: this._pendingRequests === 1,
            pendingRequests: --this._pendingRequests
        });
    }

    private handleError(error) {
        switch (error.status) {
            case 401:
            case 403:
                console.log('Session Expired. Show Alert and redirect to login', error);
                this.router.navigate(['/redirect']);
                break;
            case 500:
                console.log('Something broke from server. Show 500 page');
                this.toast.error({
                    title: '500 | INTERNAL SERVER ERROR',
                    msg: error.message,
                    showClose: false,
                    timeout: 3000,
                    theme: 'default'
                });
                break;
            case 409:
                console.error('Intercepted Error', error);
                break;
            default:
                this.toast.error({
                    title: error.status + '|' + error.statusText,
                    msg: error.message,
                    showClose: false,
                    timeout: 3000,
                    theme: 'default'
                });
        }
        this._requestEnded();
        return Observable.throw(error);
    }

    private prepareHeaders(req: HttpRequest<any>) {
            return req.clone({
                headers: this.prepareAuthHeader(req)
            });
        
    }
}
