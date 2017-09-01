import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../player';

@Component({
  selector: '[app-store]',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  @Input() player: Player;

  playerClass;

  constructor() { }

  ngOnInit() {
    this.playerClass = 'player' + this.player.id;
  }

}
