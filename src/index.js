import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import {AuthContextProvider} from './context/auth-context';

// NOTE Use AuthContext here so all component inside App.js can use it
ReactDOM.render(
    <AuthContextProvider>
        <App />
    </AuthContextProvider>,
    document.getElementById('root')
);
