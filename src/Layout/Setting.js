import React, { Component } from 'react';
import { Tabs, Icon, Switch } from 'antd';
import { connect } from 'react-redux';
import {changeApp} from '../actions';
import './Setting.less';

const TabPane = Tabs.TabPane;
class Setting extends Component{
  state = {
    sidebarOpen : false
  }

  openSidebar = () => {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    })
  }
  switchApp = (k) => {
    const appId = this.props.app.appId;
    if(k !== appId){
      this.props.dispatch(changeApp(k));
    }
  }

  render(){
    const { appId, appList } = this.props.app;
    const appSelectTag = appList.map((item) => (
      <li className="list-group-item" key={item.id}>
        {item.name}
        <Switch
          className="switch"
          checked={appId === item.id}
          onChange={() => this.switchApp(item.id)}
        />
      </li>
    ))
    return (
      <div className={`setting-sidebar ${this.state.sidebarOpen ? 'active' : ''}`}>
        <a className="sw-btn" onClick={this.openSidebar}>
          <Icon type="setting"  />
        </a>
        <Tabs defaultActiveKey="1" size="small">
          <TabPane tab={<span>应用</span>} key="1">
            <ul className="list-group">
              {appSelectTag}
            </ul>
          </TabPane>
          <TabPane tab={<span>活动</span>} key="2">
            Tab 2
          </TabPane>
          <TabPane tab={<span>设置</span>} key="3">
            Tab 3
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default connect(({ app }) => ({ app }))(Setting);
