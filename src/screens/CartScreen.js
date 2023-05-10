import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from "../global/styles"
import Header from "../components/Header"



export default function CartScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <Header title="Your Cart" type="arrow-left" navigation={navigation} />


            <View style={{ alignItems: "center", marginTop: 10 }}>
                <Text style={styles.text1} >Welcome to cart screen</Text>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
    },
    text1: {
        color: colors.grey3,
        fontSize: 16
    },


})