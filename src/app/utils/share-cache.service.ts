import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';

@Injectable()
export class ShareCacheService {

    private cache = [];

    constructor() {
    }

    setCache(key, data) {
        this.cache[key] = this.cache[key] ? this.cache[key] : new BehaviorSubject<any>({});
        this.cache[key].next(data);
    }

    getCache(key) {
        console.log('In cache', this.cache[key]);
        this.cache[key] = this.cache[key] ? this.cache[key] : new BehaviorSubject<any>({});
        return this.cache[key];
    }

}
