import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then(m=> m.HomeModule) },
  { path: 'post', loadChildren: () => import('./post/post.module').then(m=> m.PostModule) },
  // { path: '', redirectTo: 'contact', pathMatch: 'full'},
  // { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m=> m.ContactModule) },
  { path: 'items', loadChildren: () => import('./items/items.module').then(m => m.ItemsModule) },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
