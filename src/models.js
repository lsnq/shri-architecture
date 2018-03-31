import {store} from "./store";

class Model {
    constructor(name, defaultValue) {
        if (typeof name !== 'string') {
            throw new Error('Имя модели должно быть строкой')
        }

        this._name = name;
        this._state = defaultValue;

        this.init();
    }

    init() {
        store.state[this._name] = this._state;
        store.subscribe(this);
    }

    setState() {
        const newState = store.getState()[this._name];
        if (newState !== this._state) {
            this._state = newState;
            return this.update();
        }
    }

    update() {
        console.log(`${this._name} updated`);
        return true;
    }
}

class LogModel extends Model {
    constructor() {
        super('log', []);
    }
    update() {
        console.log('lasers activated', this._state)

    }
}

export const log = new LogModel();

