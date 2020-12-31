import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { VideoInterface } from '../../../../shared/interfaces';

@Component({
  selector: 'app-home-video-item',
  templateUrl: './home-video-item.component.html',
  styleUrls: ['./home-video-item.component.scss']
})
export class HomeVideoItemComponent implements OnInit, AfterViewInit {

  @Input() videoItem: VideoInterface;
  @ViewChild('videoThumbnail') videoThumbnail: ElementRef;
  thumbnailHeight: number = 0;

  get thumbnailWidth() {
    return this.videoThumbnail?.nativeElement?.offsetWidth
  }

  constructor(public router: Router) { }

  ngOnInit(): void {
    console.log(this.videoItem);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.autoSize();
    }, 100);
  }

  autoSize() {
    this.thumbnailHeight = this.thumbnailWidth * 9 / 16;
  }
}
