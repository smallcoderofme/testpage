import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeComponent } from './authorize.component';
import { AuthorizeLoginComponent } from './authorize.login.component';
import { AuthorizeCreatePostComponent } from './authorize.create.post.component';
const routes: Routes = [
    { path: '', redirectTo: 'manage', pathMatch: 'full'},
    { path: 'manage',    component: AuthorizeComponent },
    { path: 'login',    component: AuthorizeLoginComponent },
    { path: 'create_post', component: AuthorizeCreatePostComponent }
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthorizeRoutingModule {}
