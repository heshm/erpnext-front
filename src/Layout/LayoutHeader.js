import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Layout, Icon, Menu, Badge, Popover } from 'antd';
import MenuNav from './MenuNav';
import {COLLAPSE_MENU,POPOVER_MENU} from '../actions';
import './LayoutHeader.less';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const LayoutHeader = ({ dispatch, app }) => {
  const { menuCollapsed, smallScreen, menuItem, userInfo,popoverMenuVisible } = app;
  const collapsedNavMenu = () => {
    dispatch({ type: COLLAPSE_MENU })
  }
  const popoverMenu = () => {
		dispatch({type:POPOVER_MENU})
  }
  return (
    <Header className="header">
      {
				smallScreen ? (
          <Popover
            trigger="click"
            placement="bottomLeft"
            overlayClassName="popovermenu"
            content={<MenuNav menuItem={menuItem} clickMenu={popoverMenu}/>}
            onVisibleChange={popoverMenu}
            visible={popoverMenuVisible}
          >
            <div className="button">
              <Icon type="bars" />
            </div>
          </Popover>
        ) : (
          <div className="button" onClick={collapsedNavMenu}>
            <Icon type={classnames({ 'menu-unfold': menuCollapsed, 'menu-fold': !menuCollapsed })}  />
          </div>
        )
      }
      <div className="right-warpper">
        <Menu
          mode="horizontal"
        >
          <Menu.Item key="full">
            <Icon type="arrows-alt"/>
          </Menu.Item>
          <Menu.Item key="1">
            <Badge count={25} overflowCount={10}>
              <Icon type="notification" />
            </Badge>
          </Menu.Item>
          <SubMenu title={<span><Icon type="user"/></span>}>
            <MenuItemGroup title="用户中心">
              <Menu.Item key="setting:1">你好 - {userInfo.userName ? userInfo.userName : ''}</Menu.Item>
              <Menu.Item key="setting:2">个人信息</Menu.Item>
              <Menu.Item key="logout"><span>退出登录</span></Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
      </div>

    </Header>
  )
}

export default connect(({ app }) => ({ app }))(LayoutHeader);
