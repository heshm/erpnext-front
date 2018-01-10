import React,{PureComponent} from 'react';
import { Tabs } from 'antd';
import PermissionList from '../components/PermissionList';

const TabPane = Tabs.TabPane;
class Permission extends PureComponent {
	render() {
		return (
			<Tabs>
				<TabPane tab="权限维护" key="perm">
					<PermissionList />
				</TabPane>
				<TabPane tab="角色权限" key="rolePerm">
					角色权限
				</TabPane>
				<TabPane tab="用户权限" key="userPerm">
					用户权限
				</TabPane>
			</Tabs>
		)
	}
}

export default Permission;