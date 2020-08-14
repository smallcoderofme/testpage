import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtRoutingModule } from './art-routing.module';
import { ArtComponent } from './art.component';
import { WaterfallComponent } from './waterfall.component';



@NgModule({
  declarations: [
  	WaterfallComponent,
    ArtComponent
  ],
  imports: [
    CommonModule,
    ArtRoutingModule
  ]
})
export class ArtModule { }
