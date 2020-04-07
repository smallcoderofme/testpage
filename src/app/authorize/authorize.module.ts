import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeRoutingModule } from './authoriza.routing.module';
import { AuthorizeComponent } from './authorize.component';

@NgModule({
  declarations: [AuthorizeComponent],
  imports: [
    CommonModule, AuthorizeRoutingModule
  ]
})
export class AuthorizeModule { }
