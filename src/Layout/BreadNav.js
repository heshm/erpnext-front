import React from 'react';
import { Breadcrumb } from 'antd';
import './BreadNav.less';

const BreadNav = () => {
  return (
    <div>
      <div className="bread">
        <Breadcrumb>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>测试</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  )
}

export default BreadNav;
