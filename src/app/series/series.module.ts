import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesRoutingModule } from './series.routing.module';
import { SeriesListComponent } from './series.list.component';



@NgModule({
  declarations: [ SeriesListComponent ],
  imports: [
    CommonModule,
    SeriesRoutingModule
  ]
})
export class SeriesModule { }
