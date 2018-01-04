import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Param from './Param/';
import Authority from './Authority/';

const Common = ({match}) => {
	return (
		<Switch>
			<Route path={`${match.url}/param`}  component={Param}/>
			<Route path={`${match.url}/authority`}  component={Authority}/>
		</Switch>
	)
}


export default Common;