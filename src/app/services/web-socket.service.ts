import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private socket: any;
    private uri: string = 'ws://localhost:7777';

    constructor() {
        this.socket = io(this.uri);
    }

    public listen(eventName: string) {
        return new Observable((subscriber) => {
            this.socket.on(eventName, (data: any) => {
                subscriber.next(data);
            });
        });
    }

    public emit(eventName: string, data: any) {
        this.socket.emit(eventName, data);
    }
}
