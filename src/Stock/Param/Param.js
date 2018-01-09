import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Warehouse from './routes/Warehouse';
import WarehouseDetail from './routes/WarehouseDetail';

const Param = ({match}) => {
	return (
		<Switch>
			<Route exact path={`${match.url}/warehouse`} component={Warehouse}/>
			<Route path={`${match.url}/warehouse/:id`} component={WarehouseDetail}/>
		</Switch>
	)
}


export default Param;