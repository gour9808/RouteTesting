/**
 *
 *  MIT License

 Copyright (c) 2017 7leads GmbH

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
// This service is based on the `ng2-cookies` package which sadly is not a service and does
// not use `DOCUMENT` injection and therefore doesn't work well with AoT production builds.
// Package: https://github.com/BCJTI/ng2-cookies
import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

@Injectable()
export class CookieService {
    private documentIsAccessible: boolean;

    constructor(// The type `Document` may not be used here. Although a fix is on its way,
                // we will go with `any` for now to support Angular 2.4.x projects.
                // Issue: https://github.com/angular/angular/issues/12631
                // Fix: https://github.com/angular/angular/pull/14894
                @Inject(DOCUMENT) private document: any) {
        // To avoid issues with server side prerendering, check if `document` is defined.
        this.documentIsAccessible = document !== undefined;
    }

    /**
     * @param name Cookie name
     * @returns {boolean}
     */
    check(name: string): boolean {
        if (!this.documentIsAccessible) {
            return false;
        }

        name = encodeURIComponent(name);

        const regExp: RegExp = this.getCookieRegExp(name);
        const exists: boolean = regExp.test(this.document.cookie);

        return exists;
    }

    /**
     * @param name Cookie name
     * @returns {any}
     */
    get(name: string): string {
        if (this.documentIsAccessible && this.check(name)) {
            name = encodeURIComponent(name);

            const regExp: RegExp = this.getCookieRegExp(name);
            const result: RegExpExecArray = regExp.exec(this.document.cookie);

            return decodeURIComponent(result[1]);
        } else {
            return '';
        }
    }

    /**
     * @returns {}
     */
    getAll(): {} {
        if (!this.documentIsAccessible) {
            return {};
        }

        const cookies: {} = {};
        const document: any = this.document;

        if (document.cookie && document.cookie !== '') {
            const split: Array<string> = document.cookie.split(';');

            for (let i = 0; i < split.length; i += 1) {
                const currentCookie: Array<string> = split[i].split('=');

                currentCookie[0] = currentCookie[0].replace(/^ /, '');
                cookies[decodeURIComponent(currentCookie[0])] = decodeURIComponent(currentCookie[1]);
            }
        }

        return cookies;
    }

    /**
     * @param name    Cookie name
     * @param value   Cookie value
     * @param expires Number of days until the cookies expires or an actual `Date`
     * @param path    Cookie path
     * @param domain  Cookie domain
     * @param secure  Secure flag
     */
    set(name: string,
        value: string,
        expires?: number | Date,
        path?: string,
        domain?: string,
        secure?: boolean): void {
        if (!this.documentIsAccessible) {
            return;
        }

        let cookieString: string = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';

        if (expires) {
            if (typeof expires === 'number') {
                const dateExpires: Date = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);

                cookieString += 'expires=' + dateExpires.toUTCString() + ';';
            } else {
                cookieString += 'expires=' + expires.toUTCString() + ';';
            }
        }

        if (path) {
            cookieString += 'path=' + path + ';';
        }

        if (domain) {
            cookieString += 'domain=' + domain + ';';
        }

        if (secure) {
            cookieString += 'secure;';
        }

        this.document.cookie = cookieString;
    }

    /**
     * @param name   Cookie name
     * @param path   Cookie path
     * @param domain Cookie domain
     */
    delete(name: string, path?: string, domain?: string): void {
        if (!this.documentIsAccessible) {
            return;
        }

        this.set(name, '', -1, path, domain);
    }

    /**
     * @param path   Cookie path
     * @param domain Cookie domain
     */
    deleteAll(path?: string, domain?: string): void {
        if (!this.documentIsAccessible) {
            return;
        }

        const cookies: any = this.getAll();

        for (const cookieName in cookies) {
            if (cookies.hasOwnProperty(cookieName)) {
                this.delete(cookieName, path, domain);
            }
        }
    }

    /**
     * @param name Cookie name
     * @returns {RegExp}
     */
    private getCookieRegExp(name: string): RegExp {
        const escapedName: string = name.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/ig, '\\$1');

        return new RegExp('(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)', 'g');
    }
}
