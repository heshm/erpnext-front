import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DevApp from './routes/DevApp';
import DevMenu from './routes/DevMenu';

const Developer = ({match}) => {
	return (
		<Switch>
			<Route path={`${match.url}/app`}  component={DevApp}/>
			<Route path={`${match.url}/menu`}  component={DevMenu}/>
		</Switch>
	)
}

export default Developer;