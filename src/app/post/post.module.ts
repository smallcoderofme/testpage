import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { PostListComponent } from './post.list.component';
import { PostDetailComponent } from './post.detail.component';



@NgModule({
  declarations: [
    PostListComponent,
    PostDetailComponent ],
  imports: [
    CommonModule,
    PostRoutingModule
  ]
})
export class PostModule { }
