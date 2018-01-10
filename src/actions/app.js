import {FETCH_START,UPDATE_STATE} from '../actions';
import {fetchUser,fetchAppInfo,fetchMenu} from '../services/Main'

export const COLLAPSE_MENU = 'COLLAPSE_MENU';
export const POPOVER_MENU = 'POPOVER_MENU';
export const RESIZE_WINDOW = 'RESIZE_WINDOW';

export const loadUserInfo = () => (dispatch, getState) => {
	dispatch({type: FETCH_START})
	fetchUser().then(userInfo => {
		dispatch({
			type: UPDATE_STATE,
			payload: {
				userInfo
			}
		})
	})
}

export const loadAppInfo = () => (dispatch, getState) => {
	dispatch({type: FETCH_START})
	fetchAppInfo().then(appInfo => {
		dispatch({
			type: UPDATE_STATE,
			payload: {
				...appInfo
			}
		})
	})
}

export const changeApp = (appId) => (dispatch, getState) => {
	dispatch({type: FETCH_START})
	fetchMenu(appId).then(menuItem => {
		dispatch({
			type: UPDATE_STATE,
			payload: {
				menuItem,
				appId
			}
		})
		localStorage.setItem('app_id',appId);
	})
}