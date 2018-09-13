import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {Cache} from '../utils/storage.provider';
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';
import {ToastyService} from 'ng2-toasty';


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
        // var headers = req.headers ? req.headers : new HttpHeaders();
        // new HttpHeaders().set('access_token', `${JSON.parse(localStorage.getItem("session")).token}`);
        // new HttpHeaders().set('Content-Type', req.detectContentTypeHeader());
        // req.withCredentials = true;
        // return req.clone({
        //     headers: req.headers.set('Authorization', authHeader),
        //     withCredentials: true;
        // });
    }

    prepareFileUploadHeader(req: HttpRequest<any>) {
        const headers = new HttpHeaders()
            .set('username', this.userInfo['currentEMail'])
            .set('password', this.auth.getToken())
            // .set('Content-Type', 'application/json')
            .set('access_token', this.auth.getToken());
        return headers;
        // req.headers.set('username', JSON.parse(localStorage.getItem("userInfo")).currentEMail);
        // req.headers.set('password', this.auth.getToken());
        // req.headers.set('access_token', this.auth.getToken());
        // req.headers.set('Content-Type', 'application/json');
        // return req.headers;
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
        if (req.url.indexOf('upload/') > 0) {
            return req.clone({
                headers: req.url.indexOf('camunda') < 0 ? this.prepareAuthHeader(req) : this.prepareFileUploadHeader(req),
                withCredentials: req.url.indexOf('camunda') < 0
            });
        } else if (req.url.indexOf('camunda') > 0) {
            if (req.url.includes('carbook-camunda-task-uploader')) {
                return req.clone({
                    headers: this.prepareFileUploadHeader(req),
                    withCredentials: true
                });
            } else {
                return req.clone({
                    headers: req.headers,
                    withCredentials: true
                });
            }
        } else {
            return req.clone({
                headers: this.prepareAuthHeader(req)
            });
        }
    }
}
