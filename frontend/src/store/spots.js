import { csrfFetch } from "./csrf"


//type
const LOAD_SPOT = 'spot/findSpot'
const ID_SPOT = 'spot/findSpotId'
const USER_SPOT = 'spot/findUserSpot'
const CREATE_SPOT = 'spot/createSpot'
const UPDATE_SPOT = 'spot/updateSpot'
const DELETE_SPOT = 'spot/deleteSpot'
const CREAT_IMAGE_SPOT = 'spot/addImageSpot'


//action creators
//find the spot
const getSpot = (allSpots) => {
    return {
        type: LOAD_SPOT,
        allSpots
    }
}

//get details of a spot from an ID

const getSpotById = (spotDetails) => {
    return {
        type: ID_SPOT,
        spotDetails
    }
}

//get spots from current user

const getSpotByUser = (userSpot) => {
    return {
        type: USER_SPOT,
        userSpot
    }
}

//create a spot
const createSpot = (addSpot) => {
    return {
        type: CREATE_SPOT,
        addSpot
    }
}

//update a spot
const updateSpot = (id, updateCurrentSpot) => {
    return {
        type: UPDATE_SPOT,
        updateCurrentSpot
    }

}

//delete a spot
const deleteSpot = (deleteCurrentSpot) => {
    return {
        type: DELETE_SPOT,
        deleteCurrentSpot
    }
}


//add an image
const createImageForSpot = (spotId, payload) => {
    return {
        type: CREAT_IMAGE_SPOT,
        spotId,
        payload
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

//get spots of current user
export const getCurrentUserSpot = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current')

    if (response.ok) {
        const currSpot = await response.json()
        dispatch(getSpotByUser(currSpot))
        return currSpot
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
export const updateLocation = (spotId, spotData) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price } = spotData;
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
export const deleteLocation = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteSpot(id));
    }

}

//add an image to a spot 
export const addImageSpotThunk = (spotId, url) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url,
            previewImage: true
        })
    })

    if (response.ok) {
        dispatch(createImageForSpot(spotId, url))
        return response
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
        case USER_SPOT:
            newState = {}
            action.userSpot.forEach(spot => {
                newState[spot.id] = spot;
            })
            return newState
        case CREATE_SPOT:
            newState = { ...state }
            newState.allSpots.Spots = action.addSpot
            return newState
        case CREAT_IMAGE_SPOT:
            newState = {
                ...state, [action.spotId]: {
                    ...state[action.spotId], previewImage: action.url
                }
            }
            return newState
        case UPDATE_SPOT:
            newState = { ...state }
            newState.allSpots = action.updateCurrentSpot
            return newState
        case DELETE_SPOT:
            newState = { ...state };
            delete newState[action.deleteCurrentSpot];
            return newState;
        default:
            return state;
    }
};

export default spotsReducer;
