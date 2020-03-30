import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
  <div class="main-container">
    <app-greeting></app-greeting>
    <nav>
      <a routerLink="home" routerLinkActive="active">Home</a>
      <a routerLink="post" routerLinkActive="active">Post</a>
      <a routerLink="contact" routerLinkActive="active">Contact</a>
      <a routerLink="items" routerLinkActive="active">Items</a>
      <a routerLink="customers" routerLinkActive="active">Customers</a>
    </nav>
    <router-outlet></router-outlet>
    <footer class="footer upper">
    <div style="font-size: 85%;">© Copyrights S6I. All Rights Reserved</div>
    <div style="font-size: 85%;">
      <a href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">「CC 4.0 BY-SA」</a>
    </div>
    <div class="upper" style="font-size: 65%;">powered by angular</div>
    </footer>
  </div>
  `
})
export class AppComponent {
}
