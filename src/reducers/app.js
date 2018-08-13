import
{
	COLLAPSE_MENU,FETCH_START,UPDATE_STATE,RESIZE_WINDOW,POPOVER_MENU
} from '../actions'

const initialState = {
	appId: '',
	loading: false,
	menuCollapsed: false,
	popoverMenuVisible: false,
	smallScreen: document.body.clientWidth < 700,
	userInfo: {},
	appList: [],
	menuItem: [],
	isLogin: true
};

const app = (state = initialState,action) => {
	switch(action.type){
		case COLLAPSE_MENU:
			return {
				...state,
				menuCollapsed: !state.menuCollapsed
			}
		case FETCH_START:
			return {
				...state,
				loading: true
			}
		case UPDATE_STATE:
			const {payload} = action;
			return {
				...state,
				loading: false,
				...payload
			}
		case RESIZE_WINDOW:
			const smallScreen = document.body.clientWidth < 700
			return {
				...state,
				smallScreen
			}
		case POPOVER_MENU:
			return {
				...state,
				popoverMenuVisible: !state.popoverMenuVisible
			}
		default:
			return state
	}
}

export default app;