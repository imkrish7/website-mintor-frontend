import axios from 'axios';


function apiRequest(dispatch,reqObj,successAction, loadingAction,errorAction){

	const headers = {
		'Content-Type': 'application/json'
	}


	reqObj["headers"] = {...headers}

	if(dispatch && loadingAction){
		dispatch(loadingAction(true));
	}

	axios(reqObj).then(res => {

		if(dispatch && loadingAction) dispatch(loadingAction(false))

		if(dispatch && successAction) dispatch(successAction(res.data))
	}).catch(error=>{
		console.error(error);
		if(dispatch && errorAction) dispatch(errorAction(error.response));
	})
}


export const makeRequest = {
	post: (dispatch, params, url, successAction, loadingAction, errorAction)=>{
		let completeUrl = `http://localhost:5000/api/${url}`

		let reqObj = { method: "POST", url: completeUrl ,data: JSON.stringify(params)}

		return apiRequest(dispatch, reqObj, successAction, loadingAction, errorAction)
	},
	get: (dispatch, params, url, successAction, loadingAction, errorAction)=>{
		let completeUrl = `http://localhost:5000/api/${url}`

		let reqObj = { method: "GET", url: completeUrl , params: params}

		return apiRequest(dispatch, reqObj, successAction, loadingAction, errorAction)
	}

}