import React from 'react'

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, parameters } from '../global/styles'
import Icon from 'react-native-ionicons';

export default function HomeHeader({ navigation }) {


    return (
        <View style={styles.header}>

            <View style={{ alignItems: "center", justifyContent: 'center', marginLeft: 15 }}>

                <TouchableOpacity onPress={() => {
                    navigation.toggleDrawer()
                }}>
                    <Icon
                        ios="ios-menu"
                        android="md-menu"
                        color={colors.cardbackground}
                        style={{ marginRight: 20 }}
                        size={32}
                    />
                </TouchableOpacity>

            </View>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: colors.cardbackground, fontSize: 25, fontWeight: 'bold' }}>XpressFood</Text>
            </View>

            <View style={{ alignItems: "center", justifyContent: "center", marginRight: 15 }}>
                <Icon
                    ios="ios-cart"
                    android="md-cart"
                    color={colors.cardbackground}
                    style={{ marginRight: 20 }}
                    size={32}
                />
            </View>


        </View>
    )
}

const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        backgroundColor: colors.buttons,
        height: parameters.headerHeight,
        justifyContent: 'space-between'
    }
})