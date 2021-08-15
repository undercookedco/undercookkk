import { 
    USER_STATE_CHANGE, 
    LIKED_RECIPE_STATE_CHANGE,
    CALENDAR_STATE_CHANGE,
    CLEAR_DATA 
} from "../constants"

const initialState = {
    currentUser: null,
    likedRecipe: [],
    calendar: [],
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case LIKED_RECIPE_STATE_CHANGE:
            return {
                ...state,
                likedRecipe: action.likedRecipe
            }

        case CALENDAR_STATE_CHANGE:
            return {
                ...state,
                following: action.calendar
            }
        case CLEAR_DATA:
            return initialState
        default:
            return state;
    }
}