const authReducer = (state = { currentUser: {} }, action) => {
    switch (action.type) {
        case 'LOG_IN':
            localStorage.setItem('userinfo', JSON.stringify({ ...action.data }));
            return { ...state, currentUser: action.data}
        default:
            return state;
    }
};
  
export default authReducer;