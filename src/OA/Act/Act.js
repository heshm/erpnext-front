import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Model from './routes/Model';

const Act = ({match}) => {
	return (
		<Switch>
			<Route exact path={`${match.url}/model`} component={Model}/>
		</Switch>
	)
}


export default Act;