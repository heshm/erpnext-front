import React,{PureComponent} from 'react';
import { Tabs } from 'antd';
import UserList from './UserList';
import UserModify from './UserModify';
import { create } from '../services/User';

const TabPane = Tabs.TabPane;
class User extends PureComponent{
  state = {
    activeKey: 'list'
  }
  handleTabChange = (key) => {
		this.setState({
			activeKey: key
		});
  }
  showDetail = () => {

  }
  render(){
    return(
      <div>
        <Tabs activeKey={this.state.activeKey}
							onChange={this.handleTabChange}
        >
          <TabPane tab="用户列表" key="list">
            <UserList />
          </TabPane>
          <TabPane tab="用户添加" key="modify">
            <UserModify />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default User;
