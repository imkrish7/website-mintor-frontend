export const successState = {
	loading: false,
	error: false,
	success: true,
	data: null
}

export const loadingState = {
	loading: true,
	error: false,
	success: false,
	data: null
}
export const errorState = {
	loading: false,
	error: true,
	success: false,
	data: null
}


export function getActionStates(actionName){

	if(typeof actionName !== 'string'){
		throw new Error("Action name must be a string");
	}

	const actionNameUpper = actionName.toUpperCase();
	const inProgress = `FETCHING_${actionNameUpper}`;
	const success = `FETCHING_${actionNameUpper}_SUCCESS`;
	const failure =`FETCHING_${actionNameUpper}.ERRORED`;

	return {
		inProgress,
		success,
		failure
	}
}