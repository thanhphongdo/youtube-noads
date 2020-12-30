import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../../../shared/services'

@Component({
  selector: 'app-home-video-list',
  templateUrl: './home-video-list.component.html',
  styleUrls: ['./home-video-list.component.scss']
})
export class HomeVideoListComponent implements OnInit {

  get homeVideos() {
    return this.sharedDataService.data?.homeData?.videos || [];
  }

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
  }
}
