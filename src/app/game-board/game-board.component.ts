import { Component, OnInit } from '@angular/core';
import { Player } from '../player';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  player1: Player;
  player2: Player;

  constructor() {
  }

  ngOnInit() {
    this.setup();
  }

  setup(): void {
    this.player1 = new Player(1, 'Player 1');
    this.player2 = new Player(2, 'Player 2');
  }
}
