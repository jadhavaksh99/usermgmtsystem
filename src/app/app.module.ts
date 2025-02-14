import { NgModule } from '@angular/core';
import { UserModule } from './user/user.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    UserModule,
    AppRoutingModule,
    BrowserModule,
    MatToolbarModule
    
  ],  
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
