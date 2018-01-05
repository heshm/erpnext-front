import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Unit from './routes/Unit';
import Dict from './routes/Dict';
import DictType from './routes/DictType';
import Area from './routes/Area';

const Param = ({match}) => {
	return (
		<Switch>
			<Route path={`${match.url}/unit`} component={Unit}/>
			<Route path={`${match.url}/dict`} component={Dict}/>
			<Route path={`${match.url}/dictType`} component={DictType}/>
			<Route path={`${match.url}/area`} component={Area}/>
		</Switch>
	)
}


export default Param;