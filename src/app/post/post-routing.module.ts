import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './post.list.component';
import { PostDetailComponent } from './post.detail.component';

const routes: Routes = [
    // { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '',    component: PostListComponent },
    { path: ':id',    component: PostDetailComponent }
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PostRoutingModule {}