import { combineReducers } from 'redux'

import drawReducer from './draw.reducer'

export default combineReducers({
    drawReducer: drawReducer,
})
