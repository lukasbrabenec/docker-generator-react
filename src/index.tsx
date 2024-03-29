import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import App from './App';
import * as serviceWorker from './serviceWorker.js';
import rootReducer from './store/reducers/rootReducer';

Sentry.init({
    dsn: "https://d39ccccb39524c5588263dc10658af63@o576384.ingest.sentry.io/5729907",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
