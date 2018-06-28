import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class ToolbarTitleService {

    title: any;
    listener = new BehaviorSubject<any>('');

    getCurrentTitle() {
        return this.title;
    }

    setCurrentTitle(newTitle) {
        this.title = newTitle;
        this.listener.next(this.title);
    }

    onTitleChange() {
        return this.listener;
    }
}
