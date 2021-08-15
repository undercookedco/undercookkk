import { useNavigation } from '@react-navigation/core';
import moment from 'moment';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';
import React, {Component, useState} from 'react';
import {
  Alert, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  MaskedViewComponent,
  TouchableHighlight
} from 'react-native';
import { add, color } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import RecipeCalendar from './RecipeCalendar';

import firebase from 'firebase';
require("firebase/firestore");

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const objSize = (obj) => { 
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}

const AgendaCard = ({item, add, viewRecipe}) => (
    <View style={{flex: 1, marginRight: 17, marginTop: 25}}>
      { item.bfast === null ? (
        <TouchableOpacity 
          style={{backgroundColor:'#add8e6', ...styles.agenda}}>
          <View
          style={styles.content}
          >
            <Text>{item.bfast}</Text>
            <TouchableOpacity
              underlayColor={"#ccd0d5"}
              onPress={() => add(item, 'bfast')}
              style={styles.searchIcon}
            >
              <FontAwesome name="plus" size={22} color='#000000' />
            </TouchableOpacity>
          </View>
       </TouchableOpacity>
         ) : (
      <TouchableOpacity 
        onPress= {() => viewRecipe(item.bfast['uid'])}
        style={{backgroundColor:'#add8e6', ...styles.agenda}}>
        <View
        style={styles.content}
        >
          <Text>{item.bfast['name']}</Text>
          <TouchableOpacity
            underlayColor={"#ccd0d5"}
            style={styles.searchIcon}
          >
            <AntDesign name="delete" size={22} color='#000000' />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      )}

      { item.lunch === null ? (
        <TouchableOpacity 
          style={{backgroundColor:'rgba(233,127,87,1)', ...styles.agenda}}>
          <View
          style={styles.content}
          >
            <Text>{item.lunch}</Text>
            <TouchableOpacity
              underlayColor={"#ccd0d5"}
              onPress={() => add(item,'lunch')}
              style={styles.searchIcon}
            >
              <FontAwesome name="plus" size={22} color='#000000' />
            </TouchableOpacity>
          </View>
       </TouchableOpacity>
         ) : (
        <TouchableOpacity 
          onPress= {() => viewRecipe(item.lunch['uid'])}
          style={{backgroundColor:'rgba(233,127,87,1)', ...styles.agenda}}>
          <View
          style={styles.content}
          >
            <Text>{item.lunch['name']}</Text>
            <TouchableOpacity
              underlayColor={"#ccd0d5"}
              style={styles.searchIcon}
            >
              <AntDesign name="delete" size={22} color='#000000' />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    
    { item.dinner === null ? (
        <TouchableOpacity 
          style={{backgroundColor:'#23395d', ...styles.agenda}}>
          <View
          style={styles.content}
          >
            <Text>{item.dinner}</Text>
            <TouchableOpacity
              underlayColor={"#ccd0d5"}
              onPress={() => add(item, 'dinner')}
              style={styles.searchIcon}
            >
              <FontAwesome name="plus" size={22} color='#000000' />
            </TouchableOpacity>
          </View>
       </TouchableOpacity>
         ) : (
        <TouchableOpacity 
          onPress= {() => viewRecipe(item.dinner['uid'])}
          style={{backgroundColor:'#23395d', ...styles.agenda}}>
          <View
          style={styles.content}
          >
            <Text>{item.dinner['name']}</Text>
            <TouchableOpacity
              underlayColor={"#ccd0d5"}
              style={styles.searchIcon}
            >
              <AntDesign name="delete" size={22} color='#000000' />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </View>
)

export default class Calendar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      recipe: null,
      items: {
        '2021-07-22': [{date:'2021-07-22',
        bfast: { 'name': 'spaghetti' ,'uid': 'TfirVp0F5FU9Tpb6VdCY' , 'done': false }, 
        lunch: { 'name': 'sushi'  ,'uid': 'pZjKW2rbOPOMYmdBoOzt', 'done': false }, 
        dinner: { 'name': 'burrito', 'uid': '2IjK3odk93a4lXq2hL6V', 'done': false }
        }],
      },
      marked: {}
    } 

    this.loadItems = this.loadItems.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.add = this.add.bind(this);
  }

  viewRecipe = (uid) => {
    firebase.firestore()
        .collection('recipes')
        .doc(uid)
        .get()
        .then((snapshot) => {
            if (snapshot.exists) {
                const recipe= snapshot.data()
                this.props.navigation.navigate('RecipeCalendar', {recipe})
            } else {
                console.log('does not exist')
            }
        })
  }

  formatRecipe = (time, item, uid, name) => {
    if (time === 'bfast') {
      item.breakfast = {'name' : name, 'uid': uid, 'done': false}
    } else if (time === 'lunch') {
      item.lunch = {'name' : name, 'uid': uid, 'done': false}
    } else {
      item.dinner = {'name' : name, 'uid': uid, 'done': false}
    }
    return { [item.date] : item }
  }

  addRecipe = (item) => {
    firebase.firestore()
      .collection(calendar)
      .docs(firebase.auth().currentUser.uid)
      .set({
         [item.date] : [item]
      })
    console.log(item)
  }
  

  add = (plan, time) => {
    console.log('press')
    this.props.navigation.navigate("SearchStack", {plan, time})
  }

  loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          this.state.items[strTime].push({
            date: strTime,
            bfast: null,
            lunch: null,
            dinner: null
          })
          this.state.marked[strTime] = {marked: false};
        } else if (this.state.items[strTime][0].bfast === null &&
          this.state.items[strTime][0].lunch === null &&
          this.state.items[strTime][0].dinner === null) {
          this.state.marked[strTime] = {marked: false};
        } else {
          this.state.marked[strTime] = {marked: true};
        }

      }
      const newMarked = {};
      const newItems = {};
      Object.keys(this.state.items).forEach((key) => {
        newItems[key] = this.state.items[key];
      });
      this.setState({items:newItems});
      Object.keys(this.state.marked).forEach((key) => {
        newMarked[key] = this.state.marked[key]
      });
      this.setState({marked:newMarked});
    }, 1000);
  };

  renderItem = (item) => {
    return (
      <AgendaCard item={item} add={this.add} viewRecipe={this.viewRecipe}/>
    )
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Agenda
          items={this.state.items}
          minDate={'2021-07-01'}
          maxDate={'2021-08-30'}
          pastScrollRange={2}
          futureScrollRange={2}
          loadItemsForMonth={this.loadItems}
          selected={'2021-07-16'}
          renderItem={this.renderItem}
          markedDates={this.state.marked}
          theme={{
            agendaDayTextColor: '#808080',
            agendaDayNumColor: '#808080',
            agendaTodayColor: 'rgba(233,127,87,1)',
            agendaKnobColor: 'rgba(233,127,87,1)'
          }}
        />
      </View>
    )
  }
};


const styles = StyleSheet.create({
  addButton: {
    borderRadius: 50,
    backgroundColor: "rgba(233,127,87,1)",
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    borderRadius: 15,
    marginVertical: 5,
  },
  agenda: {
    justifyContent: 'center',
    height: 70,
    marginRight: 10, 
    marginVertical: 2,
    borderRadius: 10
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  searchIcon: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#e4e6eb',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})