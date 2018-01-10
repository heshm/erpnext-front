import { request } from '../../../utils';

export async function list(){
	return request('/api/common/authority/perm/list',{
		method: 'get'
	});
}