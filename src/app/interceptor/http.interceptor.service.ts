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
    @Cache({ pool: 'Session' }) userSession: any;
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

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });
      return next.handle(request);
    }
  }