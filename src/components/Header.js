import React from 'react';

import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { colors, parameters, } from "../global/styles"
import Icon from 'react-native-ionicons';

export default function Header({ title, navigation }) {

    return (
        <View style={styles.header}>
            <View style={{ marginLeft: 20 }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>

                    <Icon
                        ios="ios-arrow-back"
                        android="md-arrow-back"
                        color={colors.headerText}
                        size={28}

                    />
                </TouchableOpacity>

            </View>
            <View>
                <Text style={styles.headerText}>{title}</Text>
            </View>



        </View >
    )
}


const styles = StyleSheet.create({
    header: {

        flexDirection: 'row',
        backgroundColor: colors.buttons,
        height: parameters.headerHeight,
    },

    headerText: {
        color: colors.headerText,
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 100
    },

})