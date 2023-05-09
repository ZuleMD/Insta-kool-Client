import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native'
import SearchResultCard from '../components/SearchResultCard'
import { colors } from "../global/styles";
import firestore from '@react-native-firebase/firestore';


const SCREEN_WIDTH = Dimensions.get('window').width;


const SearchResultScreen = ({ navigation, route }) => {
    const [restaurantsData, setRestaurantsData] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('restaurants')
            .where('status', '==', 'active')
            .onSnapshot(async querySnapshot => {
                const restaurantDocs = querySnapshot.docs;
                const filteredRestaurantData = await Promise.all(restaurantDocs.map(async restaurantDoc => {
                    const productsQuerySnapshot = await restaurantDoc.ref.collection('products')
                        .where('category', '==', route.params.item).
                        where('status', '==', 'active').get();
                    if (!productsQuerySnapshot.empty) {
                        const productsData = productsQuerySnapshot.docs.map(doc => doc.data());
                        return {
                            id: restaurantDoc.id,
                            ...restaurantDoc.data(),
                            products: productsData,
                        };
                    }
                }));
                const restaurantData = filteredRestaurantData.filter(Boolean); // remove undefined values
                setRestaurantsData(restaurantData);
                console.log(restaurantData);
            });
        return unsubscribe;
    }, [route.params.item]);


    return (
        <View style={styles.container}>



            <View>
                <FlatList
                    style={{ backgroundColor: colors.cardbackground }}
                    data={restaurantsData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (

                        <SearchResultCard
                            screenWidth={SCREEN_WIDTH}
                            images={item.img}
                            averageReview="4.3"
                            numberOfReview="306"
                            restaurantName={item.name}
                            businessAddress={item.address}
                            phone={item.phone}
                            productData={item.products}
                            OnPressRestaurantCard={() => { navigation.navigate("RestaurantHomeScreen", { id: index, restaurant: item.name }) }}
                        />

                    )}

                    ListHeaderComponent={
                        <View>
                            <Text style={styles.listHeader}>
                                {restaurantsData.length} {restaurantsData.length > 1 ? 'Results' : 'Result'} for {route.params.item}
                            </Text>
                        </View>
                    }

                    showsVerticalScrollIndicator={false}
                />
            </View>

        </View>
    )
}

export default SearchResultScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },

    listHeader: {
        color: colors.grey1,
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontWeight: "bold"
    }
})