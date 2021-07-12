import axios from 'axios';
const API = axios.create({ baseURL: 'http://127.0.0.1:3001' });

export const getPosts = () => async (dispatch) => {
    try {
        const res = await API.get('/posts');
        dispatch({ type: 'FETCH_POSTS', payload: res.data });
    } catch (error) {
        console.log(error);
        alert(error.response.data.errors);
    }
};

export const createPost = (post, history, token) => async (dispatch) => {
    try{
        const res = await API.post('/posts', {
            Authorization: 'Bearer ' + token,
            post
        })
        dispatch({type: 'CREATE_POST', payload: res.data });
        history.push('/posts');
    } catch (error){
        console.log(error);
        alert(error.response.data.errors);
    }
};

export const updatePost = (id, post, history, token, setCurrentPostId) => async (dispatch) => {
    try {
        const res = await API.patch(`/posts/${id}`, {
            Authorization: 'Bearer ' + token,
            post
        })
        dispatch({ type: 'UPDATE_POST', payload: res.data });
        setCurrentPostId(null);
        history.push('/posts');
    } catch (error) {
        console.log(error.response);
        alert(error.response.data.errors);
    }
};

export const deletePost = (id, history, token, setSubmitted) => async (dispatch) => {
    try {
        await API.delete(`/posts/${id}`);
        dispatch({ type: 'DELETE_POST', payload: id });
        setSubmitted(false);
        history.push('/posts');
    } catch (error) {
        console.log(error);
    }
};