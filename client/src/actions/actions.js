import * as api from '../api/api'

export const getListings = () => async(dispatch) => {
    try {
        const { data } = await api.fetchListings()
        
        dispatch({ type: 'FETCH_ALL', payload: data })
    } catch (error) {
        console.log(error.message)
    }  
}

export const getListing = (listingId) => async(dispatch) => {
    try {
        const { data } = await api.fetchListing(listingId)
        
        dispatch({ type: 'FETCH_LISTING', payload: data })
    } catch (error) {
        console.log(error.message)
    }  
}

export const authUser = (userCredentials) => () => {
    try {
        api.authUser(userCredentials)
    } catch (error) {
        console.log(error.message)
    }  
}

export const getUser = (userId) => async(dispatch) => {
    try {
        const { data } = await api.fetchUser(userId)
        
        dispatch({ type: 'FETCH_USER', payload: data })
    } catch (error) {
        console.log(error.message)
    }  
}

export const getComments = (listingId) => async(dispatch) => {
    try {
        const { data } = await api.fetchComments(listingId)
        
        dispatch({ type: 'FETCH_COMMENTS', payload: data })
    } catch (error) {
        console.log(error.message)
    }  
}

export const createListing = (newListing, auth) => (dispatch) => {
    try {
        const { data } = api.createListing(newListing, auth)

        dispatch({ type: 'CREATE', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const addComment = (comment, auth) => async() => {
    try {
        const { data } = await api.addComment(comment, auth);
        console.log(data)
        return data;
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

export const deleteComment = (commentId, auth) => async () => {
    try {
        await api.deleteComment(commentId, auth);
    } catch (error) {
        console.log(error.message);
    }
};

// export const updateListing = (listingId, updatedListing) => async (dispatch) => {
//     try {
//       const { data } = await api.updateListing(listingId, updatedListing);
  
//       dispatch({ type: 'UPDATE', payload: data });
//     } catch (error) {
//       console.log(error);
//     }
// };

// export const getLikes = (listingId) => () => {
//     try {
//       api.fetchLikes(listingId);
//     } catch (error) {
//       console.log(error);
//     }
// };

// export const likeCount = (listingId, updatedCount, auth) => () => {
//     try {
//       api.likeCount(listingId, updatedCount, auth);
//     } catch (error) {
//       console.log(error);
//     }
// };

// export const likeListing = (userId, watchlist, auth) => () => {
//     try {
//         api.likeListing(userId, watchlist, auth);
//     } catch (error) {
//         console.log(error.message);
//     }
// };
  
// export const deleteListing = (id) => async (dispatch) => {
//     try {
//         await api.deleteListing(id);

//         dispatch({ type: 'DELETE', payload: id });
//     } catch (error) {
//         console.log(error.message);
//     }
// };

// export const likeListing = (id, userId) => async (dispatch) => {
//     try {
//         const { data } = await api.likeListing(id, userId);

//         dispatch({ type: 'LIKE', payload: data });
//     } catch (error) {
//         console.log(error.message);
//     }
// }


export const setCurrentListing = (currentListing) => {
    return { type: 'CURRENT_LISTING', payload: currentListing }
};

// export const loginUser = (loginCredentials) => async (dispatch) => {
//     try {
//         const { data } = await api.loginUser(loginCredentials)

//         dispatch({ type: 'LOGIN', payload: data })
//     } catch (error) {
//         console.log(error.message)
//     }
// }