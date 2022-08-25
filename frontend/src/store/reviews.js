import { csrfFetch } from "./csrf"

//type

const LOAD_REVIEWS = 'review/getReview'
const CURSPOT_REVIEWS = 'review/currentSpotReview'
const CREATE_REVIEWS = 'review/createReview'
const DELETE_REVIEWS = 'review/deleteReview'


//action creators

//get all reviews of current user
const getReviewAction = (payload) => {
    return {
        type: LOAD_REVIEWS,
        payload
    }
}

const getSpotReviewAction = (payload) => {
    return {
        type: CURSPOT_REVIEWS,
        payload
    }
}

const createReviewAction = (payload) => {
    return {
        type: CREATE_REVIEWS,
        payload
    }
}

const deleteReviewAction = (payload) => {
    return {
        type: DELETE_REVIEWS,
        payload
    }

}


//Thunk
//Get all reviews of current user
export const getReviewThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/reviews/current')
    //obj w/ Reviews arr
    if (response.ok) {
        const reviews = await response.json()
        dispatch(getReviewAction(reviews));
        return reviews
    }
    return response
}

export const getSpotReviewThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`)
    //obj w/ Reviews arr
    if (response.ok) {
        const reviews = await response.json()
        dispatch(getSpotReviewAction(reviews));
        return reviews
    }
    return response

}



//create a review for a spot
export const createReviewThunk = (id, data) => async (dispatch) => {
    const { review, stars } = data
    const response = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            review,
            stars

        })
    })

    if (response.ok) {
        const reviews = await response.json()
        console.log(reviews)
        dispatch(createReviewAction(reviews));
        return reviews
    }


}

//delete a review
export const deleteReviewThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    })

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
            action.payload.Reviews.forEach(review => {
                newState[review.id] = review;
            })
            return newState
        case CURSPOT_REVIEWS:
            newState = {}
            console.log(action)
            action.payload.Reviews.forEach(review => {
                newState[review.id] = review;
            })
            return newState
        case CREATE_REVIEWS:
            newState = { ...state }
            newState.reviews[action.payload.id] = action.payload
            return newState
        case DELETE_REVIEWS:
            newState = { ...state };
            delete newState[action.payload];
            return newState;
        default:
            return state
    }

}

export default reviewsReducer
