import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Act from './Act';

const OA = ({match}) => {
	return (
		<Switch>
			<Route path={`${match.url}/act`} component={Act}/>
		</Switch>
	)
}

export default OA;