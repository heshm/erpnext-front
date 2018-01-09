import {request} from '../../../utils';

export async function list() {
  return request('/api/stock/param/warehouse/list',{
    method: 'get'
  });
}

export async function listOne(id) {
  return request(`/api/stock/param/warehouse/listOne/${id}`,{
    method: 'get'
  });
}
