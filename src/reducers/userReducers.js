import { getActionStates, successState, loadingState, errorState} from '../utils/storeUtils'
import  { GET_ALL, ADD, GET_DETAIL } from '../actions/actionName'


export function getAllResponse(state={}, action){

	switch(action.type){
		case getActionStates(GET_ALL).success:
			return {
				...successState,
				data: action.data
			}
		case getActionStates(GET_ALL).inProgress:
			return {
				...loadingState,
				loading: action.loading
			}
		case getActionStates(GET_ALL).failure:
			return {
				...errorState,
				error: action.error
			}
		default: 
			return state;
	}
}

export function addResponse(state={}, action){

	switch(action.type){
		case getActionStates(ADD).success:
			return {
				...successState,
				data: action.data
			}
		case getActionStates(ADD).inProgress:
			return {
				...loadingState,
				loading: action.loading
			}
		case getActionStates(ADD).failure:
			return {
				...errorState,
				error: action.error
			}
		default: 
			return state;
	}
}

export function detailResponse(state={}, action){

	switch(action.type){
		case getActionStates(GET_DETAIL).success:
			return {
				...successState,
				data: action.data
			}
		case getActionStates(GET_DETAIL).inProgress:
			return {
				...loadingState,
				loading: action.loading
			}
		case getActionStates(GET_DETAIL).failure:
			return {
				...errorState,
				error: action.error
			}
		default: 
			return state;
	}
}