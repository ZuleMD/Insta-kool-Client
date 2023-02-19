import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { colors, parameters, title } from "../../global/styles"
import Header from "../../components/Header"
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-ionicons';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth'



export default function SignInScreen({ navigation }) {
    const [textInput2Focused, setTextInput2Focused] = useState(false)

    const textInput1 = useRef(1)
    const textInput2 = useRef(2)

    async function signIn(data) {
        try {
            const { password, email } = data
            const user = await auth().signInWithEmailAndPassword(email, password)
            if (user) {
                console.log("Signed in")
            }
        }
        catch (error) {
            Alert.alert(
                error.name,
                error.message
            )
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
                                    }} />

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
                <TouchableOpacity style={parameters.buttonStyleFacebook} onPress={() => { }}>

                    <Text style={parameters.buttonTitle}>
                        <Image source={{ uri: 'https://www.grez-doiceau.be/ma-commune/social/epn/images/logo-facebook.png/@@images/image.png' }}
                            style={{ width: 20, height: 20, marginRight: 20 }} />  Sign in With Facebook
                    </Text>

                </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                <TouchableOpacity style={parameters.buttonStyleGoogle} onPress={() => { }}>

                    <Text style={parameters.buttonTitle}>
                        <Image source={{ uri: 'https://pourron.com/wp-content/uploads/2015/09/nouveau-logo-google-plus-rond.png' }}
                            style={{ width: 20, height: 20, marginRight: 20 }} />  Sign in With Google
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