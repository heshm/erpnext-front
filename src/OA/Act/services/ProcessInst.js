import { request, jsonToUrlParams } from '../../../utils';

export async function list() {
	return request('/api/oa/act/processInst/list/running',{
		method: 'get'
	})
}

export async function deleteProcessInst(id) {
	return request(`/api/oa/act/processInst/delete/${id}`,{
		method: 'delete'
	})
}

export async function pageListHis(pagination,filter) {
	let url = '/api/oa/act/processInst/pageListHis?';
	let page = pagination.current - 1;
	let params = {
		...filter,
		page: page
	}
	url += jsonToUrlParams(params);
	console.log(url)
	return request(url,{
		method: 'get'
	})
}