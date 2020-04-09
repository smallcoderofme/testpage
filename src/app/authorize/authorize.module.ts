import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeRoutingModule } from './authorize.routing.module';
import { AuthorizeComponent } from './authorize.component';
import { AuthorizeLoginComponent } from './authorize.login.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ AuthorizeComponent, AuthorizeLoginComponent ],
  imports: [
    CommonModule, AuthorizeRoutingModule, FormsModule
  ]
})
export class AuthorizeModule { }
