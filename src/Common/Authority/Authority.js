import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Role from './routes/Role';
import User from './routes/User';

const Authority = ({match}) => {
	return (
		<Switch>
			<Route path={`${match.url}/role`}  component={Role}/>
			<Route path={`${match.url}/user`}  component={User}/>
		</Switch>
	)
}

export default Authority;