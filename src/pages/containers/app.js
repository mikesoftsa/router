import React, { Fragment, Component } from 'react';
import Videos from "./videos";
import Home from "../components/home";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../../reducers/index'
import { Map as map } from 'immutable';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../components/header'
import NotFound from "../components/not-found";


const store = createStore(
    reducer,
    map(),
    composeWithDevTools(
        applyMiddleware(
            logger,
            thunk
        )
    )
);

class App extends Component{
    render(){
        return(

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

        )
    }
}

export default App;

