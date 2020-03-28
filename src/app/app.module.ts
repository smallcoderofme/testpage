import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { AuthTagComponent } from './auth/auth.tag.component';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from './auth.service';
import { AuthPostComponent } from './auth/auth.post.component';
import { AuthLoginComponent } from './auth/auth.login.component';
import { Globals } from './globals';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogComponent,
    AboutComponent,
    AuthTagComponent,
    AuthPostComponent,
    AuthLoginComponent,
    BlogCreateComponent,
    BlogDetailComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      headerName: 'X-XSRF-TOKEN'
    }),
    FormsModule,
    CKEditorModule
  ],
  providers: [AuthService, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
