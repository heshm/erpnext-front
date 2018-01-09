import fetch from 'isomorphic-fetch';
import { notification, message } from 'antd';

function checkStatus(response) {
	if (response.status >= 200 && response.status < 500) {
		return response;
	}
	if(response.status === 500) {
		notification.error({
			message: `请求后端错误`,
			description: '服务器发生错误，请检查服务器',
		})
	}
	const error = new Error(response.statusText);
	error.response = response;
	throw error;
}

function handleError(response) {
	if(response.error){
		message.error(`${response.error}：${response.error_description || response.detail}`);
		console.error(response);
		return { success: false};
	}else{
		return { success: true, data: response };
	}
}

export default function request(url, options){
	const defaultOptions = {
		credentials: 'include',
	};
	const newOptions = { ...defaultOptions, ...options };
	if (!url.startsWith('oauth')){
		const access_token = localStorage.getItem('access_token');
		const token_type = localStorage.getItem('token_type');
		newOptions.headers = {
			Authorization: `${token_type} ${access_token}`
		}
		if (newOptions.method === 'post' || newOptions.method === 'put') {
			newOptions.headers = {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				...newOptions.headers,
			};
			newOptions.body = JSON.stringify(newOptions.body);
		}
	}

	return fetch(url, newOptions)
		.then(checkStatus)
		.then(response => response.json())
		.then(handleError)
		.catch(err => ({ err }));
}