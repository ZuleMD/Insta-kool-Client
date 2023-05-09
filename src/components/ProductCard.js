import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { colors } from '../global/styles'

const ProductCard = ({ name, price, img, description }) => {
    return (
        <View style={styles.view1}>
            <View style={styles.view2}>
                <View style={styles.view3}>
                    <Text style={styles.text1}>{name}</Text>
                    <Text style={styles.text2}>{price} TND</Text>
                </View>
                <View style={styles.view4}>
                    <Image style={styles.image} source={{ uri: img }} />
                </View>
            </View>
        </View>
    )
}

export default ProductCard

const styles = StyleSheet.create({

    view1: {
        backgroundColor: "white",
        elevation: 4,
        shadowOpacity: 0.4,
        shadowColor: "black",
        margin: 5,
        width: 210,
        padding: 10
    },

    view2: {
        flexDirection: "row",
        padding: 0,
        justifyContent: "space-between"
    },

    view3: {
        justifyContent: "space-between",
        width: 110
    },

    text1: {
        fontSize: 15,
        color: colors.grey1,
    },
    text2: {
        fontWeight: "bold",
        fontSize: 15,
        color: colors.red,
    },

    view4: {
        width: 75,
        height: 65
    },

    image: {
        height: 65,
        width: 75,
        borderRadius: 15,
    }


})