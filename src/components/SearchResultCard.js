import React from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-ionicons';
import { colors } from "../global/styles";
import ProductCard from './ProductCard';




const SearchResultCard = ({
    OnPressRestaurantCard,
    restaurantName,
    deliveryAvailabe,
    discountAvailable,
    discountPercent,
    numberOfReview,
    businessAddress,
    phone,
    farAway,
    averageReview,
    images,
    productData


}) => {


    return (
        <View>
            <TouchableOpacity onPress={OnPressRestaurantCard}>
                <View style={styles.view1}>
                    <View style={{ height: 150 }}>
                        <ImageBackground
                            style={{ height: 160 }}
                            source={{ uri: images }}
                            imageStyle={styles.imageStyle}
                        />

                        <View style={styles.image}>
                            <Text style={styles.text1}>{averageReview}</Text>
                            <Text style={styles.text2}> {numberOfReview} reviews</Text>
                        </View>

                    </View>


                    <View style={styles.view3}>
                        <View style={{ paddingTop: 5 }}>
                            <Text style={styles.text5}>{restaurantName}</Text>
                        </View>

                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.view4}>


                                <Icon
                                    ios="ios-pin"
                                    android="md-pin"
                                    color={colors.CardComment}
                                    size={12}
                                    style={{ marginTop: 7, marginLeft: -4 }}

                                />
                                <Text style={styles.view5}>{businessAddress}</Text>
                            </View>
                            <View style={{ flex: 9 }}>

                                <Text style={styles.text6}>
                                    <Icon
                                        ios="ios-call"
                                        android="md-call"
                                        color={colors.grey2}
                                        size={12}
                                        style={{ marginRight: 5 }}

                                    />{' '}
                                    {phone}</Text>
                            </View>

                        </View>

                    </View>


                </View>

            </TouchableOpacity>
            <View style={{ marginTop: 5, paddingBottom: 20 }}>

                <FlatList
                    style={{ backgroundColor: colors.cardbackground }}
                    data={productData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <ProductCard
                            img={item.img}
                            name={item.name}
                            price={item.price}
                        />
                    )}
                    horizontal={true}
                />

            </View>


        </View>
    )
}

export default SearchResultCard


const styles = StyleSheet.create({

    view1: {
        marginHorizontal: 9,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },

    image: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: 'rgba(52, 52, 52,0.4)',
        padding: 2,
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 12
    },

    imageStyle: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },

    text1: {
        color: "white",
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: -3
    },

    text2: {
        color: "white",
        fontSize: 13,
        marginRight: 0,
        marginLeft: 0
    },

    view2: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: -5
    },
    text3: {
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.grey2,
    },

    text4: {
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.grey2,
    },
    view3: {
        flexDirection: "column",
        marginHorizontal: 5,
        marginBottom: 10,
        marginLeft: 0,
        marginTop: 5
    },

    text5: {
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.grey1,
    },

    view4: {
        flex: 4,
        flexDirection: "row",
        borderRightWidth: 1,
        borderRightColor: colors.grey4,
        paddingHorizontal: 5,

    },

    view5: {
        fontSize: 12,
        fontWeight: 'bold',
        paddingTop: 5,
        color: colors.grey3,
        marginLeft: 5
    },

    text6: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 4,
        marginLeft: 5,
        color: colors.grey3

    }

})