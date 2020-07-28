import { Component, OnInit } from '@angular/core';

import { WebSocketService } from './services/web-socket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public audioTranscription: string;
    public loading: boolean = false;

    constructor(private webSocketService: WebSocketService) { }

    ngOnInit() {
        this.webSocketService.listen('convertedText').subscribe((url: string) => {
            setTimeout(() => {
                console.log(url);
                this.loading = false;
            }, 1000);
        });

        this.webSocketService.listen('error').subscribe((error) => {
            console.error(error);
        });
    }

    public sendText() {
        if (this.audioTranscription) {
            this.loading = true;
            this.webSocketService.emit('sendText', this.audioTranscription);
        }
    }
}
