import * as api from '../api'

export const getListings = () => async(dispatch) => {
    try {
        const { data } = await api.fetchListings()
        
        dispatch({ type: 'FETCH_ALL', payload: data })
    } catch (error) {
        console.log(error.message)
    }  
}

export const getComments = () => async(dispatch) => {
    try {
        const { data } = await api.fetchComments()
        
        dispatch({ type: 'FETCH_COMMENTS', payload: data })
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

export const addComment = (comment) => async (dispatch) => {
    try {
        const { data } = await api.addComment(comment);
    
        dispatch({ type: 'COMMENT', payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const editComment = (id, comment) => async (dispatch) => {
    try {
      const { data } = await api.editComment(id, comment);
  
      dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
      console.log(error);
    }
};

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

export const likeListing = (id, userId) => async (dispatch) => {
    try {
        const { data } = await api.likeListing(id, userId);

        dispatch({ type: 'LIKE', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const setCurrentListing = (currentListing) => {
    return { type: 'SET_LISTING', payload: currentListing }
};

export const setCurrentUser = (currentUser) => {
    return { type: 'SET_ID', payload: currentUser }
};