import { request } from '../../../utils';

export async function newTask(data) {
	return request('/api/oa/act/task/process-instances',{
		method: 'post',
		body: data
	})
}

export async function list_doing() {
	return request('/api/oa/act/task/doing',{
		method: 'get'
	})
}