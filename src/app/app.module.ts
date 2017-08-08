import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { HouseComponent } from './house/house.component';
import { StoreComponent } from './store/store.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    HouseComponent,
    StoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
