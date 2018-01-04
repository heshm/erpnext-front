/**
 * Created by Lenovo on 2017/10/26.
 */
import React from 'react';
import { Layout } from 'antd';
import MenuNav from './MenuNav';

const { Sider } = Layout;

const Asider = ({ menuCollapsed, menuItem }) => {
  return(
    <Sider
      trigger={null}
      collapsible
      collapsed={menuCollapsed}
    >
      <div className="logo">
        <span>ERPNext</span>
      </div>
      <MenuNav menuItem={menuItem} menuCollapsed={menuCollapsed}/>
    </Sider>
  )
}

export default Asider;
