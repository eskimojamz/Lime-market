const currentListingReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_LISTING':
            return action.payload
        default:
            return state
    }
}

export default currentListingReducer