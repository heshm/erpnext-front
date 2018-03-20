import React,{PureComponent} from 'react';

import {Tabs} from 'antd';
import ProcessInfo from '../components/ProcessInfo';
import ProcessInst from '../components/ProcessInst';

const TabPane = Tabs.TabPane;
class Processes extends PureComponent {
	render(){
		return (
			<Tabs>
				<TabPane tab="可处理" key="doing">
<<<<<<< HEAD

=======
					<ProcessInst />
>>>>>>> caf6115eacae203d6f4e78a7626605b5b2a30c8c
				</TabPane>
				<TabPane tab="新流程" key="new">
					<ProcessInfo/>
				</TabPane>

			</Tabs>
		)
	}
}

export default Processes;