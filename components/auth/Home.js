import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity
} from "react-native";
import { BigShouldersDisplay_700Bold } from '@expo-google-fonts/big-shoulders-display';
import * as Font from 'expo-font';

import AppLoading from 'expo-app-loading';

export default class Home extends Component {
    state = {
        fontsLoaded: false,
    };

    async loadFonts() {
        await Font.loadAsync({
            'bigShoulders': BigShouldersDisplay_700Bold
        });
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this.loadFonts();
    }

    render() {
        if (this.state.fontsLoaded) {
            return (
                <View style={styles.container}>
                    <View style={styles.rect}>
                        <ImageBackground 
                            source={require("../../assets/images/Screenshot_2021-05-28_at_1.51.23_PM-removebg.png")}
                            resiexzeMode= "cover"
                            style={styles.image}
                        >
                        </ImageBackground>
                        <Text style={styles.undercooked}>•UNDERCOOKED•</Text>
                        <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate("Register")}
                    >
                        <View style = {styles.button}>
                        <Text style = {styles.buttonLabel}>REGISTER</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate("Login")}
                    >
                        <View style = {styles.button}>
                        <Text style = {styles.buttonLabel}>SIGN IN</Text>
                        </View>
                    </TouchableOpacity> 
                    </View>
                </View>
            )
        } else {
         return null;
        }
    }
}

const styles = StyleSheet.create({
    container: { 
        backgroundColor: "rgba(233,127,87,1)",
        height: '100%'
    },
    rect: { 
        flex: 1,
        backgroundColor: "rgba(233,127,87,1)",
        alignItems: "center",
        justifyContent: "center",
        alignContent: 'center'
    },
    image: { 
        width: 354,
        height: 354,
        justifyContent: "center",
        alignContent:"center",
        alignSelf: "center"
    },
    button: {
        borderRadius: 10,
        width: 200,
        height: 40,
        marginTop: 10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(153, 51, 51, 0.9)'
    },
    buttonLabel: {
        color: 'white',
        fontFamily: 'bigShoulders',
        fontSize: 20,
        fontWeight: '500'
    },
    undercooked: {
        fontFamily: 'bigShoulders',
        color: "black",
        fontSize: 25,
        textAlign: "center",
        marginTop: 15
    },
})