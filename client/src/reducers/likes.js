const likesReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_LIKES':
            return action.payload   
        default:
            return state
    }
};

export default likesReducer