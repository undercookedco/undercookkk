import React, { Component } from "react";
 
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableHighlight,
  Dimensions,
  Image
} from "react-native";
import { useFonts, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { FontAwesome } from '@expo/vector-icons';

import { connect } from 'react-redux';

const width = Dimensions.get('window').width;

function Main(props) {
    let [fontsLoaded] = useFonts({
        'roboto': Roboto_700Bold,
    });

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}> 
        <View styles={{width: '100%', height: '100%', backgroundColor:'#ffffff'}}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.welcomeText}>Welcome, {'\n'} 
                        <Text style={styles.tastyText}>Tasty food at home !
                        </Text>
                    </Text>
                    <TouchableHighlight 
                        style={styles.userBox}
                        activeOpacity={1}
                        underlayColor={"#ccd0d5"}
                        onPress={() => console.log('pressed')}
                    >
                        <FontAwesome name="user-circle" size={40} color="rgba(255,255,255,1)" />
                    </TouchableHighlight>
                </View>
                <View style={styles.barHolder}>
                    <TextInput 
                    style={styles.searchBar}
                    placeholder='Find your recipe'
                    />
                </View>
            </View>
            <View style={styles.imageContainer}>
                    <Image 
                        source={require('../../assets/images/mainpic.png')} 
                        style={{
                            width: 350,
                            height: 300
                        }}
                    />
            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

export default connect(mapStateToProps, null)(Main)

const styles = StyleSheet.create({
    container: {
        paddingTop: 75,
        backgroundColor: "rgba(233,127,87,1)",
        paddingBottom: 110,
        borderBottomLeftRadius: 36,
        borderBottomRightRadius: 36,
        shadowColor: "#121212",
        shadowOffset: {
            width: 2,
            height: 2
        },
        elevation: 20,
        shadowOpacity: 1,
        shadowRadius: 0
    },
    header: { 
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingLeft: 35,
        paddingRight: 35
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'roboto',
    },
    tastyText: { 
        lineHeight: 21,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'roboto',
        color: 'rgba(94,86,86,1)'
    },
    userBox: { 
        borderRadius: 20
    },
    barHolder: { 
        position: 'absolute',
        top: 215,
        flexDirection: 'row',
        justifyContent: 'center',
        width: width
    },
    searchBar: { 
        height: 55,
        width: width - 100,
        backgroundColor: "rgba(230,230, 230,1)",
        borderRadius: 15,
        textAlign: 'center'   
    },
    imageContainer: {
        marginTop: 250,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginLeft: -40
    }
})