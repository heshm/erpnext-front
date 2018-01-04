import
{
	COLLAPSE_MENU,FETCH_START,UPDATE_STATE
} from '../actions'

const initialState = {
	appId: '',
	loading: false,
	menuCollapsed: false,
	userInfo: {},
	appList: [],
	menuItem: []
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
		default:
			return state
	}
}

export default app;