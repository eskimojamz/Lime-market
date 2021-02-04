export default (listings = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL': 
            return action.payload
        case 'CREATE': 
            return [...listings, action.payload]
        case 'UPDATE':
            return listings.map((listing) => (listing._id === action.payload._id ? action.payload : listing));
        default:
            return listings
    }
}