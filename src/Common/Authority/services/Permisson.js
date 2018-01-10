import { request } from '../../../utils';

export async function list(){
	return request('/api/common/authority/perm/list',{
		method: 'get'
	});
}

export async function create(perm){
	return request('/api/common/authority/perm/create',{
		method: 'post',
		body: perm
	});
}