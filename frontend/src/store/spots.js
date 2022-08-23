//type
const LOAD_SPOT = 'session/findSpot'
const ID_SPOT = 'session/findSpotId'
const CREATE_SPOT = 'session/createSpot'


//actions
//find the spot
export const getSpot = (allSpots) => {
    return {
        type: LOAD_SPOT,
        allSpots
    }
}

//get details of a spot from an ID

export const getSpotById = (id) => {
    return {
        type: ID_SPOT,
        id
    }
}

//create a spot
export const createSpot = (addSpot) => {
    return {
        type: CREATE_SPOT,
        addSpot
    }
}


//thunk

//get all
export const spot = () => async (dispatch) => {
    const response = await fetch('/api/spots')

    if (response.ok) {
        const spots = await response.json()
        dispatch(getSpot(spots));
        return spots
    }
}

// //get by id
// export const spotId = (id) => async (dispatch) => {
//     const response = await fetch(`/api/spots/${id}`)

//     if (response.ok) {
//         const spots = await response.json()
//         dispatch(getSpotById(spots));
//         return spots
//     }
// }

//create
export const addSpots = (spot) => async (dispatch) => {
    const { ownerId, address, city, state, country, lat, lng, name, description, price } = spot;
    const response = await fetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify({
            ownerId,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(createSpot(data))
        return data
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
        case ID_SPOT:
            // action.find((spot) => { spot.id === action.id})
            // return {
            //     ...allProperties,
            // }

        case CREATE_SPOT:
            const newState = {}
            newState = Object.assign({}, state);
            newState.spot = action.addSpot
            return newState
        default:
            return state;
    }
};

export default spotsReducer;
