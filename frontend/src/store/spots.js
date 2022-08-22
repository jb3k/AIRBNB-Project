//type
const LOAD_SPOT = 'session/findSpot'


//actions
//find the spot
export const getSpot = (allSpots) => {
    return {
        type: LOAD_SPOT,
        allSpots
    }
}


//thunk
export const spot = () => async (dispatch) => {
    const response = await fetch('/api/spots')

    if (response.ok) {
        const spots = await response.json()
        dispatch(getSpot(spots));
        return spots
    }
}


//reducer
const initialState = {};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOT:
            const allProperties = {};
            action.allSpots.Spots.forEach(spot => {
                allProperties[spot.id] = spot;
            })
            return {
                ...allProperties
            }
        default:
            return state;
    }
};

export default spotsReducer;
