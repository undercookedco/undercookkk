import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Roboto_700Bold } from '@expo-google-fonts/roboto';
import { connect } from 'react-redux';

import firebase from 'firebase'
require('firebase/firestore')

const width = Dimensions.get('window').width;

function Profile(props) { 
    const { currentUser } = props;

    let [fontsLoaded] = useFonts({
        'playfair': PlayfairDisplay_700Bold,
        'roboto': Roboto_700Bold,
    });

    const onLogout = () => {
        firebase.auth().signOut();
    }

    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>•undercooked•</Text>
            </View>
            <View style={styles.profileBar}>
                <View style={styles.picHolder}>
                    <Image style={styles.picHolder} 
                    source={require('../../assets/images/Screenshot_2021-05-28_at_1.51.23_PM-removebg.png')}
                    ></Image>
                </View>
                <Text style={styles.userName}>{currentUser.name}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton}
                onPress={() => onLogout()}
                >
                <Text style={styles.editText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.myRecipe}
            onPress={() => console.log('myRecipe')}>
                <Image style={styles.myRecipePic}
                resizeMode= 'contain'
                source={require('../../assets/images/Poster_O-Livro_02.png')}>
                </Image>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.myRecipe, backgroundColor: "rgba(177,156,217,1)",
            marginVertical: 10}}
            onPress={() => console.log('Kitchen')}>
                <Image style={styles.myRecipePic}
                resizeMode= 'contain'
                source={require('../../assets/images/Screenshot_2021-05-28_at_6.00.05_PM.png')}>
                </Image>
            </TouchableOpacity>
        </View>   
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

export default connect(mapStateToProps, null)(Profile)

const styles = StyleSheet.create({ 
    container:{ 
        flexDirection:'column',
        alignItems: 'center',
    },
    header:{ 
        flexDirection: 'row',
        alignItems:'center',
        paddingTop: 40,
        paddingBottom: 25,
    },
    title:{
        fontFamily: 'playfair',
        fontSize: 20,
        color: "rgba(161,70,9,1)"
    },
    profileBar: { 
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        marginHorizontal: 30
    },
    picHolder: { 
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1
    }, 
    userName: { 
        fontFamily: 'roboto',
        fontSize: 20,
        marginLeft: 20,
        marginTop: 15
    },
    editButton: { 
        backgroundColor: "rgba(233,127,87,1)", 
        borderRadius: 12,
        paddingVertical: 10, 
        flexDirection: 'column',
        width: width - 40
    },
    editText: { 
        fontFamily: 'roboto',
        color: 'rgba(243,235,235,1)',
        fontSize: 18, 
        alignSelf: 'center'
    },
    buttonContainer: { 
        paddingBottom: 15,
        borderBottomWidth: 2,
        marginHorizontal: 10,
        borderBottomColor: '#E6E6E6',
        marginVertical: 20
    },
    myRecipe: { 
        backgroundColor: "rgba(255,209,220,1)",
        width: width - 40, 
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 12
    },
    myRecipePic: { 
        width: 170,
        height: 170
    }
})