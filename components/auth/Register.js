import React, { Component } from 'react'
import { 
    View,
    Button, 
    TextInput,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import firebase from 'firebase';
import 'react-native-gesture-handler';

export class Register extends Component {
    constructor(props) { 
        super(props);

        this.state = {
            email: '',
            password:'',
            name:'',
            validEmail: false,
            validPw: false
        }
        this.onSignUp = this.onSignUp.bind(this);
    }
 

    onSignUp(){
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email
                    })
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    validate = (text) => {
        console.log(text);
          this.setState({ email: text })
          this.setState({validEmail: true})
        
    }

    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.top}>
                    <Text style = {styles.welcomeTextBold}>Welcome!</Text>
                    <Text style = {styles.welcomeTextNormal}>Sign up to</Text>
                    <Text style = {styles.welcomeTextNormal}>get started!</Text>
                </View>

                <View style={styles.container1}>
                    <View style = {styles.textInputBox}>
                        <TextInput 
                            placeholder="Name"
                            autoCorrect = {false}
                            autoCapitalize ='none'
                            fontSize = '18'
                            onChangeText={(username) => this.setState({username})}
                        />
                    </View>
                    <View style={styles.textInputBox}>                
                        <TextInput 
                            placeholder="Email"
                            autoCorrect = {false}
                            autoCapitalize ='none'
                            keyboardType= 'email-address'
                            fontSize = '18'
                            onChangeText={(email) => this.validate(email)}
                        />
                    </View>
                    <View style={styles.textInputBox}>    
                        <TextInput style
                            placeholder="Password"
                            fontSize ='18'
                            secureTextEntry={true}
                            autoCorrect = {false}
                            autoCapitalize ='none'
                            onChangeText={(password) =>  {
                                if (password.trim().length >= 6) {
                                    this.setState({password})
                                    this.setState({validPw: true})
                                }
                          
                            }}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.signInButton}
                        onPress={() => { 
                            if (!this.state.validEmail) {
                                alert('Invalid email or password. Password must be at least 6 characters.')
                            } else if (!this.state.validPw) {
                                alert('Invalid email or password. Password must be at least 6 characters.')
                            } else {
                                this.onSignUp()
                            }
                            
                        }
                        }
                    >
                        <Text style= {styles.signInText}>Get cooking! </Text>
                        <AntDesign name="arrowright" 
                            size={24} 
                            color="rbg(0,0,0)"
                        />
                        
                    </TouchableOpacity>
            </View>
            <View style={styles.image}>
                <Image
                    source={require('../../assets/images/undercooked-register-page.png')}
                />
                </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container1: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 30,
        marginTop: 30
        
    },
    textInputBox: {
        borderColor: 'rgba(233,127,87,1)',
        borderBottomWidth: 1,
        width: 200,
        height: 40,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignContent: 'center'
    },
    container: {
        backgroundColor: 'white',
        height: '100%',
        alignContent: 'center'
    },
    top: {
        backgroundColor: 'rgba(233,127,87,1)',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        height: '35%',
        alignContent:'center'
        
    },
    welcomeTextBold: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 110,
        marginLeft: 30
      //  fontFamily: Roboto_700Bold,
    },
    welcomeTextNormal: {
        color:'black',
        fontSize: 25,
        paddingLeft: 30
      //  fontFamily: Roboto_400Regular
    },
    backButton: {
        justifyContent: 'flex-start',
        marginTop: 30,
        marginLeft: 10
    },
    signInButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15 ,
        borderWidth:2,
        borderColor: 'rgba(233,127,87,1)',
        width: 150,
        height: 40,
        marginTop: 40,
        marginLeft: 180,
        backgroundColor: 'rgba(253,186,162,1)'
    },
    signInText: {
        fontSize: 18
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Register
