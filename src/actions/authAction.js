import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:3001' });

export const signup = (inputs, history) => async (dispatch) => {
    try {
        const res = await API.post('/users', {
            user: {
              firstname: inputs.firstname,
              lastname: inputs.lastname,
              email: inputs.email,
              password: inputs.password,
              password_confirmation: inputs.cpassword
            }
        });
        const data=res.data;
        dispatch({ type: 'LOG_IN', data });
        history.push('/');
    } catch (error) {
        console.log(error.response);
        alert(error.response.data.errors);
    }
};

export const signin = (inputs, history) => async (dispatch) => {
    try {
        const res = await API.post('/login', {
            user: {
              email: inputs.email,
              password: inputs.password
            }
        });
        const data=res.data;
        dispatch({ type: 'LOG_IN', data });
        history.push('/');
    } catch (error) {
        console.log(error);
        alert(error.response.data.errors);
    }
};
