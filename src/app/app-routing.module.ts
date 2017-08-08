import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameBoardComponent }   from './game-board/game-board.component';

const routes: Routes = [
  { path: '', redirectTo: '/game', pathMatch: 'full' },
  { path: 'game',  component: GameBoardComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}