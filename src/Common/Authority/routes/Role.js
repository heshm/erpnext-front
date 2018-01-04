import React,{PureComponent} from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import RoleList from './RoleList';
import UserRole from './UserRole';

const TabPane = Tabs.TabPane;
class Role extends PureComponent{
  render(){
    const { appList } = this.props.app;
    return (
      <div>
        <Tabs>
          <TabPane tab="角色维护" key="list">
            <RoleList appList={appList}/>
          </TabPane>
          <TabPane tab="用户角色" key="modify">
            <UserRole/>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default connect(({ app }) => ({ app }))(Role);
