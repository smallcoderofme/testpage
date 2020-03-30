import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { ContactComponent }    from './contact.component';

const routes = [
  { path: '', component: ContactComponent} // 直接初始化模式
  // { path: 'contact', component: ContactComponent} // import 模式
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ContactRoutingModule {}

