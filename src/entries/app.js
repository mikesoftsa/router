import React, { Fragment } from 'react';
import {render} from 'react-dom';
//import PlayList from "./src/playlist/components/playlist";
//import Media from "./src/playlist/components/media";
//import data from '../../src/api.json'
import Videos from "../pages/containers/videos";
import Home from "../pages/components/home";

import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';

import reducer from '../reducers/index'
import { Map as map } from 'immutable';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../pages/components/header'
import NotFound from "../pages/components/not-found";


//import data from '../schemas/index'

//console.log(normalizedData);

/*const initialState = {
    data: {
        //...data,
        entities: data.entities,
        categories: data.result.categories,
        search:[],
    },
    modal:{
        visibility: false,
        mediaId: null
    }
};*/

/*function logger({ getState, dispath}){
   return (next)=>{
      return (action) => {
         console.log('estae es mi viejo estado', getState().toJS());
         console.log('vamos a enviar esta aciion', action);
         const value =  next(action);
         console.log('estae es mi nuevo estado', getState().toJS());
         return value;
      }
   }
}*/

const logger_ = ({ getState, dispath}) => next => action => {
    console.log('estae es mi viejo estado', getState().toJS());
    console.log('vamos a enviar esta aciion', action);
    const value =  next(action);
    console.log('estae es mi nuevo estado', getState().toJS());
    return value;
};

const store = createStore(
    reducer,
    map(),
    composeWithDevTools(
        applyMiddleware(
            logger,
            thunk
        )
    )
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//console.log(store.getState())

const app = document.getElementById('home-container')

//ReactDOM.render(que voy a renderizar, donde lo haré):
//const holaMundo = <h1>hola mundo12fdf</h1>;
//render(<PlayList type="video" title="Que es responsive Design?" author="Miguel Triana" image="./images/covers/responsive.jpg"/>,app);

render(
    <BrowserRouter>
        <Provider store={store}>
            <Fragment>
               <Header/>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/videos" component={Videos}/>
                    <Redirect from="/v" to="/videos" />
                    <Route component={NotFound} />
                </Switch>
            </Fragment>
        </Provider>
    </BrowserRouter>
    , app)