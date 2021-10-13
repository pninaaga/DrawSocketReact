import { createStore, applyMiddleware } from 'redux'
import reducer from '../redux/reducer/index'

const store = createStore(
    reducer,
)

window.store = store
export default store

store.dispatch({ type: 'EXTRACT_JWT' })