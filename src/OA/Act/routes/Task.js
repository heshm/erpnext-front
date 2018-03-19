import React,{PureComponent} from 'react';
import {Tabs} from 'antd';
import TaskList from '../components/TaskList';
import DoingTask from '../components/DoingTask';

const TabPane = Tabs.TabPane;
class Task extends PureComponent {
	render(){
		return (
			<Tabs>
				<TabPane tab="处理中" key="doing">
					<DoingTask />
				</TabPane>
				<TabPane tab="可签收" key="signIn">

				</TabPane>
				<TabPane tab="新任务" key="new">
					<TaskList/>
				</TabPane>

			</Tabs>
		)
	}
}

export default Task;