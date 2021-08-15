import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard, 
  Dimensions
} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

import firebase from 'firebase';
require('firebase/firestore');
import { connect } from 'react-redux'

class RecipeCalendar extends Component {
    constructor(props) {
        super(props)
    }

    back = () => {
    this.props.navigation.popToTop();
  }
    render() {
    const { recipe } = this.props.route.params
    console.log(recipe)
    return (
        <View style = {styles.container}>
          <View style ={styles.header}>
            <TouchableOpacity 
            onPress={() => this.back()}>
              <AntDesign name="left" size={32} color="white" style={{paddingLeft:10}}/>
            </TouchableOpacity>
            <Text style={styles.foodTitle}>{recipe.name}</Text>
          </View>
            <View style ={styles.imageContainer}>
            <Image source ={{uri: recipe.image}} style = {{width:220, height:220, alignSelf:'center', borderRadius:15}}/> 
                <View style ={styles.bar}>
                  <Ionicons name="ios-person-outline" size={24} color="white" />
                  <Text style={{color: 'white'}}>{recipe.servings}</Text>
                  <MaterialIcons name="access-time" size={24} color="white" />
                  <Text style={{color: 'white'}}>{recipe.time}</Text>
                  <Ionicons name="speedometer-outline"  size={24} color="white" />
                  <Text style={{color: 'white'}}>{recipe.difficulty}</Text>
                </View>
            </View>
            <ScrollView>
            <View style ={styles.bottom}>
              <Text style= {{marginTop: 15, fontSize:20, paddingLeft:15}}>Ingredients</Text>
              <ScrollView horizontal={true}>
                <View style ={styles.ingredientsScroll}>
                  {
                   recipe.ingredients.map((ing) => {
                    return (
                    <View style ={styles.ingredientsBox}>
                    <Text style ={styles.ingredientText}>{ing}</Text>
                    </View>
                   )})
                  }
                </View>
              </ScrollView>
              <Text style= {{marginTop: 0, fontSize:20, paddingLeft:15}}>Instructions</Text>
              <View style={styles.dirContainer}>
              {
                  recipe.directions.map((dir) => {
                      return (
                        <Text style={styles.directions}>{dir}</Text>
                      )
                  })
              } 
              </View>
            </View>
            </ScrollView>
        
   </View>
    )}
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  likedRecipe: store.userState.likedRecipe,
})

export default connect(mapStateToProps, null)(RecipeCalendar);

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'rgba(255, 226, 216, 1)'
    },
    imageContainer:{
        height: 320,
        backgroundColor: 'rgba(233,127,87,1)',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingTop:0,
        justifyContent: 'center',
    },

    bar: {
        height: 30,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingHorizontal:20
        
    },
    header: {
      height:80,
      backgroundColor:'rgba(233,127,87,1)',
      paddingTop:35,
      flexDirection:'row',
      justifyContent: 'flex-start',
      alignItems:'flex-start'
    },
    foodTitle:{
      fontSize:20,
      paddingLeft:5,
      paddingTop:3,
      color: 'white'
    },
    startButton: {
      borderRadius:40,
      height:40,
      justifyContent: 'space-around',
      width: 200,
      marginTop:50,
      marginLeft:150,
      backgroundColor:'rgba(233,127,87,1)',
      flexDirection: 'row'
    },
    ingredientsScroll:{
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      height:120,
      marginLeft:8
    },
    ingredientsBox: {
        height: 100,
        width: 100,
        borderRadius:15,
        marginHorizontal:10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(243,157,145,1)'
    },
      ingredientText: {
        fontSize: 16,
        textAlign: 'center'
    },
    massText:{
      alignSelf:'center',
      marginTop:30,
      fontSize:30
    },
    directions:{
      fontSize: 15,
      paddingLeft:15,
      paddingRight: 15,
      marginVertical: 10,
    },
    bottom: {
      flexDirection:'column'
    },
    dirContainer: {
        paddingHorizontal: 20,
        flex: 1,
        marginHorizontal: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        marginTop: 10,
        paddingTop: 10
    }
})