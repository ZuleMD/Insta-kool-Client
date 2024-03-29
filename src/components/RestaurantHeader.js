import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground, Animated } from 'react-native'
import { restaurantsData } from '../global/Data'
import { colors } from "../global/styles"

import Icon from 'react-native-ionicons';

export default function RestaurantHeader({ navigation, restaurantimg }) {
    const index2 = 10
    const currentValue = new Animated.Value(1)

    const [liked, setLiked] = useState(false)
    const [counter, setCounter] = useState(-2)
    const [visible, setVisible] = useState(false)

    const likeHander = () => {
        if (liked == false)
            setVisible(true)

        setLiked(!liked)
        setCounter(index2)
    }

    useEffect(() => {
        console.log(restaurantimg);
        if (liked == true) {
            Animated.spring(currentValue, {
                toValue: 3,
                friction: 2,
                useNativeDriver: true
            }).start(() => {
                Animated.spring(currentValue, {
                    toValue: 1,
                    useNativeDriver: true,
                    friction: 2
                }).start(() => {
                    setVisible(false)
                })
            })
        }
    }, [liked])

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.container}
                source={{ uri: restaurantimg.toString() }}

            >

                <View style={styles.view1}>
                    <View style={styles.view2}>
                        <Icon
                            ios="ios-arrow-round-back"
                            android="md-arrow-round-back"
                            color={colors.black}
                            size={25}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                    <View style={styles.view3}>
                        <Icon
                            name="heart"
                            color={liked && (index2 === counter) ? colors.red : colors.grey5}
                            onPress={likeHander}
                        />
                    </View>

                </View>
                <View style={styles.view4}>
                    {visible && (index2 == counter) &&
                        <Animated.View style={{ transform: [{ scale: currentValue }] }}>
                            <Icon
                                name='heart'
                                size={40} color="red" />
                        </Animated.View>
                    }

                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        height: 150,
    },


    view1: {
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between"
    },

    view2: {
        margin: 10,
        width: 40,
        height: 40,
        backgroundColor: colors.cardbackground,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    },

    view3: {
        marginTop: 0,
        margin: 10,
        width: 40,
        height: 40,
        backgroundColor: colors.cardbackground,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    },

    view4: {
        marginTop: 0,
        alignItems: "center",
        justifyContent: "center"
    },


})