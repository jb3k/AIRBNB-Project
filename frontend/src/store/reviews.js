import { csrfFetch } from "./csrf"

//type

const LOAD_REVIEWS = 'review/getReview'
const CREATE_REVIEWS = 'review/createReview'
const DELETE_REVIEWS = 'review/deleteReview'


//action creators

export const getReviewAction = (payload) => {
    return {
        type: LOAD_REVIEWS,
        payload
    }
}


export const createReviewAction = (payload) => {
    return {
        type: CREATE_REVIEWS,
        payload
    }
}

export const deleteReviewAction = (payload) => {
    return {
        type: DELETE_REVIEWS,
        payload
    }

}


//Thunk
//Get all reviews of current user
export const getReviewThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/reviews/current')

    if (response.ok) {
        const reviews = await response.json()
        dispatch(getReviewAction(reviews));
        return reviews
    }
}

//create a review for a spot
export const createReviewThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`)

    if (response.ok) {
        const reviews = await response.json()
        dispatch(createReviewAction(reviews));
        return reviews
    }

}

//delete a review
export const deleteReviewThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`)

    if (response.ok) {
        dispatch(deleteReviewAction(id));
    }

}



//reducer

const initialState = {}
const reviewsReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_REVIEWS:
            newState = {}
            // action.payload.Reviews.forEach(review => {
            //     newState[review.id] = review;
            // })
            return newState
        case CREATE_REVIEWS:
            newState = { ...state }
            // newState.allSpots.Spots = action.addSpot
            return newState
        case DELETE_REVIEWS:
            newState = { ...state };
            delete newState[action.payload];
            return newState;
    }

}

export default reviewsReducer
