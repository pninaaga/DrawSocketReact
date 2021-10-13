import produce from 'immer'

const initialState = {
    allPoints: []
}
export default produce((state = initialState, action) => {
    switch (action.type) {
        case 'SET_START_ALL_POINTS':
            state.allPoints = action.payload
            return state
        case 'AAD_POINT_TO_ARR':
            state.allPoints = state.allPoints.concat(action.payload)
            return state
        case 'AAD_MANY_POINT_TO_ARR':
            state.allPoints = [...state.allPoints,...action.payload]
            return state
        default:
            return state
    }
})