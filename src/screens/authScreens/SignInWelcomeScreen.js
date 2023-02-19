import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import { colors, parameters, title } from "../../global/styles"
import Header from "../../components/Header"
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-ionicons';
import Swiper from 'react-native-swiper'


export default function SignInWelcomeScreen({ navigation }) {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }} >


            <View style={{ justifyContent: 'flex-start', alignItems: 'center', paddingTop: 20 }}>
                <Text style={{ fontSize: 26, color: colors.buttons, fontWeight: 'bold' }}>DISCOVER RESTAURANTS</Text>
                <Text style={{ fontSize: 26, color: colors.buttons, fontWeight: 'bold' }}>IN YOUR AREA</Text>
            </View>


            <View style={{}}>

                <Swiper autoplay={true} style={{ height: 250, }}>
                    <View style={styles.slide1}>
                        <Image
                            source={{ uri: "https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?s=612x612&w=0&k=20&c=eaKRSIAoRGHMibSfahMyQS6iFADyVy1pnPdy1O5rZ98=" }}
                            style={{ height: "100%", width: "100%" }}
                        />
                    </View>

                    <View style={styles.slide2}>
                        <Image
                            source={{ uri: "https://images.unsplash.com/photo-1502998070258-dc1338445ac2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" }}
                            style={{ height: "100%", width: "100%" }}
                        />
                    </View>


                    <View style={styles.slide3}>
                        <Image
                            source={{ uri: "https://t3.ftcdn.net/jpg/03/11/19/38/360_F_311193887_0aXFwwXXHu4PsBAVNW1USeypg1clOH8E.jpg" }}
                            style={{ height: "100%", width: "100%" }}
                        />
                    </View>

                    <View style={styles.slide3}>
                        <Image
                            source={{ uri: "https://media.istockphoto.com/id/1300476665/photo/high-angle-view-asian-chinese-womans-hand-on-mobile-app-for-online-food-delivery-during.jpg?b=1&s=170667a&w=0&k=20&c=T9YLTb1ZwGOF-A2rjUuAzcUpE3-Cp8m8Q6oXRBH90A8=" }}
                            style={{ height: "100%", width: "100%" }}
                        />
                    </View>

                </Swiper>
            </View>


            <View style={{ marginBottom: 20 }}>

                <View style={{ marginHorizontal: 20, marginTop: 30 }}>

                    <TouchableOpacity style={parameters.buttonStyle} onPress={() => {
                        navigation.navigate("SignInScreen")
                    }}>
                        <Text style={parameters.buttonTitle}>SIGN IN</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginHorizontal: 20, marginTop: 30 }}>

                    <TouchableOpacity style={styles.createButton} onPress={() => {
                        navigation.navigate("SignUpScreen")
                    }}>
                        <Text style={styles.createButtonTitle}>Create an account</Text>
                    </TouchableOpacity>

                </View>

            </View>


        </ScrollView>
    )
}


const styles = StyleSheet.create({

    slide1: {
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },

    createButton: {
        backgroundColor: "white",
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ff8c52",
        height: 50,
        paddingHorizontal: 20,
        borderColor: colors.buttons,
    },

    createButtonTitle: {
        color: colors.grey1,
        fontSize: 20,
        alignSelf: "center",
        fontWeight: "bold",
        justifyContent: "center",
        marginTop: -3
    }

})
