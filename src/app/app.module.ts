
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* App Root */
import { AppComponent } from './app.component';

/* Feature Modules */
// import { HomeModule } from './home/home.module';
// import { GreetingModule } from './greeting/greeting.module';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import { GreetingComponent } from './greeting/greeting.component';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatMenuModule,
    HttpClientXsrfModule.withOptions({
      headerName: 'x-xsrf-token'
    }),
    // HomeModule,
    // GreetingModule.forRoot({userName: 'Jugg'}),
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    AboutComponent,
    GreetingComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
