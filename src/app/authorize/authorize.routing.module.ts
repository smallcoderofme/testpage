import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeComponent } from './authorize.component';
import { AuthorizeLoginComponent } from './authorize.login.component';
import { AuthorizeCreatePostComponent } from './authorize.create.post.component';
import { LoginGuard } from './LoginGuard';
import { AuthorizeEditPostComponent } from './authorize.edit.post.component';

const routes: Routes = [
    { path: '', redirectTo: 'manage', pathMatch: 'full'},
    { path: 'manage', component: AuthorizeComponent, canActivate: [ LoginGuard ] },
    { path: 'login', component: AuthorizeLoginComponent },
    { path: 'create_post', component: AuthorizeCreatePostComponent, canActivate: [ LoginGuard ] },
    { path: 'edit_post/:id', component: AuthorizeEditPostComponent, canActivate: [ LoginGuard ] }
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthorizeRoutingModule {}
