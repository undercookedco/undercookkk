import { RECIPES_STATE_CHANGE } from '../constants';

const initialState = {
    recipes : [],
}

export const recipes = (state = initialState, action) => {
    switch (action.type) {
        case RECIPES_STATE_CHANGE:
            return {
                ...state,
                recipes: action.recipes
            }
        default:
            return state;
    }
}