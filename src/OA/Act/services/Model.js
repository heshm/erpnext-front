import { request, jsonToUrlParams } from '../../../utils';

export async function list(params) {
  let url = '/api/oa/act/models/list?';
  url += '&' + jsonToUrlParams(params);
  return request(url,{
    method: 'get'
  });
}
