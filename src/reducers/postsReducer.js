export default function posts(state= [], action){
    switch (action.type) {
        case 'FETCH_POSTS':
            return action.payload;
           
        case 'CREATE_POST':
            return [...state, action.payload];
        
        case 'UPDATE_POST':
            return state.map((state) => (state._id === action.payload.id ? action.payload : state));
        
        default:
            return state;
    }
}