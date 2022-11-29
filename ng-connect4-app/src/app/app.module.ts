import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GameAeraComponent } from './game-aera/game-aera.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AeraComponent } from './game-aera/aera/aera.component';
import { GameDirective } from './game-aera/game.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameAeraComponent,
    PageNotFoundComponent,
    AeraComponent,
    GameDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
