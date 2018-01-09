import React,{ PureComponent } from 'react';
import MenuForm from '../components/MenuForm';
import {getOneMenu,getOneMenuWithParent} from '../../../Common/Param/services/Menu';

class MenuModify extends PureComponent{
	state = {
		menu: {},
		mode: ''
	}
	componentDidMount(){
		const {pmenuId,menuId} = this.props.match.params;
		if(menuId){
			getOneMenuWithParent(menuId).then(({data}) => {
				this.setState({
					menu: data,
					mode: 'update'
				})
			})
		}else{
			getOneMenu(pmenuId).then(({data}) => {
				this.setState({
					menu: data,
					mode: 'create'
				})
			})
		}
	}
  render(){
    return (
			<MenuForm {...this.state}/>
    )
  }
}


export default MenuModify;
