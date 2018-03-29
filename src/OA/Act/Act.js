import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Model from './routes/Model';
import FormModel from './routes/FormModel';
import Process from './routes/Process';
import Task from './routes/Task';
import TaskDetail from './routes/TaskDetail';
import Processes from './routes/Processes';
import StartForm from './routes/StartForm';
import ProcessHistory from './routes/ProcessHistory';

const Act = ({match}) => {
	return (
		<Switch>
			<Route exact path={`${match.url}/processModel`} component={Model}/>
			<Route exact path={`${match.url}/formModel`} component={FormModel}/>
			<Route exact path={`${match.url}/process`} component={Process}/>
			<Route exact path={`${match.url}/task`} component={Task}/>
			<Route exact path={`${match.url}/task/:id`} component={TaskDetail}/>
			<Route exact path={`${match.url}/processes`} component={Processes}/>
			<Route exact path={`${match.url}/start-form/:processDefId`} component={StartForm}/>
			<Route exact path={`${match.url}/process-history`} component={ProcessHistory}/>
		</Switch>
	)
}


export default Act;