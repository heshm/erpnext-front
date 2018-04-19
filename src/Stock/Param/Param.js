import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Warehouse from './routes/Warehouse';
import WarehouseDetail from './routes/WarehouseDetail';
import ItemGroup from './routes/ItemGroup';
import ItemList from './routes/ItemList';
import Price from './routes/Price';

const Param = ({match}) => {
	return (
		<Switch>
			<Route exact path={`${match.url}/warehouse`} component={Warehouse}/>
			<Route path={`${match.url}/warehouse/:id`} component={WarehouseDetail}/>
			<Route path={`${match.url}/itemGroup`} component={ItemGroup}/>
			<Route path={`${match.url}/itemlist`} component={ItemList}/>
			<Route path={`${match.url}/price`} component={Price}/>
		</Switch>
	)
}


export default Param;