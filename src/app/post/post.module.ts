import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { PostListComponent } from './post.list.component';
import { PostDetailComponent } from './post.detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostComponent } from './post.component';


@NgModule({
  declarations: [
    PostComponent,
    PostListComponent,
    PostDetailComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostRoutingModule
  ]
})
export class PostModule { }
