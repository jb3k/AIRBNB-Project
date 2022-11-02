import { csrfFetch } from './csrf';

//types
const GET_SPOT_BOOKINGS = 'bookings/spotID'
const GET_USER_BOOKINGS = 'bookings/userID';
const UPDATE = 'bookings/update'
const DELETE = 'bookings/delete'
const ADD = 'bookings/add'

//actions


const spotBooking = (payload) => {
    return {
        type: GET_SPOT_BOOKINGS,
        payload
    }


}

const getBookings = (userBookings) => {
    return {
        type: GET_USER_BOOKINGS,
        payload: userBookings
    }
}

const addBooking = (newBooking) => {
    return {
        type: ADD,
        payload: newBooking
    }
}

const updateBooking = (newBooking) => {
    return {
        type: UPDATE,
        payload: newBooking
    }
}

const deleteBooking = (id) => {
    return {
        type: DELETE,
        payload: id
    }
}



//thunks
export const getUserBookingsThunk = () => async (dispatch) => {

    const response = await csrfFetch(`/api/bookings/current`);
    const userBookings = await response.json();

    dispatch(getBookings(userBookings));
    return response;
};

export const getSpotBookingsThunk = (id) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${id}/bookings`);
    if (response.ok) {
        const booking = await response.json()
        dispatch(spotBooking(booking));
        return booking
    }

    return response
}


export const addBookingThunk = (spotId, payload) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    const newBooking = await response.json();

    dispatch(addBooking(newBooking));
    return response;
};


export const updateBookingThunk = (id, payload) => async (dispatch) => {

    const response = await csrfFetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    const newBooking = await response.json();

    dispatch(updateBooking(newBooking));
    return response;
};




export const deleteBookingThunk = (id) => async (dispatch) => {

    const response = await csrfFetch(`/api/bookings/${id}`, {
        method: 'DELETE',
    });
    const deleted = await response.json();
    dispatch(deleteBooking(id));
    return response;
};

//reducer

const initialState = {};

const bookingsReducer = (state = initialState, action) => {

    let newState

    switch (action.type) {
        case GET_USER_BOOKINGS:
            newState = {}
            action.payload.Bookings.forEach(booking => {
                newState[booking.id] = booking
            })
            return newState
        case GET_SPOT_BOOKINGS:
            newState = {}
            action.payload.Bookings.forEach(booking => {
                newState[booking.id] = booking
            })
            return newState
        case ADD:
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        case UPDATE:
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        case DELETE:
            newState = { ...state }
            delete newState[action.payload]
            return newState

        default:
            return state;
    }
};

export default bookingsReducer;
