import React, { Component } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Search from './Search';
import RecipeView from './RecipeView';

const Stack = createStackNavigator();

export default class SearchStack extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
                <Stack.Navigator initialRouteName="Search">
                    <Stack.Screen name="Search" component={Search} 
                        options={{ headerShown: false}} 
                        navigation={this.props.navigation} 
                    />
                    <Stack.Screen name="RecipeView" component={RecipeView} options={{ headerShown: false}}
                        navigation={this.props.navigation} />
                </Stack.Navigator>
        )
    }
}
