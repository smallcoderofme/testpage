import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorComponent } from './author.component';
import { AuthorLoginComponent } from './author.login.component';

const routes: Routes = [
   {
       path: '',
       component: AuthorComponent,
       children: [
            { path: 'authorization/login', component: AuthorLoginComponent }
       ]
   }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthorRoutingModule {}
