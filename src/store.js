class Store {
    constructor() {
        this.state = {};
        this.listeners = [];
        console.log('store initiated');
    }

    subscribe(listener) {
        this.listeners = [...this.listeners, listener];
    }

    dispatch(payload) {
        switch (payload.type) {
            case 'SEND_DATA':
                this.setState('send', payload.data);
                break;
            case 'LOG_DATA':
                this.setState('log', [...this.state['log'], payload.data]);
                break;
            case 'RECEIVE_DATA':
                this.setState('send', payload.data);
                break;
            default:
                break;
        }

        this.listeners.forEach((listener) => {
            listener.setState(this.state)
        })
    }

    setState(model, value) {
        this.state[model] = value;
    }

    getState() {
        return this.state;
    }
}

export const store = new Store({});