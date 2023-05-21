import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native'
import { colors } from '../../global/styles'
import Header from '../../components/Header'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-ionicons';
import auth from '@react-native-firebase/auth';
import { Formik } from 'formik';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';



const initialValues = { firstName: "", lastName: "", phoneNumber: "", address: "", password: "", email: "" }

const SignUpScreen = ({ navigation }) => {
    const [passwordFocussed, setPassordFocussed] = useState(false)
    const [passwordBlured, setPasswordBlured] = useState(false)

    async function signUp(values) {
        const { firstName, lastName, phoneNumber, address, password, email } = values;
        const userId = uuid.v4();
        try {
            switch (true) {
                case firstName === "":
                    alert("Error: First name cannot be empty");
                    break;
                case lastName === "":
                    alert("Error: Last name cannot be empty");
                    break;
                case phoneNumber === "":
                    alert("Error: Phone number cannot be empty");
                    break;
                case address === "":
                    alert("Error: Address cannot be empty");
                    break;
                case password === "":
                    alert("Error: Password cannot be empty");
                    break;
                case email === "":
                    alert("Error: Email cannot be empty");
                    break;
                default:

                    break;
            }


            if (email) {
                await auth().createUserWithEmailAndPassword(email, password);

                const user = auth().currentUser;

                if (user) {

                    // Update user profile with additional information
                    await user.updateProfile({
                        displayName: `${firstName} ${lastName}`,
                    });

                    // Save additional information to Firestore
                    await firestore()
                        .collection('users')
                        .doc(userId)
                        .set({
                            firstName: firstName,
                            email: email,
                            lastName: lastName,
                            phoneNumber: phoneNumber,
                            address: address,
                            userId: userId,
                            cart: [],
                        })
                }
                console.log("USER ACCOUNT CREATED");
                console.log(user); // Check the user object to see if displayName is set correctly
            }
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('That email address is already in use!');
            } else if (error.code === 'auth/invalid-email') {
                Alert.alert('That email address is invalid');
            } else {
                Alert.alert(error.code);
            }
        }
    }




    return (
        <View style={styles.container}>
            <Header title="MY ACCOUNT" type="arrow-left" navigation={navigation} />
            <ScrollView keyboardShouldPersistTaps="always">
                <View style={styles.view1}>
                    <Text style={styles.text1}>Sign-Up</Text>
                </View>
                <Formik initialValues={initialValues} onSubmit={(values) => { signUp(values) }}>
                    {(props) => (
                        <View style={styles.view2}>
                            <View>
                                <Text style={styles.text2}>New on Insta-kool ?</Text>
                            </View>

                            <View style={styles.view6}>
                                <TextInput
                                    placeholder="First name"
                                    style={styles.input1}
                                    autoFocus={false}
                                    onChangeText={props.handleChange('firstName')}
                                    value={props.values.firstName}

                                />
                            </View>

                            <View style={styles.view6}>
                                <TextInput
                                    placeholder="Last name"
                                    style={styles.input1}
                                    autoFocus={false}
                                    onChangeText={props.handleChange('lastName')}
                                    value={props.values.lastName}

                                />
                            </View>

                            <View style={styles.view6}>
                                <TextInput
                                    placeholder="Mobile Number"
                                    style={styles.input1}
                                    keyboardType="number-pad"
                                    autoFocus={true}
                                    onChangeText={props.handleChange('phoneNumber')}
                                    value={props.values.phoneNumber}

                                />
                            </View>

                            <View style={styles.view6}>
                                <TextInput
                                    placeholder="Address"
                                    style={styles.input1}
                                    autoFocus={true}
                                    onChangeText={props.handleChange('address')}
                                    value={props.values.address}

                                />
                            </View>
                            <View style={styles.view10}>
                                <View style={{ marginTop: 11 }}>

                                    <Icon
                                        ios="ios-mail"
                                        android="md-mail"
                                        color={colors.grey3}
                                        size={25}
                                    />
                                </View>
                                <View style={styles.view11}>
                                    <TextInput
                                        placeholder="Email"
                                        style={styles.input4}
                                        autoFocus={false}
                                        onChangeText={props.handleChange('email')}
                                        value={props.values.email}

                                    />
                                </View>
                            </View>

                            <View style={styles.view14}>
                                <Animatable.View animation={passwordFocussed ? "fadeInRight" : "fadeInLeft"} duration={400}>

                                    <Icon
                                        ios="ios-lock"
                                        android="md-lock"
                                        color={colors.grey3}
                                        size={28}
                                    />
                                </Animatable.View>

                                <TextInput
                                    placeholder="Password"
                                    style={{ flex: 1 }}
                                    autoFocus={false}
                                    onChangeText={props.handleChange('password')}
                                    value={props.values.password}
                                    onFocus={() => { setPassordFocussed(true) }}
                                    onBlur={() => { setPasswordBlured(true) }}
                                    secureTextEntry={true}  // Set the input type to "password"

                                />
                                <Animatable.View animation={passwordBlured ? "fadeInLeft" : "fadeInRight"} duration={400}>
                                    <Icon
                                        ios="ios-eye-off"
                                        android="md-eye-off"
                                        color={colors.grey3}
                                        style={{ marginRight: 10 }}
                                        size={28}
                                    />
                                </Animatable.View>
                            </View>

                            <View style={styles.view15}>
                                <Text style={styles.text3}>By creating or logging into an account you are</Text>
                                <View style={styles.view16}>
                                    <Text style={styles.text3}>agreeing with our  </Text>
                                    <Text style={styles.text4}> Terms & Conditions</Text>
                                    <Text style={styles.text3}> and </Text>
                                </View>
                                <Text style={styles.text4}> Privacy Statement</Text>
                            </View>
                            <View style={styles.view17}>
                                <TouchableOpacity style={styles.button1} onPress={props.handleSubmit}>
                                    <Text style={styles.title1}>Create my account</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                    )}
                </Formik>
                <View style={styles.view18}>
                    <Text style={styles.text5}>OR</Text>
                </View>
                <View style={styles.view19}>
                    <View style={styles.view20}>
                        <Text style={styles.text3}>Already have an account with Insta-kool?</Text>
                    </View>
                    <View style={styles.view21}>
                        <TouchableOpacity style={styles.button2} onPress={() => { navigation.navigate('SignInScreen') }}>
                            <Text style={styles.title2}>Sign-In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    view1: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 15
    },

    text1: {
        fontSize: 22,
        color: colors.buttons,
        fontWeight: 'bold'
    },

    view2: {
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        paddingHorizontal: 15
    },

    view3: {
        marginTop: 5,
        marginBottom: 10
    },

    text2: {
        fontSize: 15,
        color: colors.grey2
    },

    view4: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.grey4,
        borderRadius: 12,
        paddingLeft: 5

    },

    view5: {
        marginLeft: 30,
        marginTop: 20
    },

    input1: { fontSize: 16, },

    view6: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.grey4,
        borderRadius: 12,
        paddingLeft: 5,
        marginTop: 20,
        height: 48
    },

    view7: {
        marginLeft: 0,
        maxWidth: "65%",
    },

    input2: {
        fontSize: 16,
        marginLeft: 0,
        marginBottom: 0
    },

    view8: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.grey4,
        borderRadius: 12,
        paddingLeft: 5,
        marginTop: 20,
        height: 48
    },

    view9: {
        marginLeft: 0,
        maxWidth: "65%",
    },

    input3: {
        fontSize: 16,
        marginLeft: 0,
        marginBottom: 0
    },

    view10: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.grey4,
        borderRadius: 12,
        paddingLeft: 5,
        marginTop: 20,
        height: 48
    },

    email: {
        fontSize: 24,
        padding: 0,
        marginBottom: 0,
        marginTop: 11,
        marginLeft: 2
    },

    view11: {
        marginLeft: 30,
        maxWidth: "65%",
    },

    input4: {
        fontSize: 16,
        marginLeft: -20,
        marginBottom: -10
    },

    view13: {
        flexDirection: "row",
        height: 40,
    },

    view14: {
        borderWidth: 1,
        borderRadius: 12,
        borderColor: colors.grey4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        paddingLeft: 5,
        marginTop: 20,
    },

    view15: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },

    text3: {
        fontSize: 13
    },

    view16: { flexDirection: 'row' },

    text4: {
        textDecorationLine: 'underline',
        color: 'green',
        fontSize: 13
    },

    button1: {
        backgroundColor: colors.buttons,
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.buttons,
        height: 50,
        paddingHorizontal: 20,
        width: '100%'

    },

    title1: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -3

    },

    view17: {
        marginVertical: 10,
        marginTop: 30
    },

    view18: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 15,
    },

    text5: {
        fontSize: 15,
        fontWeight: 'bold',
    },

    view19: {
        backgroundColor: 'white',
        paddingHorizontal: 15,

    },

    view20: {
        marginTop: 5
    },

    view21: {
        marginTop: 5,
        marginBottom: 10,
        alignItems: 'flex-end',
    },

    button2: {
        backgroundColor: colors.background3,
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.background2,
        height: 40,
        paddingHorizontal: 20,
        // width:'100%'

    },

    title2: {
        color: colors.buttons,
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -3

    }

})