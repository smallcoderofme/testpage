import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './author.component';
import { AuthorRoutingModule } from './author-routing.module';



@NgModule({
  declarations: [AuthorComponent],
  imports: [
    AuthorRoutingModule,
    AuthorComponent,
    CommonModule
  ],
  providers: []// authorization service
})
export class AuthorModule { }
