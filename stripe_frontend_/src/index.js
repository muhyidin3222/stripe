import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import configureStore from "config/configureStore";
import App from "./App";

const store = configureStore();

function Root () {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

export default Root;

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
