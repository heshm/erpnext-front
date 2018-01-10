import React,{PureComponent} from 'react';
import { Tabs } from 'antd';
import UserList from './UserList';

const TabPane = Tabs.TabPane;
class User extends PureComponent{
  render(){
    return(
      <div>
        <Tabs>
          <TabPane tab="用户列表" key="list">
            <UserList />
          </TabPane>
          <TabPane tab="用户添加" key="modify">
            用户新增
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default User;
