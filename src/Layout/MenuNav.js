import React, { Component } from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const getMenu = (menuTree) => {
  return menuTree.map(item => {
    if (item.children) {
      return (
        <SubMenu key={item.id} title={<span><Icon type={item.iconCls}/><span>{item.name}</span></span>}>
          {getMenu(item.children)}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key={item.id}>
          <Link to={item.actionUrl}>
            <Icon type={item.iconCls}/><span>{item.name}</span>
          </Link>
        </Menu.Item>
      );
    }
  });
}

class MenuNav extends Component {
  state = {
    openKeys: []
  };
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    const rootSubmenuKeys = this.props.menuItem.map(item => item.id);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({openKeys});
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  render(){
    return (
      <Menu
        theme="dark"
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        onClick={this.props.clickMenu}
      >
        <Menu.Item key="index">
          <Link to="/common">
            <Icon type="laptop" />
            <span>首页</span>
          </Link>
        </Menu.Item>
        {getMenu(this.props.menuItem)}
      </Menu>
    )
  }
}


export default MenuNav;
