import { csrfFetch } from './csrf';

//types

const GET_USER_BOOKINGS = 'bookings/userID';
const UPDATE = 'bookings/update'
const DELETE = 'bookings/delete'
const ADD = 'bookings/add'

//actions


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

const initialState = { userBookings: {} };

const bookingsReducer = (state = initialState, action) => {

    let bookings;

    switch (action.type) {
        case GET_USER_BOOKINGS:
            bookings = { ...state, userBookings: { ...state.userBookings } }
            let book = {}
            for (let books of action.payload.Bookings) {
                book[books.id] = books
            }
            bookings.userBookings = book
            return bookings
        case ADD:
            bookings = { ...state, userBookings: { ...state.userBookings } }
            bookings.userBookings[action.payload.id] = action.payload
            return bookings
        case UPDATE:
            bookings = { ...state, userBookings: { ...state.userBookings } }
            bookings.userBookings[action.payload.id] = action.payload
            return bookings
        case DELETE:
            bookings = { ...state, userBookings: { ...state.userBookings } }
            delete bookings.userBookings[action.payload]
            return bookings

        default:
            return state;
    }
};

export default bookingsReducer;
