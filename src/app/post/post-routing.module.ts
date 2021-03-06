import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './post.list.component';
import { PostDetailComponent } from './post.detail.component';
// import {AuthorizeEditPostComponent} from '../authorize/authorize.edit.post.component';

const routes: Routes = [
    // { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '',    component: PostListComponent },
    { path: 'list/:id',    component: PostDetailComponent },
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PostRoutingModule {}
