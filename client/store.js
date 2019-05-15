import {createStore, applyMiddleware} from 'redux'
// import rootReducer from './reducers'

//action types
const SET_TRIP = 'SET_TRIP'

//action creators
export const setTrip = (tripId) => ({
    type: SET_TRIP,
    tripId
})

const initialState = {
    currentTrip: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_TRIP:
        return {currentTrip: action.tripId}
    default:
        return state
    }
}

const store = createStore(reducer)

export default store