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

function CalendarRecipeView(props) {
  const [isLiked, setIsLiked] = useState(false);
  const { item } = props.route.params;

  const addRecipe = (item) => {
    firebase.firestore()
      .collection(calendar)
      .docs(firebase.auth().currentUser.uid)
      .set({
          [item.date] : [item]
      })
    console.log(item)
  }

  const formatRecipe = (time, item, uid, name) => {
    if (time === 'bfast') {
      item.bfast = {'name' : name, 'uid': uid, 'done': false}
    } else if (time === 'lunch') {
      item.lunch = {'name' : name, 'uid': uid, 'done': false}
    } else {
      item.dinner = {'name' : name, 'uid': uid, 'done': false}
    }
    addRecipe(item)
  }

  const likeRecipe = () => { 
    console.log('presslike')
    setIsLiked(!isLiked)
    firebase.firestore()
        .collection('likedRecipe')
        .doc(firebase.auth().currentUser.uid)
        .collection('likedID')
        .doc(item.id)
        .set({})
  }

  const unlikeRecipe = () => {
    console.log('pressunlike')
    setIsLiked(!isLiked)
    firebase.firestore()
        .collection('likedRecipe')
        .doc(firebase.auth().currentUser.uid)
        .collection('likedID')
        .doc(item.id)
        .delete()
  }

  useEffect(() => {
    if (props.likedRecipe.indexOf(item.uid) > -1) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [props.likedRecipe])

    return (
        <View style = {styles.container}>
          <View style ={styles.header}>
            <TouchableOpacity>
              <AntDesign name="left" size={32} color="white" style={{paddingLeft:10}}/>
            </TouchableOpacity>
            <Text style={styles.foodTitle}>{item.name}</Text>
            {isLiked ? (
              <TouchableWithoutFeedback onPress={() => unlikeRecipe()}>
              <AntDesign name={'heart'} size={30} color="#800000" style={{paddingRight:10}} />
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback onPress={() => likeRecipe()}>
              <AntDesign name={'hearto'} size={30} color="#800000" style={{paddingRight:10}} />
              </TouchableWithoutFeedback>
            )} 
          </View>
            <View style ={styles.imageContainer}>
            <Image source ={{uri: item.image}} style = {{width:220, height:220, alignSelf:'center', borderRadius:15}}/>
                <View style ={styles.bar}>
                  <Ionicons name="ios-person-outline" size={24} color="white" />
                  <Text style={{color: 'white'}}>{item.servings}</Text>
                  <MaterialIcons name="access-time" size={24} color="white" />
                  <Text style={{color: 'white'}}>{item.time}</Text>
                  <Ionicons name="speedometer-outline" size={24} color="white" />
                  <Text style={{color: 'white'}}>{item.difficulty}</Text>
                </View>
            </View>
            <ScrollView>
            <View style ={styles.bottom}>
              <Text style= {{marginTop: 15, fontSize:20, paddingLeft:15}}>Ingredients</Text>
              <ScrollView horizontal={true}>
                <View style ={styles.ingredientsScroll}>
                  {
                   item.ingredients.map((ing) => {
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
                  item.directions.map((dir) => {
                      return (
                        <Text style={styles.directions}>{dir}</Text>
                      )
                  })
              } 
              </View>
            </View>
            </ScrollView>
            <View>
            <TouchableOpacity style={styles.addButton}
              //onPress={() => test(plan, time)}
            >
              <AntDesign name="pluscircle" size={40} color=	'rgb(128,0,0)' />
            </TouchableOpacity>
            </View>
   </View>
    )
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  likedRecipe: store.userState.likedRecipe,
})

export default connect(mapStateToProps, null)(CalendarRecipeView);

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
  justifyContent: 'space-between',
  alignItems:'center'
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
},
addButton: {
  flex: 1,
  position: 'absolute',
  bottom: 100,
  right: 25,

}
})