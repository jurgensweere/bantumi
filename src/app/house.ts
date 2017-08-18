import { Player } from './player';

export class House {
    id: number;
    seed: number;
    owner: Player;

    constructor(id: number, seed: number, owner: Player) {
        this.id = id;
        this.seed = seed;
        this.owner = owner;
    }
}
