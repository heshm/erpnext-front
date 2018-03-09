import { request } from '../../../utils';

export async function pageList(category, page = 0) {
	return request(`/api/oa/act/process/page?category=${category}&page=${page}`, {
		method: 'get'
	});
}

export async function deleteProcess(deployId) {
	return request(`/api/oa/act/process/delete/${deployId}`,{
		method: 'delete'
	})
}