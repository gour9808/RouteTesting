import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';


interface CacheContent {
    expiry: number;
    value: any;
}

@Injectable()
export class MemoryCacheService {
    private cache: Map<string, CacheContent> = new Map<string, CacheContent>();
    private inFlightObservables: Map<string, Subject<any>> = new Map<string, Subject<any>>();
    readonly DEFAULT_MAX_AGE = 10000;

    constructor() { }
    /**
     * Gets the value from cache if the key is provided.
     * If no value exists in cache, then check if the same call exists
     * in flight, if so return the subject. If not create a new
     * Subject inFlightObservable and return the source observable.
     */
    get(key: string, fallback?: Observable<any>, maxAge?: number): Observable<any> | Subject<any> {

        if (this.hasValidCachedValue(key)) {
            console.log(`%cGetting from cache ${key}`, 'color: green');
            return Observable.of(this.cache.get(key).value);
        }

        if (!maxAge) {
            maxAge = this.DEFAULT_MAX_AGE;
        }

        if (this.inFlightObservables.has(key)) {
            return this.inFlightObservables.get(key);
        } else if (fallback && fallback instanceof Observable) {
            this.inFlightObservables.set(key, new Subject());
            console.log(`%c Calling api for ${key}`, 'color: purple');
            return fallback.do((value) => { this.set(key, value, maxAge); });
        } else {
            return Observable.throw('Requested key is not available in Cache');
        }

    }

    /**
     * Sets the value with key in the cache
     * Notifies all observers of the new value
     */
    set(key: string, value: any, maxAge: number = this.DEFAULT_MAX_AGE): void {
        this.cache.set(key, { value: value, expiry: Date.now() + maxAge });
        this.notifyInFlightObservers(key, value);
    }

    /**
     * Checks if the a key exists in cache
     */
    has(key: string): boolean {
        return this.cache.has(key);
    }

    /**
     * Publishes the value to all observers of the given
     * in progress observables if observers exist.
     */
    private notifyInFlightObservers(key: string, value: any): void {
        if (this.inFlightObservables.has(key)) {
            const inFlight = this.inFlightObservables.get(key);
            const observersCount = inFlight.observers.length;
            if (observersCount) {
                console.log(`%cNotifying ${inFlight.observers.length} flight subscribers for ${key}`, 'color: blue');
                inFlight.next(value);
            }
            inFlight.complete();
            this.inFlightObservables.delete(key);
        }
    }

    /**
     * Checks if the key exists and   has not expired.
     */
    private hasValidCachedValue(key: string): boolean {
        if (this.cache.has(key)) {
            if (this.cache.get(key).expiry < Date.now()) {
                this.cache.delete(key);
                return false;
            }
            return true;
        } else {
            return false;
        }
    }
}

export class MemoryCacheFactory {
    private static memCacheService: MemoryCacheService = new MemoryCacheService();

    static getStorageService(): MemoryCacheService {
        return MemoryCacheFactory.memCacheService;
    }
}


function cloneDeep(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export const DEFAULT_STORAGE_POOL_KEY = 'salesforce';

export enum StorageType {
    memory,
    sessionStorage,
    localStorage
}


interface IDataCacheStrategy {
    name(): string;
    match(data: any): boolean;
    put(data: any, putStorage: (result: Object) => void): any;
    get(data: any): Object;
}

class RxDataCacheStrategy implements IDataCacheStrategy {
    name() {
        return 'RxDataCacheStrategy';
    }

    match(result: any): boolean {
        return result && result.subscribe;
    }

    put(result: any, putStorage: (data: Object) => void): Observable<any> {
        return result.map(data => {
            putStorage(data);
            return data;
        });
    }

    get(result: any): Object {
        return fromPromise(Promise.resolve(result));
    }
}

class PromiseDataCacheStrategy implements IDataCacheStrategy {
    name() {
        return 'PromiseDataCacheStrategy';
    }

    match(result: any): boolean {
        return result && result.then;
    }

    put(result: any, putStorage: (data: Object) => void): Promise<any> {
        return result.then(data => putStorage(data));
    }

    get(result: any): Object {
        return Promise.resolve(result);
    }
}

class DataCacheStrategyFactory {
    private static factory: DataCacheStrategyFactory = new DataCacheStrategyFactory();
    private dataCacheStrategies: IDataCacheStrategy[];

    static getInstance(): DataCacheStrategyFactory {
        return DataCacheStrategyFactory.factory;
    }

    constructor() {
        this.dataCacheStrategies = [new RxDataCacheStrategy(), new PromiseDataCacheStrategy()];
    }

    put(options: { pool?: string, key: string }, value: any, storage: IStorage) {
        const strategy = this.dataCacheStrategies.find(t => t.match(value));
        if (strategy) {
            return strategy.put(value, (result) => storage.put(options, { type: strategy.name(), result }));
        }
        storage.put(options, value);
        return value;
    }

    get(data: any): Object {
        if (data && data.type) {
            const strategy = this.dataCacheStrategies.find(t => t.name() === data.type);
            if (strategy) {
                return strategy.get(data.result);
            }
        }
        return data;
    }
}

export interface IStorage {
    getAll(pool: string): any;
    get(options: { pool?: string, key: string }): Object;
    put(options: { pool?: string, key: string }, value: Object): any;
    remove(options: { pool?: string, key?: string });
    removeAll();
}

export class WebStorage implements IStorage {
    constructor(private webStorage: Storage) {
    }

    getAll(pool: string) {
        const json = this.webStorage.getItem(pool);
        return json ? JSON.parse(json) : {};
    }

    saveAll(pool: string, storage) {
        this.webStorage.setItem(pool, JSON.stringify(storage));
    }

    get({ pool = DEFAULT_STORAGE_POOL_KEY, key }: { pool?: string, key: string }): Object {
        const storage = this.getAll(pool);
        return storage[key];
    }

    put({ pool = DEFAULT_STORAGE_POOL_KEY, key }: { pool?: string, key: string }, value: Object): any {
        const storage = this.getAll(pool);
        storage[key] = value;
        return this.saveAll(pool, storage);
    }

    remove({ pool = DEFAULT_STORAGE_POOL_KEY, key }: { pool?: string, key?: string }) {
        if (!key) {
            this.webStorage.removeItem(pool);
            return;
        }

        this.put({ pool, key }, null);
    }

    removeAll() {
        this.webStorage.clear();
    }
}

export class MemoryStorage implements IStorage {
    private storage: Map<string, Map<string, Object>>;

    constructor() {
        this.storage = new Map<string, Map<string, Object>>();
    }

    getAll(pool: string): any {
        return this.storage.has(pool) ? this.storage.get(pool) : new Map<string, Object>();
    }

    get({ pool = DEFAULT_STORAGE_POOL_KEY, key }: { pool?: string, key: string }): Object {
        const storage = this.getAll(pool);
        return storage.has(key) ? cloneDeep(storage.get(key)) : null;
    }

    put({ pool = DEFAULT_STORAGE_POOL_KEY, key }: { pool?: string, key: string }, value: Object) {
        if (!this.storage.has(pool)) {
            this.storage.set(pool, new Map<string, Object>());
        }
        (this.storage.get(pool) as any).set(key, cloneDeep(value));
    }

    remove({ pool = DEFAULT_STORAGE_POOL_KEY, key }: { pool?: string, key?: string }) {
        if (!key) {
            this.storage.delete(pool);
            return;
        }

        const poolStorage = this.storage.get(pool);
        if (poolStorage) {
            poolStorage.delete(key);
        }
    }

    removeAll() {
        this.storage = new Map<string, Map<string, Object>>();
    }
}


@Injectable()
export class StorageService {
    sessionStorage: Storage;
    localStorage: Storage;
    memoryStorage: MemoryStorage;
    storages: Map<Object, IStorage>;

    private defaultStorageType: StorageType = StorageType.memory;

    constructor() {
        this.setupStorages();
    }

    setDefaultStorageType(storageType: StorageType): void {
        this.defaultStorageType = storageType;
    }

    getAll({ pool, storageType }: { pool: string, storageType?: StorageType }): any {
        const storage: IStorage = <IStorage>this.storages.get(storageType || this.defaultStorageType);
        return storage.getAll(pool);
    }

    get({ pool, key, storageType }: { pool?: string, key: string, storageType?: StorageType }): Object {
        const data = (this.storages.get(storageType || this.defaultStorageType) as any).get({ pool, key });
        return DataCacheStrategyFactory.getInstance().get(data);
    }

    put({ pool, key, storageType }: { pool?: string, key: string, storageType?: StorageType }, value: Object): any {
        const storage: any = this.storages.get(storageType || this.defaultStorageType);
        return DataCacheStrategyFactory.getInstance().put({ pool, key }, value, storage);
    }

    remove({ pool, key, storageType }: { pool?: string, key?: string, storageType?: StorageType }) {
        return (this.storages.get(storageType || this.defaultStorageType) as any).remove({ pool, key });
    }

    removeAll({ storageType }: { storageType?: StorageType }) {
        return (this.storages.get(storageType || this.defaultStorageType) as any).removeAll();
    }

    private setupStorages() {
        this.storages = new Map<String, IStorage>();
        this.memoryStorage = new MemoryStorage();

        if (window) {
            this.sessionStorage = window.sessionStorage;
            this.localStorage = window.localStorage;
            this.storages.set(StorageType.memory, this.memoryStorage)
                .set(StorageType.sessionStorage, new WebStorage(this.sessionStorage))
                .set(StorageType.localStorage, new WebStorage(this.localStorage));
            return;
        }

        this.storages.set(StorageType.memory, this.memoryStorage)
            .set(StorageType.sessionStorage, this.memoryStorage)
            .set(StorageType.localStorage, this.memoryStorage);
    }
}

export class StorageFactory {
    private static storageService: StorageService = new StorageService();

    static getStorageService(): StorageService {
        return StorageFactory.storageService;
    }
}

/**
 * This is used to cache observable funtions in memory. Default Timeout is 10000 seconds.
 * Usage:
 * @MemCache()
 * getSomeDataFromHTTP()
 * -----------------------
 * @MemCache({key:'myKey'})
 * getSomeDataFromHTTP()
 *
 */
export function MemCache({ key, ttl = 10000 }: { key?: string, ttl?: number } = {}) {

    const memCache = MemoryCacheFactory.getStorageService();
    const getKey = (target: any, method: string, args: Object[]) => {
        // TODO: we can change this code or override object toString method;
        const prefix = key || `${target.constructor.name}.${method}`;
        return `${prefix}:${args.join('-')}`;
    };

    return function (target: any, name: string, methodInfo: any) {
        const method = methodInfo.value;
        const proxy = function (...args) {
            const storeKey = getKey(target, name, args || []);
            const result = method.apply(this, args || []);
            const data = memCache.get(storeKey, result, ttl);
            if (data) {
                return data;
            }
        };

        return {
            value: proxy
        };
    };
}

/**
 * This is used to cache any method in localstorage | memory | sessionStorage based on the value passed in the parameter.
 * Usage:
 * @Cacheable()
 * someFunction()
 * -----------------------
 * @Cacheable({pool:'MyPool'})
 * someFunction()
 * -----------------------
 * @Cacheable({pool:'MyPool',key:'SomeKey',storageType: memory}) // This will cache in memory
 * someFunction()
 */
export function Cacheable({ pool = DEFAULT_STORAGE_POOL_KEY, key, storageType = StorageType.localStorage }:
    { pool?: string, key?: string, storageType?: StorageType } = {}) {

    const storageService = StorageFactory.getStorageService();
    const getKey = (target: any, method: string, args: Object[]) => {
        // TODO: we can change this code or override object toString method;
        const prefix = key || `${target.constructor.name}.${method}`;
        return `${prefix}:${args.join('-')}`;
    };

    return function (target: any, name: string, methodInfo: any) {
        const method = methodInfo.value;

        const proxy = function (...args) {
            const key = getKey(target, name, args || []);
            const data = storageService.get({ pool, key, storageType });
            if (data) {
                return data;
            }

            const result = method.apply(this, args || []);
            return storageService.put({ pool, key, storageType }, result);
        };

        (<any>proxy).cacheEvict = function () {
            storageService.remove({ pool, key });
        };

        return {
            value: proxy
        };
    };
}


/**
 * This is used to cache any variable in localstorage | memory | sessionStorage based on the value passed in the parameter.
 * Usage:
 * @Cache()
 * someVariable:any;
 * -----------------------
 * @Cache({pool:'MyPool'})
 * someVariable:any;
 * -----------------------
 * @Cache({pool:'MyPool',key:'SomeKey',storageType: sessionStorage}) // This will cache in session. Closing tab will clear value.
 * someVariable:any;
 */
export function Cache({ pool = DEFAULT_STORAGE_POOL_KEY, key, storageType = StorageType.localStorage }:
    { pool?: string, key?: string, storageType?: StorageType } = {}) {

    const storageService = StorageFactory.getStorageService();

    return function (target, key): any {
        // property value
        let _val = target[key];

        // property getter
        const getter = function () {
            const data = storageService.get({ pool, key, storageType });
            if (data) {
                return data;
            }
            return storageService.put({ pool, key, storageType }, _val);
        };

        // property setter
        const setter = function (newVal) {
            storageService.put({ pool, key, storageType }, newVal);
            _val = newVal;
        };

        // Create new property with getter and setter
        Object.defineProperty(target, key, {
            configurable: true,
            enumerable: true,
            get: getter,
            set: setter
        });
    };
}

export const STORAGE_PROVIDERS: Array<any> = [
    {
        provide: StorageService,
        useClass: StorageService
    },
];
