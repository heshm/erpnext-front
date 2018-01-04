import { request } from '../../utils';

export async function getAllApplication() {
  return request('/api/developer/application/getAllApplication',{
    method: 'get'
  });
}
