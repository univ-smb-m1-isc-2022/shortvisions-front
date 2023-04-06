import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private readonly YoutubeAPIKey = environment.YoutubeApiKey;
  private readonly UPLOAD_URL = 'https://www.googleapis.com/upload/youtube/v3/videos?part=snippet';
  constructor(private httpClient: HttpClient) {}

  uploadVideo(blob: Blob, title: string, description: string) {

    const formData = new FormData();
    formData.append('video', blob, 'video.mp4');
    formData.append('snippet', JSON.stringify({
      title: title,
      description: description
    }));
    console.log('Button Pressed now posting the shit')
    console.log('Title: ' , title)
    console.log('Video Blob',blob)
    console.log('FormData',formData)
    return this.httpClient.post(`${this.UPLOAD_URL}&key=${this.YoutubeAPIKey}`, formData);
  }
}
