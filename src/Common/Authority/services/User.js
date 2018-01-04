import { request, jsonToUrlParams } from '../../../utils';

export async function list(pagination,params) {
  let current = 0;
  if(pagination){
    current = pagination.current - 1;
  }
  let url = `/api/common/authority/user/list?page=${current}`
  url += '&' + jsonToUrlParams(params);
  console.log(url)
  return request(url,{
    method: 'get'
  });
}
