import { request } from '../../../utils';

export async function newTask(data) {
	return request('/api/oa/act/task/process-instances',{
		method: 'post',
		body: data
	})
}

export async function list_tasks() {
	return request('/api/oa/act/task/list-tasks',{
		method: 'get'
	})
}