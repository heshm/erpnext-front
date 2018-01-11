import React,{PureComponent} from 'react';
import { Tabs } from 'antd';
import PermissionList from '../components/PermissionList';
import UserPerm from '../components/UserPerm';
import RolePerm from '../components/RolePerm';

const TabPane = Tabs.TabPane;
class Permission extends PureComponent {
	render() {
		return (
			<Tabs>
				<TabPane tab="权限维护" key="perm">
					<PermissionList />
				</TabPane>
				<TabPane tab="角色权限" key="rolePerm">
					<RolePerm />
				</TabPane>
				<TabPane tab="用户权限" key="userPerm">
					<UserPerm />
				</TabPane>
			</Tabs>
		)
	}
}

export default Permission;