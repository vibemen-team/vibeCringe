import { Component, OnInit } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import {
  RecordRTCPromisesHandler,
  StereoAudioRecorder,
  invokeSaveAsDialog,
} from 'recordrtc';
import * as signalR from '@microsoft/signalr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-menu-info',
  templateUrl: './user-menu-info.component.html',
  styleUrls: ['./user-menu-info.component.css'],
})
export class UserMenuInfoComponent implements OnInit {
  public authService: AuthService;

  connectionListener!: signalR.HubConnection;
  connection!: signalR.HubConnection;

  constructor(authService: AuthService) {
    this.authService = authService;
  }
  async ngOnInit(): Promise<void> {
    let audio = new Audio();
    audio.preload = 'auto';
    audio.autoplay = true;
    audio.play();

    this.connectionListener = new signalR.HubConnectionBuilder()
      // DOCKER URL 'https://localhost:9001/listener'
      // LOCAL URL 'https://localhost:7047/listener'
      .withUrl('https://localhost:9001/listener')
      .build();
    await this.connectionListener.start();
    this.connectionListener.on('send', (data) => {
      let msg = data as VoiceMessage;
      if (msg.key === this.authService.userId) audio.src = msg.value;
    });
  }
  async start() {
    //let token = localStorage.getItem('token');

    // console.log(token);

    this.connection = new signalR.HubConnectionBuilder()
      // DOCKER URL 'https://localhost:7001/streamHub'
      // LOCAL URL 'https://localhost:7047/streamHub'
      .withUrl('https://localhost:7001/streamHub', {
        accessTokenFactory: () => this.authService.token,
      })
      .build();
    await this.connection.start();
    const subject = new signalR.Subject();
    this.connection.send('UploadStream', subject);

    let stream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });

    let recorder = new RecordRTC(stream, {
      type: 'video',
      mimeType: 'audio/wav',
      desiredSampRate: 16000, // accepted sample rate by Azure
      timeSlice: 1000,
      ondataavailable: async (blob) => {
        //PASTE CODE HERE
        // console.log('Slice sended');
        // console.log(blob);

        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async function () {
          var base64data = reader.result;

          var len = base64data as string;
          subject.next(len);
          //audio.src = len;
        };
      },
      recorderType: StereoAudioRecorder,
      numberOfAudioChannels: 1,
    });
    recorder.startRecording();

    //await recorder.stopRecording();
  }

  async streamStr() {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7047/streamHub')
      .build();
    await connection.start();
    const subject = new signalR.Subject();
    connection.send('UploadStream', subject);
    var iteration = 0;
    const intervalHandle = setInterval(() => {
      iteration++;
      subject.next(iteration.toString());
      if (iteration === 10) {
        clearInterval(intervalHandle);
        subject.complete();
      }
    }, 500);
  }
}

export class VoiceMessage {
  key!: string;
  value!: string;
}
