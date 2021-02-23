import * as api from '../api'

export const getListings = () => async(dispatch) => {
    try {
        const { data } = await api.fetchListings()
        
        dispatch({ type: 'FETCH_ALL', payload: data })
    } catch (error) {
        console.log(error.message)
    }  
}

export const createListing = (listing) => async (dispatch) => {
    try {
        const { data } = await api.createListing(listing)

        dispatch({ type: 'CREATE', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const updateListing = (id, listing) => async (dispatch) => {
    try {
      const { data } = await api.updateListing(id, listing);
  
      dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
      console.log(error);
    }
};
  
// export const followListing = (id) => async (dispatch) => {
//     try {
//         const { data } = await api.followListing(id);

//         dispatch({ type: LIKE, payload: data });
//     } catch (error) {
//         console.log(error.message);
//     }
// };
  
export const deleteListing = (id) => async (dispatch) => {
    try {
        await api.deleteListing(id);

        dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
        console.log(error.message);
    }
};

export const setCurrentId = (currentId) => {
    return { type: 'SET_ID', payload: currentId }
};