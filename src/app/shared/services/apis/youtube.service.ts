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

  getVideoUrl(videoId: string) {
    return this.httpClientBaseService.get(`${AppConfig.localApiHost}/youtube/link/${videoId}`);
  }

  mapVideo(data: any): VideoInterface {
    return {
      id: data.videoId,
      thumbnail: data.thumbnail.thumbnails,
      owner: {
        name: data?.ownerText?.runs[0]?.text,
        thumbnailUrl: data?.channelThumbnailSupportedRenderers?.channelThumbnailWithLinkRenderer?.thumbnail?.thumbnails?.[0]?.url
      },
      info: {
        title: data?.title?.runs?.[0]?.text.substr(0, 35) + '...',
        viewCountText: data?.viewCountText?.simpleText,
        timeText: data?.lengthText?.simpleText
      }
    }
  }
}
