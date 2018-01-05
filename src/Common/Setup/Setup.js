import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Department from './routes/Department';


const Param = ({match}) => {
	return (
		<Switch>
			<Route path={`${match.url}/department`} component={Department}/>
		</Switch>
	)
}


export default Param;