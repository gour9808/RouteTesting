import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class ObservableCache {
    private messageSource = new BehaviorSubject<any>({});

    get() {
        return this.messageSource.asObservable();
    }
    set(object) {
        this.messageSource.next(object);
    }

}
