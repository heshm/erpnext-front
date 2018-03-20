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

export async function list_one(id) {
	return request(`/api/oa/act/task/${id}`,{
		method: 'get'
	})
}

export async function complete(taskId) {
	return request(`/api/oa/act/task/${taskId}/action/complete`,{
		method: 'put'
	})
}

export async function list_his_tasks(processInstId) {
	return request(`/api/oa/act/task/list-tasks/${processInstId}/completed`,{
		method: 'get'
	})
}