import {store} from "./store";

const logEvent = (message, strong) => {
    const logContainer = document.querySelector('.log');
    const logItem = document.createElement(strong ? 'strong' : 'span');
    logItem.textContent = `${Number(new Date())}: ${message}`;
    console.log(message);
    logContainer.appendChild(logItem);
    logContainer.scrollTo(0,logContainer.scrollHeight)
};

const sendToServer = (data) => {
    const response = {detail: data};
    logEvent('sendToServer: Данные отправлены на сервер');

    setTimeout(() => {
        logEvent('sendToServer: Сервер вернул данные');
        store.dispatch({
            type: 'RECEIVE_DATA',
            data: response.detail
        });
    }, Math.random() * 500)

};

export  {logEvent, sendToServer};