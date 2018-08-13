import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import * as reducers from './reducers';
import {RESIZE_WINDOW} from './actions';
import './App.less';

import Main from './Main';
import Login from './Login';
import {isLogin} from './utils';

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
store.subscribe(() => {
	let tid
	window.onresize = () => {
		clearTimeout(tid)
		tid = setTimeout(() => {
			store.dispatch({type: RESIZE_WINDOW})
		}, 300)
	}
})

class App extends Component {
  render() {
    return (
	    <Provider store={store}>
		    <ConnectedRouter history={history}>
			    <Switch>
					<Route exact path="/login" component={Login}/>
				    <Route path="/" render={() => (
							isLogin() ? (
								<Main/>
							):(
								<Redirect to="/login"/>
							)
						)}/>
			    </Switch>
		    </ConnectedRouter>
	    </Provider>
    );
  }
}

export default App;
