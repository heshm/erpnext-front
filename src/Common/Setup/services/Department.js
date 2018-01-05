import { request } from '../../../utils';

export async function tree() {
  return request('/api/common/setup/department/treeList/root',{
    method: 'get'
  });
}

export async function create(dept) {
  if(dept.param){
    const param = dept.param.toString();
    return request(`/api/common/setup/department/create?param=${param}`,{
      method: 'post',
      body: dept
    });
  }else{
    return request('/api/common/setup/department/create',{
      method: 'post',
      body: dept
    });
  }
}

export async function update(dept) {
  return request('/api/common/setup/department/update',{
    method: 'put',
    body: dept
  });
}
