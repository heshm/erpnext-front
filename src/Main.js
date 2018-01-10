import React,{ PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Layout  } from 'antd';
import {Aside,BreadNav,LayoutHeader,Setting} from './Layout';
import Loader from './components/Loader/';
import { loadUserInfo, loadAppInfo } from './actions';
import Common from './Common/';
import Developer from './Developer/';
import Ledger from './Ledger/';
import Stock from './Stock/';

const { Content, Footer } = Layout;
class Main extends PureComponent{
	componentDidMount(){
		const { dispatch } = this.props;
		dispatch(loadUserInfo());
		dispatch(loadAppInfo());
	}

	render(){
		const {menuCollapsed,menuItem,smallScreen} = this.props.app;
		const asideProps = {menuCollapsed,menuItem}
		return(
			<Layout className="ant-layout-has-sider">
				<Loader fullScreen spinning={this.props.app.loading} />
				{smallScreen ? <div/> : <Aside {...asideProps} />}
				<Layout>
					<LayoutHeader />
					<BreadNav />
					<Content className="content">
						<Switch>
							<Route path="/common" component={Common}/>
							<Route path="/ledger" component={Ledger}/>
							<Route path="/stock" component={Stock}/>
							<Route path="/developer" component={Developer}/>
						</Switch>
					</Content>
					<Footer className="footer">
						ERPNext ©2017 Created by Heshm
					</Footer>
					<Setting />
				</Layout>
			</Layout>
		)
	}
}

export default withRouter(connect(({app}) => ({app}))(Main));