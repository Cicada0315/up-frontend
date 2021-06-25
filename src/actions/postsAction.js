import axios from 'axios';
const API = axios.create({ baseURL: 'http://127.0.0.1:3001' });

export const getPosts = () => async (dispatch) => {
    try {
        const res = await API.get('/posts');
        console.log(res);
        dispatch({ type: 'FETCH_POSTS', payload: res.data });
    } catch (error) {
        console.log(error);
    }
};

