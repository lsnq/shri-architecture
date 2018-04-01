import {store} from "./store";
import {sendToServer, logEvent} from "./utils";

/**
 * Базовый класс модели
 * @constructor
 */
class Model {
    /**
     * @param {string} name - Название модели.
     * @param {*} defaultValue - Состояние в хранилище по умолчанию.
     */
    constructor(name, defaultValue = '') {
        try {
            this._name = name;
            this._state = defaultValue;
            this.init();
        } catch(err) {
            throw new Error(err)
        }
    }

    /** Во время инициализации модель создает в хранилище место
     * для хранения собственного состояния после чего сама
     * себя подписывает на обновления состояния глобального хранилища */
    init() {
        store.state[this._name] = this._state;
        store.subscribe(this);
        logEvent(`Модель ${this._name} инициализирована`);
    }

    getState() {
        return this._state;
    }

    /**
     * Если состояние хранилища обновилось, обновляем локальное состояние модели
     * и вызываем обработчик обновленного состояния.
     */
    setState() {
        const newState = store.getState(this._name);
        if (newState !== this._state) {
            this._state = newState;
            logEvent(`Модель ${this._name} обновила _state`);
            this.willUpdate();
        }
    }

    willUpdate() {
        logEvent(`${this._name} updated`)
    }

}

/**
 * Модель отправителя
 */
class SenderModel extends Model {
    constructor() {
        super('sender');
        this.input = document.querySelector('.view-stub__input');
        this.button = document.querySelector('.view-stub__apply');
        this.button.addEventListener('click', () => {
            const val = this.input.value;
            logEvent('SenderModel: Пытаюсь отправить данные', 1);
            store.dispatch({
                type: 'SEND_DATA',
                data: val
            });
        })
    }

    willUpdate() {
        sendToServer(this.getState());
    }
}
/**
 * Модель получателя
 */
class ReceiverModel extends Model {
    constructor() {
        super('receiver');
        this.node = document.querySelector('.view-stub__label')
    }

    willUpdate() {
        const val = this.getState();
        logEvent('ReceiverModel: Данные получены', 1);
        const label = document.createElement('span');
        const response = document.createElement('strong');
        response.textContent = val;
        label.textContent = val ? 'Сервер принял данные:' : 'Сервер отправил пустой ответ';

        this.node.innerHTML = '';
        this.node.appendChild(label);
        this.node.appendChild(response);
        logEvent('ReceiverModel: Данные выведены на экран', 1);
    }
}


export {ReceiverModel, SenderModel}

