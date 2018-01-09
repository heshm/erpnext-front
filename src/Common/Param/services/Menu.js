import {request} from '../../../utils';

export async function getOneMenu(id){
  return request(`/api/common/param/menu/getOneMenu/${id}`,{
    method: 'get'
  });
}

export async function getOneMenuWithParent(id) {
  return request(`/api/common/param/menu/getOneMenuWithParent/${id}`,{
    method: 'get'
  });
}

export async function update(menu){
  return request('/api/common/param/menu/updateOneMenu',{
    method: 'put',
    body: menu
  });
}

export async function create(menu){
  return request('/api/common/param/menu/createOneMenu',{
    method: 'post',
    body: menu
  });
}
