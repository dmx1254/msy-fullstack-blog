const initialState = {}

export const toolsReducers = (state = initialState, action) =>{
    switch(action.type){
        case 'STARTLOADING':
            return {
                ...state,
                loading: action.payload.loading
            }
        case 'ENDLOADING':
            return {
                ...state,
                loading: action.payload.loading
            }
        case 'LOGOUT':
            return {
                ...state,
                logout: action.payload.logout
            }
        case 'ENDLOGOUT':
            return {
                ...state,
                logout: action.payload.logout
            }


        default:
            return state;
    }
}