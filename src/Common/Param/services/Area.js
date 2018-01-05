import { request } from '../../../utils';

export async function tree(id) {
  return request(`/api/common/param/area/tree/${id}`,{
    method: 'get'
  });
}

export async function treeData() {
  return request('/api/common/param/area/treeSelect/root',{
    method: 'get'
  });
}

export async function ajaxSelect(id) {
  return request(`/api/common/param/area/treeSelect/${id}`,{
    method: 'get'
  });
}

export async function del(id) {
  return request(`/api/common/param/area/delete/${id}`,{
    method: 'get'
  });
}

export async function create(area) {
  return request('/api/common/param/area/create',{
    method: 'post',
    body: area
  });
}

export async function update(area) {
  return request('/api/common/param/area/update',{
    method: 'put',
    body: area
  });
}
