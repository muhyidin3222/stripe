import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import configureStore from "config/configureStore";
import LoadingLoad from 'components/general/loadingLoad'

const App = lazy(() => import('./App'))
const store = configureStore();

function Root () {
    return (
        <Suspense fallback={<LoadingLoad />}>
            <Provider store={store}>
                <App />
            </Provider>
        </Suspense>
    );
}

export default Root;

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();

