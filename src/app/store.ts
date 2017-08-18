import { House } from './house';
import { Player } from './player';

export class Store extends House {
    constructor(seed: number, owner: Player) {
        super(owner.id, seed, owner);
    }
}
