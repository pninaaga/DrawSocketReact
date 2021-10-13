export function setStartAllPoints(value) {
    debugger
    return {
        type: 'SET_START_ALL_POINTS',
        payload: value
    }
}
export function addPointToArr(value) {
    return {
        type: 'AAD_POINT_TO_ARR',
        payload: value
    }
}
export function addManyPointToArr(value) {
    return {
        type: 'AAD_MANY_POINT_TO_ARR',
        payload: value
    }
}