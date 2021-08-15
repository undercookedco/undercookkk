import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity
} from "react-native";
import { useFonts, BigShouldersDisplay_700Bold } from '@expo-google-fonts/big-shoulders-display';
import * as Font from 'expo-font';

export default class Loading extends Component {
    constructor(props){
        super(props)

        this.state = {
            fontsLoaded: false
        };
    }

    async loadFonts() {
        await Font.loadAsync({
            'bigshoulders': BigShouldersDisplay_700Bold
        })
        this.setState({ fontsLoaded: true});
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
                            resizeMode= "cover"
                            style={styles.image}
                        >
                            <Text style={styles.undercooked}>•UNDERCOOKED•</Text>
                        </ImageBackground>
                    </View >
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
        justifyContent: "center"
    },
    image: { 
        width: 354,
        height: 354,
        justifyContent: "center",
        alignContent:"center",
        alignSelf: "center"
    },
    undercooked: {
        fontFamily: 'bigshoulders',
        color: "rgba(255,255,255,1)",
        fontSize: 25,
        textAlign: "center",
        marginTop: 370
    },
})  