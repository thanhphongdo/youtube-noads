import { Injectable } from '@angular/core';
import { HttpClientBaseService } from '../http/httpclient.base.service';
import { AppConfig } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { VideoInterface } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  constructor(private httpClientBaseService: HttpClientBaseService) { }

  getVideoForHomePage() {
    return this.httpClientBaseService.get(`${AppConfig.localApiHost}/youtube/home`).pipe(map((data: any) => {
      data.videos = data.videos.map(item => this.mapVideo(item));
      return data;
    }));
  }

  mapVideo(data: any): VideoInterface {
    return {
      id: data.videoId,
      thumbnail: data.thumbnail.thumbnails
    }
  }
}
