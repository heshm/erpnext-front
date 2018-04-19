import {request} from '../../../utils';

export async function list() {
	return request('/api/stock/param/price/list',{
		method: 'get'
	})
}