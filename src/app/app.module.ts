
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

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GlobalConfig } from './GlobalConfig';

import { PopupService } from './utils/popup.service';
import { PopupComponent } from './utils/popup.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule, // .withServerTransition({ appId: 'serverApp' })
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      headerName: 'Authorization'
    }),
    AppRoutingModule,
    // FormsModule,
    // ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  declarations: [
    PopupComponent,
    AppComponent,
    AboutComponent,
    GreetingComponent,
  ],
  providers: [
    PopupService,
    GlobalConfig
  ],
  entryComponents: [PopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
