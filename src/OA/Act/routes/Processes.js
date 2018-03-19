import React,{PureComponent} from 'react';

import {Tabs} from 'antd';
import ProcessInfo from '../components/ProcessInfo';

const TabPane = Tabs.TabPane;
class Processes extends PureComponent {
	render(){
		return (
			<Tabs>
				<TabPane tab="可处理" key="doing">
					
				</TabPane>
				<TabPane tab="新流程" key="new">
					<ProcessInfo/>
				</TabPane>

			</Tabs>
		)
	}
}

export default Processes;