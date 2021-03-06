import React from 'react';
import {hydrate} from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../pages/containers/app'

const app = document.getElementById('home-container')

hydrate(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , app)