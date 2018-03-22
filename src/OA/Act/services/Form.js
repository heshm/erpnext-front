import { request } from '../../../utils';

export async function getStartForm(processDefinitionId){
	return request(`/api/oa/act/form/start-form/${processDefinitionId}`,{
		method: 'get'
	});
}