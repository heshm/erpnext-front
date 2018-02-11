import { request, jsonToUrlParams } from '../../../utils';

export async function list(params) {
  let url = '/api/oa/act/models/list?';
  url += '&' + jsonToUrlParams(params);
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