import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../service/dashboard.service";
import {UserService} from "../../../../globalService/user.service";
import {Router} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {YoutubeService} from "../../../../globalService/youtube.service";

@Component({
  selector: 'app-final-video',
  templateUrl: './final-video.component.html',
  styleUrls: ['./final-video.component.scss']
})
export class FinalVideoComponent implements OnInit {

  video!: Blob;
  videoUrl!: SafeResourceUrl;

  videoName!:string;
  videoDescription!:string;
  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private userService: UserService,
    private domSanitizer: DomSanitizer,
    private YoutubeService: YoutubeService,
  ) {
  }

  ngOnInit(): void {
    this.dashboardService.getVideo(
      this.userService.getUser().id as number,
      this.dashboardService.getProjectByUrl() ).subscribe((base64Video: any) => {
      const videoBlob = this.base64ToBlob(base64Video, 'video/mp4');
      this.video = videoBlob;
      this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(videoBlob));
    });
  }

  base64ToBlob(base64: string, type: string) {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {type});
    return blob;
  }
  pushToYoutube(){
    this.YoutubeService.uploadVideo(this?.video, this?.videoName,this?.videoDescription)
  }

}

