import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Param from './Param';

const Stock = ({match}) => {
	return (
		<Switch>
			<Route path={`${match.url}/param`}  component={Param}/>
		</Switch>
	)
}

export default Stock;