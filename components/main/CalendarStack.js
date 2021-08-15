import React, { Component } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import CalendarSearchStack from './CalendarSearchStack';
import Calendar from './Calendar';
import RecipeCalendar from './RecipeCalendar';

const Stack = createStackNavigator();

export default class CalendarStack extends Component { 
    render() { 
        return (
            <Stack.Navigator initialRouteName="Calendar">
                <Stack.Screen name="Calendar" component={Calendar} options={{ headerShown: false}} navigation={this.props.navigation}/>
                <Stack.Screen name="SearchStack" component={CalendarSearchStack} options={{ headerShown: false}} navigation={this.props.navigation}/>
                <Stack.Screen name="RecipeCalendar" component={RecipeCalendar} options={{ headerShown: false}} navigation={this.props.navigation}/>
            </Stack.Navigator>
        )
    }
}


