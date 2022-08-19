import { csrfFetch } from './csrf';


//type
const SET_USER = 'session/setUser'
const REMOVE_USER = 'session/removeUser'


//actions
export const setUser = user => {
    return {
        type: SET_USER,
        payload: user
    }
}
export const removeUser = user => {
    return {
        type: REMOVE_USER,
        payload: user
    }
}


//thunk
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};


export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};



//reducer
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
