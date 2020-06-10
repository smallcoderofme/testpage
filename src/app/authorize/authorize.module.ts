import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeRoutingModule } from './authorize.routing.module';
import { AuthorizeComponent } from './authorize.component';
import { AuthorizeLoginComponent } from './authorize.login.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AuthorizeCreatePostComponent } from './authorize.create.post.component';
import { LoginGuard } from './LoginGuard';
// import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [ AuthorizeComponent, AuthorizeLoginComponent, AuthorizeCreatePostComponent ],
  imports: [
    CommonModule, AuthorizeRoutingModule, FormsModule,  CKEditorModule
  ],//ModalModule.forRoot(),
  providers: [ LoginGuard ]
})
export class AuthorizeModule { }
