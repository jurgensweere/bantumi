import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { House } from '../house';
import { Store } from '../store';

@Component({
    selector: 'app-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
    player1: Player;
    player2: Player;
    currentPlayer: Player;
    seedsToPlant: number;
    error: String;

    constructor() {
    }

    ngOnInit() {
        this.setup();
    }

    setup(): void {
        this.player1 = new Player(1, 'Player 1');
        this.player2 = new Player(2, 'Player 2');
        this.currentPlayer = this.player1;
        this.seedsToPlant = 0;
    }

    endTurn(): void {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
        if (this.currentPlayer === this.player2) {
            setTimeout(() => {
                this.playAITurn();
            }, 1000);
        }
    }

    playHouse(house: House): void {
        if (this.currentPlayer !== this.player1) {
            this.error = 'It is not your turn';
            return;
        }
        if (house.seed <= 0) {
            this.error = 'Cannot play while 0';
            return;
        }
        this.plantSeeds(house);
    }

    plantSeeds(house: House): void {
        this.seedsToPlant = house.seed;
        house.seed = 0;

        while (this.seedsToPlant > 0) {
            // Move to the next house
            house = this.nextHouse(house);
            // And plant
            house.seed += 1;
            this.seedsToPlant --;
        }

        this.endTurnCheck(house);
    }

    endTurnCheck(endedIn: House): void {
        // If we end in our own empty house, we can take the seeds and those of the opponent
        if (!(endedIn instanceof Store) && endedIn.seed === 1 && endedIn.owner === this.currentPlayer) {
            this.currentPlayer.store.seed += endedIn.seed;
            endedIn.seed = 0;
            const opponent: Player = this.currentPlayer === this.player1 ? this.player2 : this.player1;
            this.currentPlayer.store.seed += opponent.houses[5 - endedIn.id].seed;
            opponent.houses[5 - endedIn.id].seed = 0;
        }

        // If one player has all empty houses, the game ends
        if (this.isGameEnded()) {
            this.processEndGame();
            return;
        }

        // If player ended in own store, player gets another turn
        if (!(endedIn instanceof Store) || endedIn.owner !== this.currentPlayer) {
            this.endTurn();
        } else if (this.currentPlayer === this.player2) {
            // If AI can play again, play again
            this.playAITurn();
        }
    }

    nextHouse(house: House): House {
        // If this is a store, return the first house of next player
        if (house instanceof Store) {
            const otherPlayer: Player = house.owner.id === 1 ? this.player2 : this.player1;
            return otherPlayer.houses[0];
        }
        // Last house of player, return store instead
        if (house.id === 5) {
            return house.owner.store;
        }
        // return next house
        return house.owner.houses[house.id + 1];
    }

    playAITurn(): void {
        // fetch a random empty house
        const emptyHouses = [];
        for (let i = 0; i < this.currentPlayer.houses.length; i++) {
            if (this.currentPlayer.houses[i].seed > 0) {
                emptyHouses.push(this.currentPlayer.houses[i]);
            }
        }
        // And play it
        this.plantSeeds(emptyHouses[Math.floor(Math.random() * emptyHouses.length)]);
    }

    isGameEnded(): boolean {
        let player1Empty = true;
        let player2Empty = true;
        for (let i = 0; i < this.player1.houses.length; i++) {
            if (this.player1.houses[i].seed > 0) {
                player1Empty = false;
                break;
            }
        }
        for (let i = 0; i < this.player2.houses.length; i++) {
            if (this.player2.houses[i].seed > 0) {
                player2Empty = false;
                break;
            }
        }
        return player1Empty || player2Empty;
    }

    processEndGame(): void {
        for (let i = 0; i < this.player1.houses.length; i++) {
            this.player1.store.seed += this.player1.houses[i].seed;
            this.player1.houses[i].seed = 0;
        }
        for (let i = 0; i < this.player2.houses.length; i++) {
            this.player2.store.seed += this.player2.houses[i].seed;
            this.player2.houses[i].seed = 0;
        }
        if (this.player1.store.seed === this.player2.store.seed) {
            this.error = 'Draw!';
        } else {
            const winner = this.player1.store.seed > this.player2.store.seed ? this.player1 : this.player2;
            this.error = winner.name + ' wins!';
        }
    }
}
