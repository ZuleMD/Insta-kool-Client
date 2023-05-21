import React, { useState, useRef, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { colors, parameters, title } from "../../global/styles"
import Header from "../../components/Header"
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-ionicons';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth'
import { AccessToken, LoginManager } from 'react-native-fbsdk'

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { SignInContext } from '../../contexts/authContext';


export default function SignInScreen({ navigation }) {
    const { dispatchSignedIn } = useContext(SignInContext)

    const [textInput2Focused, setTextInput2Focused] = useState(false)

    const textInput1 = useRef(1)
    const textInput2 = useRef(2)

    async function signIn(data) {
        try {
            const { password, email } = data

            if (email != "" && password != "") {
                const user = await auth().signInWithEmailAndPassword(email, password)
                if (user) {
                    dispatchSignedIn({ type: "UPDATE_SIGN_IN", payload: { userToken: "signed-in" } })
                }
            } else if (email == "") {
                Alert.alert("Error", "Email cannot be empty ")
            }
            else if (password == "") {
                Alert.alert("Error", "Password cannot be empty ")

            }

        }
        catch (error) {
            Alert.alert(
                error.name,
                error.message
            )
        }

    }

    async function signInWithFacebook() {
        try {
            // Login the User and get his public profile and email id.
            const result = await LoginManager.logInWithPermissions([
                'public_profile',
                'email',
            ]);

            // If the user cancels the login process, the result will have a 
            // isCancelled boolean set to true. We can use that to break out of this function.
            if (result.isCancelled) {
                throw 'User cancelled the login process';
            }


            // Get the Access Token 
            const data = await AccessToken.getCurrentAccessToken();

            // If we don't get the access token, then something has went wrong.
            if (!data) {
                throw 'Something went wrong obtaining access token';
            } else {

                console.log("Signed in")

            }

            // Use the Access Token to create a facebook credential.
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

            // Use the facebook credential to sign in to the application.
            return auth().signInWithCredential(facebookCredential);

        } catch (error) {
            Alert.alert(
                error.name,
                error.message
            )
        }
    }



    async function signInWithGoogle() {
        try {
            // Configure Google Sign-In
            GoogleSignin.configure({
                webClientId: '560988453952-vmoo9u50e20gcukqvp17r9sf1cmrnedi.apps.googleusercontent.com',
            });

            // Check if Play Services are available
            const hasPlayServices = await GoogleSignin.hasPlayServices();
            if (!hasPlayServices) {
                throw new Error('Play Services are not available');
            }

            // Sign in with Google
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign in to Firebase with Google credential
            await auth().signInWithCredential(googleCredential);

            console.log('Signed in with Google');
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    }

    return (
        <View style={styles.container}>
            <Header title="MY ACCOUNT" type="arrow-left" navigation={navigation} />


            <View style={{ marginLeft: 20, marginTop: 10 }}>
                <Text style={title}>Sign-In</Text>
            </View>

            <View style={{ alignItems: "center", marginTop: 10 }}>
                <Text style={styles.text1} >Please enter the email and password</Text>
                <Text style={styles.text1} >registered with your account</Text>
            </View>

            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => {
                    signIn(values)

                }}
            >
                {(props) => (
                    <View>
                        <View style={{ marginTop: 20 }}>
                            <View>
                                <TextInput style={styles.textInput1} placeholder="Email" ref={textInput1}
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}

                                />

                            </View>

                            <View style={styles.textInput2}>
                                <Animatable.View animation={textInput2Focused ? "" : "fadeInLeft"} duration={400}>
                                    <Icon
                                        ios="ios-lock"
                                        android="md-lock"
                                        color={colors.grey3}
                                        size={28}
                                    />
                                </Animatable.View>

                                <TextInput style={{ width: "80%", marginLeft: 5 }} placeholder="Password" ref={textInput2}
                                    onChangeText={props.handleChange('password')} value={props.values.password}

                                    onFocus={() => {
                                        setTextInput2Focused(false)
                                    }}

                                    onBlur={() => {
                                        setTextInput2Focused(true)
                                    }}
                                    secureTextEntry={true}  // Set the input type to "password"


                                />


                                <Animatable.View animation={textInput2Focused ? "" : "fadeInLeft"} duration={400}>
                                    <Icon
                                        ios="ios-eye-off"
                                        android="md-eye-off"
                                        color={colors.grey3}
                                        style={{ marginRight: 20 }}
                                        size={28}
                                    />
                                </Animatable.View>

                            </View>
                        </View>

                        <View style={{ marginHorizontal: 20, marginTop: 30 }}>
                            <TouchableOpacity style={parameters.buttonStyle} onPress={props.handleSubmit}>
                                <Text style={parameters.buttonTitle}>SIGN IN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>




            <TouchableOpacity style={{ alignItems: "center", marginTop: 15 }} onPress={() => { navigation.navigate("ResetPasswordScreen") }}>
                <Text style={{ ...styles.text1, textDecorationLine: 'underline' }}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={{ alignItems: "center", marginTop: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>OR</Text>
            </View>
            <View style={{ marginHorizontal: 20, marginTop: 30 }}>
                <TouchableOpacity style={parameters.buttonStyleFacebook} onPress={signInWithFacebook}>

                    <Text style={parameters.buttonTitle}>
                        <Image source={{ uri: 'https://www.grez-doiceau.be/ma-commune/social/epn/images/logo-facebook.png/@@images/image.png' }}
                            style={{ width: 30, height: 25, marginRight: 20 }} />  Sign in With Facebook
                    </Text>

                </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                <TouchableOpacity style={parameters.buttonStyleGoogle} onPress={signInWithGoogle}>

                    <Text style={parameters.buttonTitle}>
                        <Image source={{ uri: 'https://pourron.com/wp-content/uploads/2015/09/nouveau-logo-google-plus-rond.png' }}
                            style={{ width: 25, height: 25, marginRight: 20 }} />  Sign in With Google
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 25, marginLeft: 20 }}>
                <Text style={{ ...styles.text1, }}>New on Insta-kool ?</Text>
            </View>
            <View style={{ alignItems: "flex-end", marginHorizontal: 20 }}>
                <TouchableOpacity style={styles.createbuttonStyle} onPress={() => { navigation.navigate("SignUpScreen") }}>

                    <Text style={styles.createbuttonTitle}>
                        Create an account
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text1: {
        color: colors.grey3,
        fontSize: 16
    },
    texterror: {
        color: colors.error,


    },

    textInput1: {
        borderWidth: 1,
        borderColor: "#86939e",
        marginHorizontal: 20,
        borderRadius: 12,
        marginBottom: 20,
        paddingLeft: 16
    },
    textInput2: {
        borderWidth: 1,
        borderColor: "#86939e",
        marginHorizontal: 20,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        paddingLeft: 16
    },
    createbuttonStyle: {
        backgroundColor: "white",
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#89CFF0",
        height: 40,
        paddingHorizontal: 20,
    },
    createbuttonTitle: {
        color: "#89CFF0",
        fontSize: 16,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -3
    }

})