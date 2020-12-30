import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared/shared-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(public sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.sharedDataService.videoItem = 'HEHE';
  }
}
