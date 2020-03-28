import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { AuthTagComponent } from './auth/auth.tag.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthLoginComponent } from './auth/auth.login.component';
import { AuthPostComponent } from './auth/auth.post.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'post', component: BlogComponent },
  { path: 'post/:postId', component: BlogDetailComponent },
  { path: 'about', component: AboutComponent },
  { path: 'auth/manage/tags', component: AuthTagComponent },
  { path: 'auth/manage/posts', component: AuthPostComponent },
  { path: 'auth/manage/create', component: BlogCreateComponent },
  { path: 'auth', redirectTo: '/auth/manage' },
  { path: 'auth/manage', component: AuthLoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
