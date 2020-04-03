import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
  <div class="site container-sm container-lg">
    <app-greeting></app-greeting>
    <div class="nav-bg row">
      <nav class="col-sm-8 col-lg-8 offset-sm-2 offset-lg-2">
        <a routerLink="home" routerLinkActive="active">Home</a>
        <a routerLink="post" routerLinkActive="active">Post</a>
        <a routerLink="contact" routerLinkActive="active">Contact</a>
        <a routerLink="items" routerLinkActive="active">Items</a>
        <a routerLink="customers" routerLinkActive="active">Customers</a>
        <a routerLink="about" routerLinkActive="active">About</a>
      </nav>
    </div>
    <div class="site-content">
      <router-outlet></router-outlet>
    </div>
    <footer class="row footer">
      <div class="col-sm-12 col-lg-12 text-center" style="font-size: 85%;">© Copyrights S6I. All Rights Reserved</div>
      <div class="col-sm-12 col-lg-12 text-center" style="font-size: 85%;">
        <a style="text-decoration: none;" href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">「CC 4.0 BY-SA」</a>
      </div>
      <div class="upper col-sm-12 col-lg-12 text-center" style="font-size: 65%;">powered by angular</div>
    </footer>
  </div>
  `
})
export class AppComponent {
}
