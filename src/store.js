import {logEvent} from "./utils";

/** Глобальный класс хранилища. */
class Store {
    constructor() {
        this.state = {};
        this.listeners = [];
        logEvent('Store: Хранилище Store инициализировано');
    }
    /**
     *
     * @param {Model} listener
     */
    subscribe(listener) {
        if (typeof listener.setState !== 'function') {
            throw new Error('Подписчик должен уметь подписываться');
        }
        this.listeners = [...this.listeners, listener];
    }

    dispatch(payload) {
        logEvent(`Store: Вызван диспетчер ${payload.type}`);
        let name;
        switch (payload.type) {
            case 'SEND_DATA':
                name = 'sender';
                break;
            case 'RECEIVE_DATA':
                name = 'receiver';
                break;
            default:
                return false;
        }
        if (this.getState(name) !== payload.data) {
            this.setState(name, payload.data);
            logEvent(`Dispatch: Отправляю новое состояние подписчикам`);
            this.listeners.forEach((listener) => {
                listener.setState(this.state)
            });
        } else {
            logEvent('Store: Данные не были изменены. Ничего не происходит')
        }
        return this.getState();
    }

    setState(model, value) {
        logEvent(`Dispatch: Обновляю ${model}`);
        this.state[model] = value;
    }

    getState(name) {
        return name ? this.state[name] : this.state;
    }
}

/** Экспортирую инстанс хранилища */
export const store = new Store();