import request from './request';
import moment from 'moment';

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
	if(duration === undefined){
		return "";
	}
	let remain, result = '';
	let time = parseInt(duration / 1000,10);
	const day = parseInt(time / (24 * 60 * 60),10);remain = time % (24 * 60 * 60);
	const hour = parseInt(remain / (60 * 60),10); remain = remain % (60 * 60);
	const minute = parseInt(remain / 60,10);
	const second = remain % 60;
	if(day > 0) {
		result += day + "天";
	}
	if(hour > 0){
		result += hour + "时";
	}
	if(minute > 0){
		result += minute + "分";
	}
	if(second > 0){
		result += second + "秒";
	}
	return result;
}

const getDate = (longTypeDate) => {
	if(longTypeDate === null)
		return "";
	let date = new Date();
	date.setTime(longTypeDate);
	return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

export {
	storeLoginData,
	isLogin,
	request,
	jsonToUrlParams,
	getDuration,
	getDate
};