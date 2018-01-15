import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CustomerGroup from './routes/CustomerGroup';
const Param = ({match}) => {
	return (
		<Switch>
			<Route exact path={`${match.url}/customerGroup`} component={CustomerGroup}/>
		</Switch>
	)
}


export default Param;