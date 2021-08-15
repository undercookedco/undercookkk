import React, { Component, useState }  from 'react';

import firebase from 'firebase/app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './components/auth/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Loading from './components/auth/Loading';
import Mainstack from './components/Mainstack';

const store = createStore(rootReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyA8uuWmMjFQdIie4cqNdnrSrEuexErW-jY",
  authDomain: "undercooked-2c1d6.firebaseapp.com",
  projectId: "undercooked-2c1d6",
  storageBucket: "undercooked-2c1d6.appspot.com",
  messagingSenderId: "412222741030",
  appId: "1:412222741030:web:baf17948568e3cbe2224e7",
  measurementId: "G-JBF4781Z9J"
};

if(firebase.apps.length === 0){ 
  firebase.initializeApp(firebaseConfig);
}

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false, 
          loaded: true,
        })
      } else {
      this.setState({
        loggedIn: true, 
        loaded: true,
      })
    }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <Loading />
      )
    }
    if (!loggedIn) {
    return (
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false}} navigation={this.props.navigation} />
              <Stack.Screen name="Register" component={Register} 
                      options = {{
                        headerBackTitleVisible: false, 
                        headerTintColor: 'black',
                        headerTransparent: true, 
                        headerTitle: '',
                        }}/>
              <Stack.Screen name="Login" component={Login} 
                      options = {{ 
                        headerBackTitleVisible: false, 
                        headerTintColor: 'black',
                        headerTransparent: true, 
                        headerTitle: '', }}/>
            </Stack.Navigator>
          </NavigationContainer>
    ) 
    }

    return (
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Mainstack" >
              <Stack.Screen 
                name="Mainstack" 
                component={Mainstack} 
                options ={{ headerShown:false }}
              /> 
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
    )
  }
}

