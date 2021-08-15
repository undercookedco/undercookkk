import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text, 
    Image, 
    FlatList,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Dimensions,
    ScrollView,
    TouchableHighlight,
    Platform,
    StatusBar
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import * as Font from 'expo-font';

import firebase from 'firebase';
require('firebase/firestore');

import Animated, { Easing } from 'react-native-reanimated';

import RecipeView from './RecipeView';

const { Value, timing } = Animated

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class CalendarSearchBar extends Component {
    constructor(props){
        super(props)

        this.state = {
            isFocused: false,
            fontsLoaded: false,
            search:'',
            recipes:[]
        };

        this._input_box_translate_x = new Value(width)
        this._back_button_opacity = new Value(0)
        this._content_translate_y = new Value(height)
        this._content_opacity = new Value(0)

    }

    fetchRecipes = (searched) => {
        this.setState({search: searched})
        console.log(this.state.search)
        firebase.firestore()
        .collection('recipes')
        .where('name', '>=', searched)
        .get()
        .then((snapshot) => {
            let recipes = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ... data}
            });
            this.setState({recipes: recipes})
        })
    }

    async loadFonts() {
        await Font.loadAsync({
            'playfair': PlayfairDisplay_700Bold
        })
        this.setState({ fontsLoaded: true});
    }

    componentDidMount() { 
        this.loadFonts();
    }

    onFocus = () => {
        this.setState({isFocused: true})
        const input_box_translate_x_config = {
            duration: 200,
            toValue: 0,
            easing: Easing.inOut(Easing.ease)
        }
        const back_button_opacity_config= {
            duration: 200,
            toValue: 1,
            easing: Easing.inOut(Easing.ease)
        }
        const content_translate_y_config = {
            duration: 0,
            toValue: 0,
            easing: Easing.inOut(Easing.ease)
        }
        const content_opacity_config = {
            duration: 200,
            toValue: 1,
            easing: Easing.inOut(Easing.ease)
        }

        timing(this._input_box_translate_x, input_box_translate_x_config).start()
        timing(this._back_button_opacity, back_button_opacity_config).start()
        timing(this._content_translate_y, content_translate_y_config).start()
        timing(this._content_opacity, content_opacity_config).start()
        
        this.refs.input.focus()
    }

    onBlur = () => {
        this.setState({isFocused: false})
        const input_box_translate_x_config = {
            duration: 200,
            toValue: width,
            easing: Easing.inOut(Easing.ease)
        }
        const back_button_opacity_config= {
            duration: 50,
            toValue: 0,
            easing: Easing.inOut(Easing.ease)
        }
        const content_translate_y_config = {
            duration: 0,
            toValue: height,
            easing: Easing.inOut(Easing.ease)
        }
        const content_opacity_config = {
            duration: 200,
            toValue: 0,
            easing: Easing.inOut(Easing.ease)
        }

        timing(this._input_box_translate_x, input_box_translate_x_config).start()
        timing(this._back_button_opacity, back_button_opacity_config).start()
        timing(this._content_translate_y, content_translate_y_config).start()
        timing(this._content_opacity, content_opacity_config).start()

        this.refs.input.blur()
    }

    render() {
        if (this.state.fontsLoaded) {
        return (
            <>
            <SafeAreaView style={styles.header_safe_area}>
                    <View style={styles.header}>
                        <View style={styles.innerHeader}>
                            <View>
                                <Text style={styles.undercooked}>
                                    undercooked
                                </Text>
                            </View>
                            <TouchableHighlight
                                activeOpacity={1}
                                underlayColor={"#ccd0d5"}
                                onPress={this.onFocus}
                                style={styles.searchIcon}
                            >
                                <FontAwesome name="search" size={22} color='#000000' />
                            </TouchableHighlight>
                            <Animated.View
                                style={[ styles.inputBox, {transform: [{translateX: this._input_box_translate_x}]}]}
                            >
                                <Animated.View style={{opacity: this._back_button_opacity}}>
                                    <TouchableHighlight
                                        activeOpacity={1}
                                        underlayColor={"#ccd0d5"}
                                        onPress={this.onBlur}
                                        styles={styles.backButton}
                                    >
                                        <FontAwesome name='chevron-left' size={22} color="#000000" />
                                    </TouchableHighlight>
                                </Animated.View>
                                <TextInput 
                                    ref='input'
                                    placeholder="Search Recipe"
                                    clearButtonMode="always"
                                    onChangeText={(searched) => this.fetchRecipes(searched)}
                                    style={styles.input}
                                />
                            </Animated.View>
                        </View>
                    </View>
            </SafeAreaView>

            <Animated.View style ={[styles.content, { opacity: this._content_opacity, transform:[{translateY: this._content_translate_y}] }]}>
                <SafeAreaView style={styles.contentSafeArea}>
                    <View style={styles.contentInner}>
                        <View style={styles.separator} />
                        {
                            this.state.search === ''
                            ?
                                <View style={ styles.imagePlaceholder}>
                                    <Image 
                                        style={styles.searchImage}
                                        source={require('../../assets/images/search.jpeg')} />
                                    <Text style={styles.imageText}>
                                        Enter a few words{'\n'}
                                        to search your recipe
                                    </Text>
                                </View>
                            :   
                                <View style={styles.containerGallery}>
                                    <FlatList
                                        numColumns={2}
                                        horizontal={false}
                                        data={this.state.recipes}
                                        renderItem={({item}) => (
                                            <TouchableOpacity
                                                onPress ={() => this.props.viewRecipe(item) }
                                                style={styles.containerImage}>
                                                <Image
                                                style={styles.image}
                                                    source={{uri: item.image}}
                                                />
                                    </TouchableOpacity>
                                    )}
                                    />
                                </View>
                        }
                    </View>
                </SafeAreaView>
            </Animated.View>
            </>
        )
        } else { 
            return null;
        }
    }
}

const styles = StyleSheet.create({
    header_safe_area: {
        zIndex: 1000
    },
    undercooked:{
        fontFamily: 'playfair',
        fontSize: 25,
        color: "rgba(161,70,9,1)"
    },
    header: {
        height: 60,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(233,127,87,1)',
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    innerHeader: {
        flex: 1,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        
    },
    searchIcon: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: '#e4e6eb',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputBox: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(233,127,87,1)',
        width : width - 32
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#e4e6eb',
        borderRadius: 16,
        paddingHorizontal: 16,
        fontSize: 15
    },
    content: {
        width: width,
        height: height,
        position: 'absolute',
        left: 0,
        bottom: 0,
        zIndex: 999
    },
    contentSafeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentInner: {
        flex: 1,
        paddingTop: 0,
        alignItems: 'center'
    },
    separator: {
        marginTop: 5,
        height: 1,
        backgroundColor: '#e6e4eb'
    },
    imagePlaceholder: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '-50%'
    },
    searchImage: {
        width: 150,
        height: 113,
        alignSelf: 'center'
    }, 
    imageText: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 5
    },
    searchedItems: { 
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e4eb',
        marginLeft: 16
    },
    itemIcon: {
        marginRight: 15
    },
    containerGallery: {
        marginTop: 100,
        flex: 1,
        width: '90%',
        alignSelf: 'center'
    },
    image: { 
        flex: 1,
        marginHorizontal: 2.5,
        marginVertical: 5,
        flexDirection: 'row',
        aspectRatio: 1/1,
        borderRadius: 10
    },
    containerImage:{
        flex: 1/2
    }
})