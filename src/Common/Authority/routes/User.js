import React,{PureComponent} from 'react';
import { Tabs } from 'antd';
import UserList from './UserList';
import UserModify from './UserModify';
import { listOne } from '../services/User';

const TabPane = Tabs.TabPane;
class User extends PureComponent{
  state = {
    activeKey: 'list',
	  mode: 'list',
	  user: {}
  }
  handleTabChange = (key) => {
		this.setState({
			activeKey: key,
			mode: key === 'list' ? 'list' : '',
			user: {}
		});
  }
  showDetail = (userId) => {
	  listOne(userId).then(({data}) => {
	  	this.setState({
			  user: data,
			  activeKey: 'modify',
			  mode: 'modify'
	  	})
	  })
  }
  render(){
    return(
      <div>
        <Tabs activeKey={this.state.activeKey}
							onChange={this.handleTabChange}
        >
          <TabPane tab="用户列表" key="list">
            <UserList showDetail={this.showDetail}/>
          </TabPane>
          <TabPane tab={this.state.mode === 'modify' ? '用户修改' : '用户新增'} key="modify">
            <UserModify user={this.state.user} mode={this.state.mode}/>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default User;
