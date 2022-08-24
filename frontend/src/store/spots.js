import { csrfFetch } from "./csrf"


//type
const LOAD_SPOT = 'spot/findSpot'
const ID_SPOT = 'spot/findSpotId'
const CREATE_SPOT = 'spot/createSpot'
const UPDATE_SPOT = 'spot/updateSpot'
const DELETE_SPOT = 'spot/deleteSpot'


//action creators
//find the spot
export const getSpot = (allSpots) => {
    return {
        type: LOAD_SPOT,
        allSpots
    }
}

//get details of a spot from an ID

export const getSpotById = (spotDetails) => {
    return {
        type: ID_SPOT,
        spotDetails
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
export const updateSpot = (updateCurrentSpot) => {
    return {
        type: UPDATE_SPOT,
        updateCurrentSpot
    }

}

//delete a spot
export const deleteSpot = (deleteCurrentSpot) => {
    return {
        type: DELETE_SPOT,
        deleteCurrentSpot
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
export const getSpotId = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    if (response.ok) {
        const spotDetails = await response.json()
        dispatch(getSpotById(spotDetails));
        return spotDetails
    }

}

//create thunk
export const addSpots = (addSpot) => async (dispatch) => {
    const { address, city, state, lat, lng, country, name, description, price } = addSpot;
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            address,
            city,
            state,
            lat,
            lng,
            country,
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
export const updateLocation = (spotId) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price } = spotId;
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
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
export const deleteLocation = (deleteCurrentSpot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${deleteCurrentSpot.id}`, {
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
            newState = {}
            action.allSpots.Spots.forEach(spot => {
                newState[spot.id] = spot;
            })
            return newState
        case ID_SPOT:
            newState = { ...state }
            //first part is normalizing the data by creating the id for each obj
            // = is reassinging the obj (on the left side)
            //inside the object we are merging the old and the new and taking all parts combined. merging the overlapping info and taking the info from the 2nd obj
            newState[action.spotDetails.id] = { ...newState[action.spotDetails.id], ...action.spotDetails }
            return newState
        case CREATE_SPOT:
            newState = { ...state }
            newState.allSpots.Spots = action.addSpot
            return newState
        case UPDATE_SPOT:
            newState = { ...state }
            console.log(state, action)
            
            return newState
        case DELETE_SPOT:
            // const newState = { ...state };
            // need to find out what it returns spots
            // delete newState[action.spot.id];
            return newState;
        default:
            return state;
    }
};

export default spotsReducer;
