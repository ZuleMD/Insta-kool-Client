import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { colors, parameters, title } from "../../global/styles"
import Header from "../../components/Header"
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-ionicons';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth'



export default function ResetPasswordScreen({ navigation }) {

    async function passwordReset(data) {
        try {
            const { email } = data
            const send = await auth().sendPasswordResetEmail(email)
            if (send) {
                console.log("Password reset email sent successfully")
            } else {
                console.log("didn't send")
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
            <Header title="REST PASSWORD" type="arrow-left" navigation={navigation} />



            <View style={{ alignItems: "center", marginTop: 10 }}>
                <Text style={styles.text1} >Please enter the email to recieve the rest password link</Text>
            </View>

            <Formik
                initialValues={{ email: '' }}
                onSubmit={(values) => {
                    passwordReset(values)

                }}
            >
                {(props) => (
                    <View>
                        <View style={{ marginTop: 20 }}>
                            <View>
                                <TextInput style={styles.textInput1} placeholder="Email"
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}

                                />
                            </View>


                        </View>

                        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                            <TouchableOpacity style={parameters.buttonStyle} onPress={props.handleSubmit}>
                                <Text style={parameters.buttonTitle}>Send Link</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
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
    createbuttonStyle: {
        backgroundColor: "white",
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ff8c52",
        height: 40,
        paddingHorizontal: 20,
    },
    createbuttonTitle: {
        color: "#ff8c52",
        fontSize: 16,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -3
    }

})