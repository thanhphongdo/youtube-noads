import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayRoutingModule } from './play-routing.module';

import { PlayComponent } from './play.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PlayComponent],
  imports: [CommonModule, SharedModule, PlayRoutingModule]
})
export class PlayModule {}
