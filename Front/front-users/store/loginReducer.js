export default function loginReducer(state=null, action) {
    switch (action.type) {
        case 'login':
            return action.payload
        case 'logout':
            return null
        default:
            return state
    }
}