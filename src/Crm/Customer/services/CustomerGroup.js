import { request } from '../../../utils';

export async function tree() {
  return request('/api/crm/customer/customerGroup/tree',{
    method: 'get'
  });
}

export async function update(record) {
  return request('/api/crm/customer/customerGroup/update',{
    method: 'put',
    body: record
  });
}

export async function create(record) {
  return request('/api/crm/customer/customerGroup/create',{
    method: 'post',
    body: record
  });
}
