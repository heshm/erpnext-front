import React,{PureComponent} from 'react';
import { Tabs } from 'antd';
import ProcessList from '../components/ProcessList';

const TabPane = Tabs.TabPane;
class Process extends PureComponent {
	render() {
		return(
			<Tabs>
				<TabPane tab="流程列表" key="list">
					<ProcessList/>
				</TabPane>
				<TabPane tab="运行中的流程" key="running">

				</TabPane>
			</Tabs>
		)
	}
}

export default Process;