import React,{PureComponent} from 'react';

import {Tabs} from 'antd';
import ProcessInfo from '../components/ProcessInfo';
import ProcessInst from '../components/ProcessInst';

const TabPane = Tabs.TabPane;
class Processes extends PureComponent {
	render(){
		const {history} = this.props;
		return (
			<Tabs>
				<TabPane tab="新流程" key="new">
					<ProcessInfo history={history}/>
				</TabPane>
				<TabPane tab="可处理" key="doing">
					<ProcessInst />
				</TabPane>
			</Tabs>
		)
	}
}

export default Processes;