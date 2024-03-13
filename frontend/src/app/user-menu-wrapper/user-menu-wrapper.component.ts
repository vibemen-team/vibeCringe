import { Component, ElementRef, ViewChild } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-menu-wrapper',
  templateUrl: './user-menu-wrapper.component.html',
  styleUrls: ['./user-menu-wrapper.component.css'],
})
export class UserMenuWrapperComponent {
  connection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7001/streamHub', {
      accessTokenFactory: () => this.authService.token,
    })
    .build();
  mediaRecorder!: MediaRecorder;
  subject = new signalR.Subject();
  segmentLimit = 20000;
  webm9MimeCodec = 'video/webm;codecs="vp9"';
  @ViewChild('videostreamsource') videoSource!: ElementRef<HTMLMediaElement>;
  //////////////////////// Target

  connectionTarget = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7001/streamHub', {
      accessTokenFactory: () => this.authService.token,
    })
    .build();
  @ViewChild('zxc') videoTarget!: ElementRef<HTMLMediaElement>;
  channel = this.channelFactory();
  mediaSource = new MediaSource();
  //sourceBuffer!: SourceBuffer;

  constructor(private authService: AuthService) {
    this.connectionTarget.start().then(() => {
      this.mediaSource.addEventListener('sourceopen', async () => {
        let sourceBuffer = this.mediaSource.addSourceBuffer(
          this.webm9MimeCodec
        );
        sourceBuffer.mode = 'sequence';
        sourceBuffer.addEventListener('updateend', async () => {
          if (this.videoTarget.nativeElement.paused)
            this.videoTarget.nativeElement.play();
          let ab = await this.channel.pull();
          sourceBuffer.appendBuffer(ab as Uint8Array);
        });
        let ab = await this.channel.pull();
        console.log(sourceBuffer);
        sourceBuffer.appendBuffer(ab as Uint8Array);
      });
      this.videoTarget.nativeElement.src = URL.createObjectURL(
        this.mediaSource
      );
    });
    this.start();

    /////////////////////////Source
  }
  async startVideo() {
    // this.connection.start().then(() => {
    this.connectionTarget.send('SendVideoData', this.subject);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        this.videoSource.nativeElement.srcObject = stream;
        this.videoSource.nativeElement.play();
        this.mediaRecorder = new MediaRecorder(stream, {
          mimeType: this.webm9MimeCodec,
        });
        this.mediaRecorder.ondataavailable =
          this.handleDataAvailable.bind(this);
        this.mediaRecorder.start();
        setInterval(() => this.mediaRecorder.requestData(), 200);
      });
    // });
  }

  async handleDataAvailable(event: any) {
    var base64js = require('base64-js');
    const ab = await event.data.arrayBuffer();
    const bytes = new Uint8Array(ab);
    const ab64 = base64js.fromByteArray(bytes);

    // console.dir(event);

    if (ab64.length <= this.segmentLimit) {
      this.subject.next({ index: 0, part: ab64 });
    } else {
      for (let i = 0, ii = 0; i < ab64.length; i += this.segmentLimit, ii++) {
        this.subject.next({
          index: ii,
          part: ab64.substr(i, this.segmentLimit),
        });
      }
    }
  }
  channelFactory() {
    const _arrayBufferBuffer: any[] = [];
    const pullResolveQueue: any[] = [];

    return {
      push: (ab: any) => {
        if (pullResolveQueue.length > 0) {
          const pull = pullResolveQueue.pop();
          pull(ab);
        } else {
          _arrayBufferBuffer.push(ab);
        }
      },
      pull: () =>
        new Promise((res, rej) => {
          if (_arrayBufferBuffer.length > 0) {
            res(_arrayBufferBuffer.pop());
          }
          pullResolveQueue.push(res);
        }),
    };
  }
  async start() {
    var lastIndex = -1;
    var partBuffer: any[] = [];
    var playing = false;
    var base64js = require('base64-js');

    this.connectionTarget.on('video-data', async (r) => {
      if (r.part.length === 0) {
        return;
      }

      if (!playing && r.index !== 0) {
        return;
      }
      playing = true;

      if (lastIndex >= r.index) {
        var enc = new TextEncoder();
        //const ba = enc.encode(window.atob(partBuffer.reduce((a, b) => a + b)));
        const ba = base64js.toByteArray(partBuffer.reduce((a, b) => a + b));
        this.channel.push(ba.buffer);
        partBuffer = [];
      }

      partBuffer.push(r.part);

      lastIndex = r.index;
    });
  }
}
