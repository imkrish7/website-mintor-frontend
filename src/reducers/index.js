import { combineReducers } from 'redux'
import { getAllResponse, addResponse, detailResponse } from './userReducers'
const rootReducer = combineReducers({
	getAllResponse,
	addResponse,
	detailResponse

});

export default rootReducer;