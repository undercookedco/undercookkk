import { 
    USER_STATE_CHANGE, 
    RECIPES_STATE_CHANGE, 
    LIKED_RECIPE_STATE_CHANGE,
    USER_POSTS_STATE_CHANGE, 
    USER_FOLLOWING_STATE_CHANGE, 
    USERS_DATA_STATE_CHANGE,USERS_POSTS_STATE_CHANGE, 
    USERS_LIKES_STATE_CHANGE, CLEAR_DATA, RECIPE_STATE_CHANGE
} from '../constants/index'
import firebase from 'firebase'
import { SnapshotViewIOSComponent } from 'react-native'
require('firebase/firestore')

export function fetchUser() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
                }
                else {
                    console.log('does not exist')
                }
            })
    })
}

export function fetchRecipes() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("recipes")
            .get()
            .then((snapshot) => {
                let recipes = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data } 
                })
            dispatch({ type: RECIPES_STATE_CHANGE, recipes })
            })
    })
}

export function fetchLikedRecipes() {
    return ((dispatch) => {
        firebase.firestore()
            .collection(likedRecipe)
            .doc(firebase.auth().currentUser.uid)
            .collection(likedID)
            .get()
            .then((snapshot) => {
                let likedRecipe = snapshot.docs.map(doc => {
                    const id = doc.id;
                    return { id }
                })
            dispatch({ type: LIKED_RECIPE_STATE_CHANGE, likedRecipe})
            })
    })
}