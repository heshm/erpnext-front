import {request} from '../../../utils';

export async function readAllUnit(){
  return request('/api/common/param/unit/getAllUnit',{
    method: 'get'
  });
}

export async function deleteOneUnit(unitId) {
  return request(`/api/common/param/unit/deleteOneUnit/${unitId}`,{
    method: 'delete'
  });
}

export async function updateOneUnit(unit){
  return request('/api/common/param/unit/updateOneUnit',{
    method: 'put',
    body: unit
  });
}

export async function createOneUnit(unit){
  return request('/api/common/param/unit/createOneUnit',{
    method: 'post',
    body: unit
  });
}
