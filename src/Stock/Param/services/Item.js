import {request} from '../../../utils';

export async function list(itemGroupId) {
  return request(`/api/stock/param/item/list/${itemGroupId}`,{
    method: 'get'
  })
}

export async function listOne(itemId) {
  return request(`/api/stock/param/item/listOne/${itemId}`,{
    method: 'get'
  })
}

export async function update(item) {
  return request('/api/stock/param/item/update',{
    method: 'put',
    body: item
  })
}

export async function create(item) {
  return request('/api/stock/param/item/create',{
    method: 'post',
    body: item
  })
}
