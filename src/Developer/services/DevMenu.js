import { request } from '../../utils';

export async function getAllMenu() {
  return request('/api/developer/menu/getChildMenuList/root',{
    method: 'get'
  });
}

export async function deleteMenu(id) {
  return request(`/api/developer/menu/delete/${id}`,{
    method: 'get'
  });
}
