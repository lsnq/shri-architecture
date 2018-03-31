import {store} from "./store";
import {log} from "./models";


// вот так мы будем отправлять информацию
window.store = store;

// store.dispatch({
//     type: 'LOG_DATA',
//     data: 'some value'
// });
//
// store.dispatch({
//     type: 'SERVER_RESPONSE',
//     data: 'some value'
// });
//
// store.dispatch({
//     type: 'LOG_EVENT',
//     data: 'some value'
// });


console.log(store.listeners);

if (module.hot) {
    module.hot.accept('./store.js', function() {


    })
}