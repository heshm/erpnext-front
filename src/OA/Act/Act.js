import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Model from './routes/Model';
import Form from './routes/Form';

const Act = ({match}) => {
	return (
		<Switch>
			<Route exact path={`${match.url}/model`} component={Model}/>
			<Route exact path={`${match.url}/form`} component={Form}/>
		</Switch>
	)
}


export default Act;