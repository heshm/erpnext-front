import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AccountTitle from './routes/AccountTitle';

const Account = ({match}) => {
	return (
		<Switch>
			<Route path={`${match.url}/accountTitle`} component={AccountTitle}/>
		</Switch>
	)
}

export default Account;