import React from 'react'
import ReactDOM from 'react-dom';
import Provider from './redux/Provider';
import App from './App';

ReactDOM.render(
    <Provider>
        <App />
    </Provider>
    , document.getElementById('demo'));
