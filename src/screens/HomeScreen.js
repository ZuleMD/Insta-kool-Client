import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Pressable, Image, Dimensions, StatusBar } from 'react-native';
import Icon from 'react-native-ionicons';
import Countdown from 'react-native-countdown-component'
import HomeHeader from '../components/HomeHeader';
import { colors } from '../global/styles';
import firestore from '@react-native-firebase/firestore';
import FoodCard from '../components/FoodCard';


const SCREEN_WIDTH = Dimensions.get('window').width

export default function HomeScreen({ navigation }) {

    const [delivery, setDelivery] = useState(true)
    const [indexCheck, setIndexCheck] = useState("0")
    const [restaurantsData, setRestaurantsData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);


    useEffect(() => {
        const unsubscribe = firestore()
            .collection('restaurants')
            .where('status', '==', "active")
            .onSnapshot(querySnapshot => {
                const data = [];
                querySnapshot.forEach(documentSnapshot => {
                    data.push({
                        id: documentSnapshot.id,
                        ...documentSnapshot.data(),
                    });
                });
                setRestaurantsData(data);
            });
        return unsubscribe;
    }, []);


    useEffect(() => {
        const unsubscribe = firestore()
            .collection('categories')
            .onSnapshot(querySnapshot => {
                const data = [];
                querySnapshot.forEach(documentSnapshot => {
                    data.push({
                        id: documentSnapshot.id,
                        ...documentSnapshot.data(),
                    });
                });
                setCategoriesData(data);
            });
        return unsubscribe;
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar
                translucent
                barStyle="light-content"
                backgroundColor="#89CFF0"
            />

            <HomeHeader navigation={navigation} />
            <ScrollView
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={true}
            >

                <View style={{ backgroundColor: colors.cardbackground, paddingBottom: 5 }}>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: "space-evenly" }}>
                        <TouchableOpacity
                            onPress={() => {
                                setDelivery(true)
                            }}
                        >
                            <View style={{ ...styles.deliveryButton, backgroundColor: delivery ? colors.buttons : colors.grey5 }}>
                                <Text style={styles.deliveryText}>Delivery</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setDelivery(false)
                                navigation.navigate("RestaurantMapScreen")
                            }}
                        >
                            <View style={{ ...styles.deliveryButton, backgroundColor: delivery ? colors.grey5 : colors.buttons }}>
                                <Text style={styles.deliveryText}>Pick Up</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.filterView}>
                    <View style={styles.addressView}>
                        <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10 }}>
                            <Icon
                                ios="ios-pin"
                                android="md-pin"
                                color={colors.grey1}
                                size={26}
                            />

                            <Text style={{ marginLeft: 5 }}>22 Beessie Street</Text>
                        </View>

                        <View style={styles.clockView}>
                            <Icon
                                ios="ios-clock"
                                android="md-clock"
                                color={colors.grey1}
                                size={26}
                            />

                            <Text style={{ marginLeft: 5 }}>Now</Text>
                        </View>

                    </View>

                    <View>
                        <Icon
                            ios="ios-options"
                            android="md-options"
                            color={colors.grey1}
                            size={26}
                        />
                    </View>
                </View>

                <View style={styles.headerTextView}>
                    <Text style={styles.headerText}>Categories</Text>
                </View>

                <View>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={categoriesData}
                        keyExtractor={(item) => item.id}
                        extraData={indexCheck}
                        renderItem={({ item, index }) => (

                            <Pressable
                                onPress={() => {
                                    setIndexCheck(item.id);
                                    navigation.navigate("SearchResultScreen", { item: item.categoryName });
                                }}
                            >
                                <View style={indexCheck === item.id ? { ...styles.smallCardSelected } : { ...styles.smallCard }}>
                                    <Image
                                        style={{ height: 60, width: 60 }}
                                        source={{ uri: item.img }}
                                    />
                                    <View>
                                        <Text style={indexCheck === item.id ? { ...styles.smallCardTextSected } : { ...styles.smallCardText }}>
                                            {item.name}
                                        </Text>
                                    </View>
                                </View>
                            </Pressable>

                        )}
                    />
                </View>
                <View style={styles.headerTextView}>
                    <Text style={styles.headerText}>Free Delivery now</Text>
                </View>

                <View>

                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Text style={{ fontSize: 16, alignSelf: "center", marginLeft: 10, marginRight: 10 }} >Options changing in</Text>
                        <Countdown
                            until={3600}
                            size={14}
                            digitStyle={{ backgroundColor: colors.lightgreen, marginTop: 20 }}
                            digitTxtStyle={{ color: colors.cardbackground }}
                            timeToShow={['M', 'S']}
                            timeLabels={{ m: 'Min', s: 'Sec' }}
                        />
                    </View>

                    <FlatList
                        style={{ marginTop: 10, marginBottom: 10 }}
                        horizontal={true}
                        data={restaurantsData}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (

                            <View style={{ marginRight: 5 }}>
                                <FoodCard
                                    screenWidth={SCREEN_WIDTH * 0.8}
                                    images={item.img}
                                    restaurantName={item.name}
                                    phone={item.phone}
                                    businessAddress={item.address}
                                    OnPressFoodCard={() => { navigation.navigate("RestaurantHomeScreen", { id: index, restaurant: item.name }) }}

                                />
                            </View>
                        )}
                    />
                </View>


                <View style={styles.headerTextView}>
                    <Text style={styles.headerText}>Promotions available</Text>
                </View>

                <View>
                    <FlatList
                        style={{ marginTop: 10, marginBottom: 10 }}
                        horizontal={true}
                        data={restaurantsData}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={{ marginRight: 5 }}>
                                <FoodCard
                                    screenWidth={SCREEN_WIDTH * 0.8}
                                    images={item.img}
                                    restaurantName={item.name}
                                    phone={item.phone}
                                    businessAddress={item.address}

                                />
                            </View>
                        )}
                    />
                </View>


                <View style={styles.headerTextView}>
                    <Text style={styles.headerText}>Restaurants in your Area</Text>
                </View>

                <View style={{ width: SCREEN_WIDTH, paddingTop: 10 }}>
                    {
                        restaurantsData.map(item => (
                            <View key={item.id} style={{ paddingBottom: 20 }}>
                                <FoodCard
                                    screenWidth={SCREEN_WIDTH * 0.95}
                                    images={item.img}
                                    restaurantName={item.name}
                                    phone={item.phone}
                                    businessAddress={item.address}


                                />
                            </View>
                        )
                        )
                    }
                </View>



            </ScrollView>

            {delivery &&
                <View style={styles.floatButton}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('RestaurantMapScreen')
                        }}
                    >

                        <Icon
                            ios="ios-pin"
                            android="md-pin"
                            size={30}
                            color={colors.buttons}
                            style={{ alignSelf: "center" }}
                        />

                        <Text style={{ color: colors.grey2 }}>Map</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>)
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 20


    },
    deliveryButton: {
        paddingHorizontal: 20,
        borderRadius: 15,
        paddingVertical: 5
    },

    deliveryText: {
        marginLeft: 5,
        fontSize: 16
    },

    filterView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginHorizontal: 10,
        marginVertical: 10
    },

    clockView: {
        flexDirection: "row",
        alignItems: 'center',
        marginLeft: 20,
        backgroundColor: colors.cardbackground,
        borderRadius: 15,
        paddingHorizontal: 5,
        marginRight: 20
    },
    addressView: {
        flexDirection: "row",
        backgroundColor: colors.grey5,
        borderRadius: 15,
        paddingVertical: 3,
        justifyContent: "space-between",
        paddingHorizontal: 20
    },

    headerText: {
        color: colors.grey2,
        fontSize: 24,
        fontWeight: "bold",
        paddingLeft: 10,
    },
    headerTextView: {
        backgroundColor: colors.grey5,
        paddingVertical: 3,
    },

    smallCard: {
        borderRadius: 30,
        backgroundColor: colors.grey5,
        justifyContent: "center",
        alignItems: 'center',
        padding: 5,
        width: 80,
        margin: 10,
        height: 100
    },

    smallCardSelected: {
        borderRadius: 30,
        backgroundColor: colors.buttons,
        justifyContent: "center",
        alignItems: 'center',
        padding: 5,
        width: 80,
        margin: 10,
        height: 100
    },

    smallCardTextSected: {
        fontWeight: "bold",
        color: colors.cardbackground
    },

    smallCardText: {
        fontWeight: "bold",
        color: colors.grey2
    },

    floatButton: {
        position: 'absolute',
        bottom: 10, right: 15,
        backgroundColor: 'white',
        elevation: 10,
        width: 60, height: 60,
        borderRadius: 30,
        alignItems: 'center'
    }


})