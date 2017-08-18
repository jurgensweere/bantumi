import { Component, Input, OnInit } from '@angular/core';
import { House } from '../house';
import { Player } from '../player';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {
  @Input() house: House;
  @Input() player: Player;

  playerClass: string;

  constructor() { }

  ngOnInit() {
    this.playerClass = 'player' + this.player.id;
  }

}
