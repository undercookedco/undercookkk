import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CalendarSearch from './CalendarSearch';
import CalendarRecipeView from './CalendarRecipeView';

const Stack = createStackNavigator();

export default class CalendarSearchStack extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
                <Stack.Navigator initialRouteName="Search">
                    <Stack.Screen name="Search" component={CalendarSearch} 
                        options={{ headerShown: false}} 
                        navigation={this.props.navigation} 
                        />
                    <Stack.Screen name="RecipeView" component={CalendarRecipeView} 
                        options={{ headerShown: false}}
                        listeners={({ navigation }) => ({
                            tabPress: event => {
                                event.preventDefault();
                                navigation.navigate("RecipeView")
                            }
                        })}
                        />
                </Stack.Navigator>
        )
    }
}
