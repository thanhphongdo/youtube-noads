import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components';
import { SearchComponent } from './components';
import { HeaderComponent } from './components';
import { HomeVideoItemComponent, HomeVideoListComponent } from './components'

import { WebviewDirective } from './directives/';

import { SharedDataService, HttpClientBaseService, YoutubeService } from './services/index';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    SearchComponent,
    HeaderComponent,
    WebviewDirective,
    HomeVideoItemComponent,
    HomeVideoListComponent
  ],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    SearchComponent,
    HeaderComponent,
    HomeVideoItemComponent,
    HomeVideoListComponent
  ],
  providers: [
    SharedDataService,
    HttpClientBaseService,
    YoutubeService
  ]
})
export class SharedModule { }
