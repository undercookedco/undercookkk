import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    Text, 
    Image, 
    FlatList,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Dimensions,
    ScrollView
} from 'react-native';
import CalendarSearchBar from './CalendarSearchBar';

import firebase from 'firebase';
require('firebase/firestore');

import { connect } from 'react-redux';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function CalendarSearch(props) {
    const [category, setCategory]= useState([
        {name: 'Local', key: '1', color : '#fce598', image: require('../../assets/images/local.png')},
        {name: 'Western', key: '2', color: '#bee9fe', image: require('../../assets/images/western.png')},
        {name: 'Italian', key: '3', color: '#fca996', image: require('../../assets/images/italian.png')},
        {name: 'Japanese', key: '4', color: '#d1aedd', image: require('../../assets/images/japanese.png')},
        {name: 'Mexican', key: '5', color: '#80dabe', image: require('../../assets/images/mexican.png')},
        {name: 'Korean', key: '6', color: '#fed698', image: require('../../assets/images/korean.png')},
        {name: 'Vegetarian', key: '7',color: 'rgba(233,127,87,1)', image: require('../../assets/images/vegetarian.png')},
        {name: 'Halal', key: '8', color:'#fff', image: require('../../assets/images/halal.png')}
    ])

    const viewRecipe = (item) => { 
        console.log(item)
        props.navigation.navigate('RecipeView', {item})
    }

    const fetchRecipes = (category) => {
        firebase.firestore()
        .collection('recipes')
        .where('category', '>=', category)
        .get()
        .then((snapshot) => {
            let recipes = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ... data}
            });
            setRecipes(recipes)
        })
    }

    return (
        <>
            <CalendarSearchBar viewRecipe={viewRecipe} />
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={2}
                    horizontal={false}
                    data={category}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            //onPress = {(item) => recipeView(item)}
                            style={{ backgroundColor: item.color, ...styles.containerImage}}>
                            <Image
                            style={styles.image}
                                source={item.image}
                            />
                            <Text style={styles.text} >{item.name}</Text>
                        </TouchableOpacity>
                )}
                />
            </View>
        </>   
    )
}

const styles = StyleSheet.create({
    container: {
       paddingHorizontal: 20,
       marginTop: 20,
       marginBottom: 100
    },
    containerGallery: {
    marginTop : 15,
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    height: '70%'
    },
    containerImage:{
        flex: 1/2,
        aspectRatio: 1/1,
        borderRadius: 30,
        marginHorizontal: 5,
        marginVertical: 5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: { 
        flex: 1,
        aspectRatio: 1/1,
        
    },
    text: {
        fontSize: 15,
        paddingBottom: 10
    }
  
})

const mapStateToProps = (store) => ({
    recipes : store.recipesState.recipes
})

export default connect(mapStateToProps, null)(CalendarSearch)