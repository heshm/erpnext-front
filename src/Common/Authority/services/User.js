import { request, jsonToUrlParams } from '../../../utils';

export async function list(pagination,params) {
  let current = 0,size = 10;
  if(pagination){
    current = pagination.current - 1;
		size = pagination.pageSize
  }
  let url = `/api/common/authority/user/list?page=${current}&size=${size}`
  url += '&' + jsonToUrlParams(params);
  console.log(pagination)
  return request(url,{
    method: 'get'
  });
}
