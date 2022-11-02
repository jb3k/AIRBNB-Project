const SEARCH_ALL = 'search/searchAll'



const getAll = (payload) => {
    return {
        type: SEARCH_ALL,
        payload
    }
}

//thunks
export const searchAllThunk = () => async dispatch => {
    const response = await fetch('/api/spots')
    if (response.ok) {
        let spots = await response.json()
        dispatch(getAll(spots))
        return spots
    }
}



const initialState = {}
const searchReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SEARCH_ALL: {
            newState = {}
            action.payload.Spots.forEach(spot => newState[spot.id] = spot)
            return newState
        }
        default:
            return state
    }
}

export default searchReducer
