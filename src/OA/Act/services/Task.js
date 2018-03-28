import { request } from '../../../utils';

export async function newTaskWithoutForm(data) {
	return request('/api/oa/act/task/process-instances',{
		method: 'post',
		body: data
	})
}

export async function newTaskWithForm(processDefinitionId,values){
	const data = {
		processDefinitionId,
		values: {...values}
	}
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

export async function complete(taskId,variable) {
	if(variable){
		console.log(variable)
		return request(`/api/oa/act/task/${taskId}/action/complete`,{
			method: 'post',
			body: variable
		})
	}else{
		return request(`/api/oa/act/task/${taskId}/action/complete`,{
			method: 'put'
		})
	}
}

export async function claim(taskId) {
	return request(`/api/oa/act/task/${taskId}/action/claim`,{
		method: 'put'
	})
}

export async function list_his_tasks(processInstId) {
	return request(`/api/oa/act/task/list-tasks/${processInstId}/completed`,{
		method: 'get'
	})
}

export async function getFormData(taskId) {
	return request(`/api/oa/act/task/task-form/${taskId}`,{
		method: 'get'
	})
}