import { combineReducers } from 'redux'
import { user } from './user'
import { users } from './users'
import { recipes } from './recipes';

const Reducers = combineReducers({
    userState: user,
    usersState: users,
    recipesState: recipes
})

export default Reducers