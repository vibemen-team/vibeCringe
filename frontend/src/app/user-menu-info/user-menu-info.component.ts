import { Component } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import {
  RecordRTCPromisesHandler,
  StereoAudioRecorder,
  invokeSaveAsDialog,
} from 'recordrtc';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-user-menu-info',
  templateUrl: './user-menu-info.component.html',
  styleUrls: ['./user-menu-info.component.css'],
})
export class UserMenuInfoComponent {
  async start() {
    let token = localStorage.getItem('token');
    console.log(token);
    // console.log(token);
    // let audio = new Audio();
    // audio.preload = 'auto';
    // audio.autoplay = true;
    // audio.play();
    const connectionListener = new signalR.HubConnectionBuilder()
      // DOCKER URL 'https://localhost:7001/streamHub'
      // LOCAL URL 'https://localhost:7047/streamHub'
      .withUrl('https://localhost:9001/listener')
      .build();
    await connectionListener.start();
    connectionListener.on('send', (data) => {
      console.log(token);
      console.dir(data);
    });

    const connection = new signalR.HubConnectionBuilder()
      // DOCKER URL 'https://localhost:7001/streamHub'
      // LOCAL URL 'https://localhost:7047/streamHub'
      .withUrl('https://localhost:7001/streamHub', {
        accessTokenFactory: () => token as string,
      })
      .build();
    await connection.start();
    const subject = new signalR.Subject();
    connection.send('UploadStream', subject);

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
