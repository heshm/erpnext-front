import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Unit from './routes/Unit';
import Dict from './routes/Dict';
import DictType from './routes/DictType';

const Param = ({match}) => {
	return (
		<Switch>
			<Route path={`${match.url}/unit`} component={Unit}/>
			<Route path={`${match.url}/dict`} component={Dict}/>
			<Route path={`${match.url}/dictType`} component={DictType}/>
		</Switch>
	)
}


export default Param;