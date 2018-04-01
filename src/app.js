import {ReceiverModel, SenderModel} from "./models";

class App {
    setViews() {
        this.sender = new SenderModel();
        this.receiver = new ReceiverModel();
    }
    render() {
        this.setViews();
    }
}

const app = new App();
app.render();
