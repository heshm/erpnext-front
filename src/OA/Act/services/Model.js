import { request, jsonToUrlParams } from '../../../utils';

export async function list(params) {
  let url = '/api/oa/act/models/list?';
  url += jsonToUrlParams(params);
  return request(url,{
    method: 'get'
  });
}

export async function create(model) {
	return request('/api/oa/act/models/create',{
		method: 'post',
		body: model
	});
}

export async function deploy(modelId) {
	return request(`/api/oa/act/models/deploy/${modelId}`,{
			method: 'put'
	})
}

export async function updateCategory(appId,modelId) {
	return request(`/api/oa/act/models/category/${modelId}/${appId}`,{
		method: 'put'
	})
}