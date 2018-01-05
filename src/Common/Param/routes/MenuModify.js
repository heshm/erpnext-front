import React,{ PureComponent } from 'react';
//import MenuForm from '../components/MenuForm';

class MenuModify extends PureComponent{
  state = {
		menu: {
			iconCls: ''
		},
		iconModal: false,
		icon: '',
    mode: ''
  }
  render(){
		const {menuId} = this.props.match.params;
		let menuFormProps = {...this.state}
    if(menuId){
      menuFormProps = {
				...menuFormProps,
        mode: 'update'
      }
    }else{
      menuFormProps = {
				...menuFormProps,
				mode: 'create'
			}
    }
    return (
			<div>sss</div>
    )
  }
}


export default MenuModify;
