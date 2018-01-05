import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DevApp from './routes/DevApp';
import DevMenu from './routes/DevMenu';
import MenuModify from '../Common/Param/routes/MenuModify';

const Developer = ({match}) => {
	return (
		<Switch>
			<Route path={`${match.url}/app`}  component={DevApp}/>
			<Route exact path={`${match.url}/menu`}  component={DevMenu}/>
			<Route path={`${match.url}/menu/:pmenuId/:menuId?`}  component={MenuModify}/>
		</Switch>
	)
}

export default Developer;