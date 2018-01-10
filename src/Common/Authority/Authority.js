import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Role from './routes/Role';
import User from './routes/User';
import Permission from './routes/Permission';

const Authority = ({match}) => {
	return (
		<Switch>
			<Route path={`${match.url}/role`}  component={Role}/>
			<Route path={`${match.url}/user`}  component={User}/>
			<Route path={`${match.url}/permission`}  component={Permission}/>
		</Switch>
	)
}

export default Authority;