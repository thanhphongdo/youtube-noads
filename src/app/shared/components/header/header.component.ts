import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared/shared-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.sharedDataService.videoItem = 'HEHE';
  }
}
