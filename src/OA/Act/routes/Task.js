import React,{PureComponent} from 'react';
import {Tabs} from 'antd';

const TabPane = Tabs.TabPane;
class Task extends PureComponent {
	render(){
		return (
			<Tabs>
				<TabPane tab="处理中" key="doing">

				</TabPane>
				<TabPane tab="可签收" key="signIn">

				</TabPane>
				<TabPane tab="新任务" key="new">

				</TabPane>

			</Tabs>
		)
	}
}

export default Task;