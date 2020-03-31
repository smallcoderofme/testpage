
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* App Root */
import { AppComponent } from './app.component';

/* Feature Modules */
import { HomeModule } from './home/home.module';
import { GreetingModule } from './greeting/greeting.module';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [
    BrowserModule,
    HomeModule,
    GreetingModule.forRoot({userName: 'Jugg'}),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AboutComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
