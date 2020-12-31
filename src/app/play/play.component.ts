import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedDataService, YoutubeService } from '../shared/services/index';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  videoId: string;
  videos: Array<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public sharedDataService: SharedDataService,
    private youtubeService: YoutubeService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.videoId = params.videoId;
      this.getVideoUrl();
    });
  }

  ngOnInit(): void {

  }

  getVideoUrl() {
    this.youtubeService.getVideoUrl(this.videoId).subscribe((videos: any) => {
      this.videos = videos;
    }, err => { })
  }

}
