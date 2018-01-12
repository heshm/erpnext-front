import { request } from '../../../utils';

export async function tree_list(){
	return request('/api/common/authority/perm/tree_list',{
		method: 'get'
	});
}

export async function list() {
	return request('/api/common/authority/perm/list',{
		method: 'get'
	});
}

export async function role_perm(roleId) {
	return request(`/api/common/authority/perm/role_perm/${roleId}`,{
		method: 'get'
	});
}

export async function update_role_perm(rolePerm){
	return request('/api/common/authority/perm/role_perm',{
		method: 'post',
		body: rolePerm
	});
}

export async function user_perm(userId) {
	return request(`/api/common/authority/perm/user_perm/${userId}`,{
		method: 'get'
	});
}

export async function update_user_perm(userPerm){
	return request('/api/common/authority/perm/user_perm',{
		method: 'post',
		body: userPerm
	});
}


export async function create(perm){
	return request('/api/common/authority/perm/create',{
		method: 'post',
		body: perm
	});
}