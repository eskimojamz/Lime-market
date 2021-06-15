const listingsReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL': 
            return action.payload
        case 'CREATE': 
            return [...state, action.payload]
        case 'UPDATE':
            return state.map((listing) => (listing._id === action.payload._id ? action.payload : listing));
        case 'DELETE':
            return state.filter((listing) => (listing._id !== action.payload))
        case 'LIKE':
            return state.map((listing) => (listing._id === action.payload._id ? action.payload : listing));
        default:
            return state
    }
}

export default listingsReducer