import {request} from '../utils';
import { stringify } from 'qs';

export async function login(userinfo){
	const param = stringify({
		...userinfo,
		grant_type: 'password'
	});
	return request('oauth/token?' + param ,{
		method: 'post',
		headers: new Headers({
			"Authorization": "Basic ZXJwbmV4dC1mcm9udDplcnBuZXh0LXNlY3JldA=="
		})
	});
}