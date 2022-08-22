

//type
const GET_SPOT = 'session/findSpot'


//actions
//find the spot
export const getSpot = (allSpots) => {
    return {
        type: GET_SPOT,
        payload: allSpots
    }
}



//thunk
export const spot = () => async (dispatch) => {
    const response = await fetch('/api/spots')
    console.log(response)
    if (response.ok) {
        const spots = response.json()
        dispatch(getSpot(spots));
        return spots
    }

}



//reducer
const initialState = {};

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SPOT:
            return { ...action.payload }
        default:
            return state;
    }
};

export default spotsReducer;
