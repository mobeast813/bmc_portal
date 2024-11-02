import { legacy_createStore as createStore } from "redux";

const initialState = {
	sidebarShow: true,
	theme: "light",
	loggedInUserTabs: [],
	showAlertModal: { isShow: false, title: "", msg: "" },
	showConfirmModal: { isShow: false, title: "", msg: "", onConfirm: () => { } },
	selectedUserInfo: { userId: "", name: "", email: "" },
};

const changeState = (state = initialState, { type, ...action }) => {
	switch (type) {
		case "set":
			var result = { ...state, ...action }
			return result;
		case "modal":
			var result = { ...state, ...action }
			return result;
		case "user":
			var result = { ...state, ...action }
			return result;
		default:
			return state;
	}
};

// const rootReducer = combineReducers({ changeState, changeState2 })
// const store = createStore(rootReducer);
const store = createStore(changeState);
export default store;
