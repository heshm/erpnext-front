import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Account from './Account';

const Ledger = ({match}) => {
	return (
		<Switch>
			<Route path={`${match.url}/account`}  component={Account}/>
		</Switch>
	)
}

export default Ledger;