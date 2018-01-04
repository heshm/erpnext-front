import { request } from '../../../utils';

export async function pageList(dictType = '',page = 0) {
  return request(`/api/common/param/dict/pageList?dictType=${dictType}&page=${page}`,{
    method: 'get'
  });
}

export async function listDictType(){
  return request('/api/common/param/dictType/list',{
    method: 'get'
  });
}

export async function createDictType(dictType){
  return request('/api/common/param/dictType/create',{
    method: 'post',
    body: dictType
  });
}

export async function updateDictType(dictType) {
  return request('/api/common/param/dictType/update',{
    method: 'put',
    body: dictType
  });
}
