import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Customer from './Customer';

const Crm = ({match}) => {
	return (
		<Switch>
			<Route path={`${match.url}/customer`} component={Customer}/>
		</Switch>
	)
}

export default Crm;