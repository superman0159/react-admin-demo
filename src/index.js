import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './Store';
const Index = () => (<Provider store={store}><App /></Provider>)

ReactDOM.render(<Index />, document.getElementById('root'));

serviceWorker.unregister();
