import { GET_ALL, ADD, GET_DETAIL } from './actionName'
import { getActionStates } from '../utils/storeUtils'
import { makeRequest } from '../services/networkrequest'

export const getAllLoading = (loading)=>{
	return{
		type: getActionStates(GET_ALL).inProgress,
		loading
	}
}

export const getAllError = (error)=>{

	return {
		type: getActionStates(GET_ALL).failure,
		error
	}
}

export const getAllSuccess = (data)=>{
	return {
		type: getActionStates(GET_ALL).success,
		data
	}
}

export const getAll = (params)=> {
	let url = 'all'

	return dispatch => makeRequest.get(dispatch, params, url, getAllSuccess, getAllLoading, getAllError)
}


export const addLoading = (loading)=>{
	return{
		type: getActionStates(ADD).inProgress,
		loading
	}
}

export const addError = (error)=>{

	return {
		type: getActionStates(ADD).failure,
		error
	}
}

export const addSuccess = (data)=>{
	return {
		type: getActionStates(ADD).success,
		data
	}
}

export const getAdd = (params)=> {
	let url = 'add'

	return dispatch => makeRequest.post(dispatch, params, url, addSuccess, addLoading, addError)
}


export const getDetailLoading = (loading)=>{
	return{
		type: getActionStates(GET_DETAIL).inProgress,
		loading
	}
}

export const getDetailError = (error)=>{

	return {
		type: getActionStates(GET_DETAIL).failure,
		error
	}
}

export const getDetailSuccess = (data)=>{
	return {
		type: getActionStates(GET_DETAIL).success,
		data
	}
}

export const getDetail = (params)=> {
	let url = 'detail'
	return dispatch => makeRequest.get(dispatch, params, url, getDetailSuccess, getDetailLoading, getDetailError)
}