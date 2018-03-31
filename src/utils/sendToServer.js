function sendToServer(data) {
    console.log(data);

    const event = new CustomEvent('dataIsSent', { detail: data });
    document.dispatchEvent(event);
}

function test() {
    document.addEventListener('dataIsSent', function(event) {
        console.log('event got ' + event.detail);
    });
    sendToServer('mim');
}


export {sendToServer, test};


// Пример обработки события dataIsSent. Рекомендуется изменить API модуля так,
// чтобы вызова события через document не было

