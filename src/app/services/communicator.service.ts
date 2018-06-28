import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";
import { BehaviorSubject } from 'rxjs';

interface Message {
    channel: string;
    data: any;
}

@Injectable()
export class CommunicatorService {
    events: Observable<{}>;
    eventsSubject: any;
    listeners: {};
    constructor() {
        this.listeners = {};
        this.eventsSubject = new BehaviorSubject<any>({});
        this.events = Observable.from(this.eventsSubject);
        this.events.subscribe((params: { name, args }) => {
            if (this.listeners[params.name]) {
                for (let listener of this.listeners[params.name]) {
                    listener(...params.args);
                }
            }
        });
    }

    on(name, listener) {
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }
        this.listeners[name].push(listener);
    }

    broadcast(name, ...args) {
        this.eventsSubject.next({
            name,
            args
        });
    }

}
