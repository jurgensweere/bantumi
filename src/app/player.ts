import { House } from './house';
import { Store } from './store';

export class Player {
    id: number;
    name: string;
    houses: House[];
    store: House;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.houses = [];
        // Create 6 houses
        for (let i = 0; i < 6; i++) {
            this.houses.push(new House(i, 4, this));
        }
        // Create 1 store
        this.store = new Store(0, this);
    }
}
