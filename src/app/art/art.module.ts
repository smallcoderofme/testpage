import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtRoutingModule } from './art-routing.module';
import { ArtComponent } from './art.component';
import { WaterfullComponent } from './waterfull.component';



@NgModule({
  declarations: [
  	WaterfullComponent,
    ArtComponent
  ],
  imports: [
    CommonModule,
    ArtRoutingModule
  ]
})
export class ArtModule { }
