import { request } from '../../../utils';

export async function list(){
  return request('/api/common/authority/role/list',{
    method: 'get'
  });
}

export async function create(role){
  return request('/api/common/authority/role/create',{
    method: 'post',
    body: role
  });
}

export async function remove(roleId){
  return request(`/api/common/authority/role/delete/${roleId}`,{
    method: 'get'
  });
}

export async function user_role(userId) {
  return request(`/api/common/authority/role/userRole/${userId}`,{
    method: 'get'
  });
}

export async function update(userRole) {
  return request('/api/common/authority/role/update',{
    method: 'put',
    body: userRole
  });
}
