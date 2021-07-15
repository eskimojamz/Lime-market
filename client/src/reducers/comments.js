const commentsReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_COMMENTS': 
            return action.payload
        case 'COMMENT': 
            return [...state, action.payload]
        case 'EDIT_COMMENT':
            return action.payload
        case 'DELETE_COMMENT':
            return [...state, state.filter((comment) => (comment._id !== action.payload))]
        default:
            return state
    }
}

export default commentsReducer