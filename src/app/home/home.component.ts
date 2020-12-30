import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService, YoutubeService } from '../shared/services/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    public sharedDataService: SharedDataService,
    private youtubeService: YoutubeService
  ) { }

  ngOnInit(): void {
    this.youtubeService.getVideoForHomePage().subscribe(data => {
      this.sharedDataService.data.homeData = data;
    }, err => {
      console.log(err);
    });
  }

}
