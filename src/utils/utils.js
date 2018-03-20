import request from './request';

const storeLoginData = (data) => {
	const {access_token, token_type, refresh_token, expires_in} = data;
	localStorage.setItem('access_token', access_token);
	localStorage.setItem('token_type', token_type);
	localStorage.setItem('refresh_token', refresh_token);
	localStorage.setItem('expires_in', expires_in);
}

const isLogin = () => {
	return !!localStorage.getItem('access_token');
}

const jsonToUrlParams = (params) => {
	return Object.keys(params).map(i => `${i}=${params[i]}`).join('&');
}

const getDuration = (duration) => {
	if(duration == undefined){
		return "";
	}
	let remain = 0;
	const day = duration / (24 * 60 * 60);
}

export {
	storeLoginData,
	isLogin,
	request,
	jsonToUrlParams
};