import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Constants} from './constants';
import {AuthService} from './auth.service';

@Injectable()
export class TrackingService {
    socket: any;

    constructor(private auth: AuthService) {
    }

    init(listener?) {
        this.socket = io.connect(Constants.CARBOOK_BASE_URL, {path: Constants.VEHICLE_TRACKING_SOCKET_URL, forceNew: true});
        this.socket.on('connect', listener);
        this.socket.on('disconnect', function () {
            console.log('Socket Disconnected!');
        });
        this.socket.on('cidaasFailure', () => {
            console.error('Error from CIDAAS');
        });
    }

    joinChannel(vehicleId) {
        console.log('Join server for', vehicleId);
        this.socket.emit('joinserver', {access_token: this.auth.getToken(), clientType: 'WEB', subscribe: [{cIds: vehicleId, channelType: 'VEHICLE'}]});
    }

    startTracking(vehicleId, listener) {
        console.log('Connected ', this.socket.connected);
        if (!this.socket.connected) {
            this.init();
            this.joinChannel([vehicleId]);
        }
        this.socket.on(vehicleId, listener);
    }

    stopTracking(vehicleId, listener?) {
        console.log('Stop Tracking', vehicleId);
        if (this.socket) {
            this.socket.off();
            this.socket.emit('leaveServer', {cIds: vehicleId, channelType: 'VEHICLE'});
        }
    }

    disconnectSocket() {
        console.log('Disconnect Socket');
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}
