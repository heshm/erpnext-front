import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import * as reducers from './reducers';
import './App.less';

import Main from './Main';
import Login from './Login';

const history = createHistory();
const middleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	combineReducers({
		...reducers,
		router: routerReducer
	}),
	composeEnhancers(applyMiddleware(middleware,thunk))
)

class App extends Component {
  render() {
    return (
	    <Provider store={store}>
		    <ConnectedRouter history={history}>
			    <Switch>
						<Route exact path="/login" component={Login}/>
				    <Route path="/" component={Main}/>
			    </Switch>
		    </ConnectedRouter>
	    </Provider>
    );
  }
}

export default App;
