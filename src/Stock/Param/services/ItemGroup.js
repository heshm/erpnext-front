import {request} from '../../../utils';

export async function getAllItemGroup() {
  return request('/api/stock/param/itemGroup/getAllItemGroup',{
    method: 'get'
  });
}

export async function getChildItemGroup(id) {
  return request(`/api/stock/param/itemGroup/getChildItemGroup/${id}`,{
    method: 'get'
  })
}

export async function create(payload) {
  return request('/api/stock/param/itemGroup/create',{
    method: 'post',
    body: JSON.stringify(payload)
  });
}

export async function update(payload) {
  return request('/api/stock/param/itemGroup/update',{
    method: 'put',
    body: payload
  });
}
