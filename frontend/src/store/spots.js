import { csrfFetch } from "./csrf"


//type
const LOAD_SPOT = 'session/findSpot'
const ID_SPOT = 'session/findSpotId'
const CREATE_SPOT = 'session/createSpot'
const UPDATE_SPOT = 'session/updateSpot'
const DELETE_SPOT = 'session/deleteSpot'


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

//update a spot
export const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }

}

//delete a spot
export const deleteSpot = spot => {
    return {
        type: DELETE_SPOT,
        spot
    }
}



//thunk

//get all
export const spot = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')

    if (response.ok) {
        const spots = await response.json()
        dispatch(getSpot(spots));
        return spots
    }
}

//get by id
export const spotId = (id) => async (dispatch) => {
    const response = await fetch(`/api/spots/${id}`)

    if (response.ok) {
        const spots = await response.json()
        dispatch(getSpotById(spots));
        return spots
    }
}

//create thunk
export const addSpots = (spot) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price } = spot;
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify({
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


//update thunk
export const updateLocation = (spot) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price } = spot;
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        body: JSON.stringify({
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
        dispatch(updateSpot(data))
        return data
    }

}

//delete thunk
export const deleteLocation = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        // const { id: deletedItemId } = await response.json();
        // dispatch(deleteSpot(spot.id));
        // return deletedItemId;
    }

}

//reducer
const initialState = {};

const spotsReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_SPOT:
            const allProperties = {};
            action.allSpots.Spots.forEach(spot => {
                allProperties[spot.id] = spot;
            })
            return {
                ...allProperties
            }
        // case ID_SPOT:
        //     return {
        //         ...allProperties,
        //     }
        case CREATE_SPOT:
            newState = {...state}
            newState.allSpots.Spots = action.addSpot
            return newState
        // case UPDATE_SPOT:
        //  return {
        //     ...state, 
        //     [action.spot.id] = action.spot
        // }
        // case DELETE_SPOT:
        //     // const newState = { ...state };
        //     // need to find out what it returns spots
        //     // delete newState[action.spot.id];
        //     return newState;

        default:
            return state;
    }
};

export default spotsReducer;
