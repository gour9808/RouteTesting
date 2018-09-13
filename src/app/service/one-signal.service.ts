import {UserService} from './user.service';
import {Injectable} from '@angular/core';
import {Cache} from '../utils/storage.provider';
import {Constants} from './constants';

let OneSignal;


@Injectable()
export class OneSignalService {
    @Cache({pool: 'OneSignal'}) oneSignalInit;
    @Cache({pool: 'OneSignal'}) oneSignalId: any;

    constructor(private userService: UserService) {
        console.log('OneSignal Service Init', this.oneSignalInit);
    }

    public init() {
        this.oneSignalInit ? console.log('Already Initialized') : this.initOneSignal();
    }

    // prod : 554be85f-2ab4-4f4f-8307-3cd01e92a753
    initOneSignal() {
        OneSignal = window['OneSignal'] || [];
        OneSignal.sendTag('user_id', this.userService.getUserId(), function (tagsSent) {
            // Callback called when tags have finished sending
            console.log('OneSignal Tag Sent', tagsSent);
        });
        console.log('Init OneSignal');
        OneSignal.push(['init', {
            appId: Constants.ONE_SIGNAL_APP_ID,
            safari_web_id: Constants.ONE_SIGNAL_APP_ID_SAFARI,
            autoRegister: true,
            allowLocalhostAsSecureOrigin: true,
            notifyButton: {
                enable: false
            }
        }]);
        console.log('OneSignal Initialized');
        this.checkIfSubscribed();
    }

    subscribe() {
        OneSignal.push(() => {
            console.log('Register For Push');
            OneSignal.push(['registerForPushNotifications'])
            OneSignal.on('subscriptionChange', (isSubscribed) => {
                console.log('The user\'s subscription state is now:', isSubscribed);
                this.listenForNotification();
                OneSignal.getUserId().then((userId) => {
                    console.log('User ID is', userId);
                    this.oneSignalId = userId;
                    this.setOneSignal();
                });
            });
        });
    }

    listenForNotification() {
        console.log('Initalize Listener');
        OneSignal.on('notificationDisplay', (event) => {
            console.log('OneSignal notification displayed:', event);
            this.listenForNotification();
        });
    }

    getUserID() {
        OneSignal.getUserId().then((userId) => {
            console.log('User ID is', userId);
            this.oneSignalId = userId;
            this.userService.getOneSignalId().indexOf(this.oneSignalId) > -1 ? this.setOneSignal() : console.log('OneSignal ID registered');
        });
    }

    checkIfSubscribed() {
        OneSignal.push(() => {
            /* These examples are all valid */
            OneSignal.isPushNotificationsEnabled((isEnabled) => {
                if (isEnabled) {
                    console.log('Push notifications are enabled!');
                    this.getUserID();
                } else {
                    console.log('Push notifications are not enabled yet.');
                    this.subscribe();
                }
            }, error => {
                console.log('Push permission not granted');
            });
        });
    }

    setOneSignal() {
        this.userService.setUserOneSignalId(this.userService.getUserId(), this.oneSignalId).subscribe(res => {
            console.log('Updated OneSignal ID');
            this.oneSignalInit = true;
        }, err => {
            if (err.status === 409) {
                console.log('One Signal Exists probably');
                this.oneSignalInit = true;
            }
        });
    }
}
