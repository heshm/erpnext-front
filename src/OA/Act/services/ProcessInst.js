import { request } from '../../../utils';

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
	return request('/api/oa/act/processInst/pageListHis',{
		method: 'get'
	})
}