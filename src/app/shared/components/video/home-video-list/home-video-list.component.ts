import { Component, OnInit, HostListener, ViewChildren, QueryList } from '@angular/core';
import { SharedDataService } from '../../../../shared/services';
import { HomeVideoItemComponent } from '../home-video-item/home-video-item.component';

@Component({
  selector: 'app-home-video-list',
  templateUrl: './home-video-list.component.html',
  styleUrls: ['./home-video-list.component.scss']
})
export class HomeVideoListComponent implements OnInit {

  @ViewChildren('videoItems') videoItems: QueryList<HomeVideoItemComponent>;

  get homeVideos() {
    return this.sharedDataService.data?.homeData?.videos || [];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.videoItems.toArray().forEach(item => {
      item.autoSize();
    });
  }

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
  }
}
