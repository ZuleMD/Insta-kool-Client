import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from "../../global/styles"
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-ionicons';
import { useNavigation } from '@react-navigation/native';

const MenuScreen = ({ onPress }) => {

    const [productsData, setProductsData] = useState([]);
    const navigation = useNavigation();

    const handleNavigateToProductDetails = (item) => {
        navigation.navigate('ProductDetailsScreen', { product: item });


    };


    useEffect(() => {
        const unsubscribe = firestore()
            .collection('restaurants')
            .where('name', '==', onPress.restaurant)
            .onSnapshot(async querySnapshot => {
                const restaurantDocs = querySnapshot.docs;
                const filteredRestaurantData = await Promise.all(restaurantDocs.map(async restaurantDoc => {
                    const productsQuerySnapshot = await restaurantDoc.ref.collection('products')
                        .where('status', '==', 'active').get();
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
                const allProductsData = restaurantData.reduce((acc, curr) => [...acc, ...curr.products], []);
                setProductsData(allProductsData);

            });
        return unsubscribe;
    }, [onPress.restaurant]);



    return (
        <View style={styles.container}>

            <View>
                {productsData.map((items) =>

                    <View key={items.key} style={styles.view1}>
                        <TouchableOpacity onPress={() => handleNavigateToProductDetails(items)}
                        >


                            <View style={styles.view2}>
                                <Icon name='star' color="gold" />
                                <Text style={styles.text1}>{items.name}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
                }
            </View>
        </View>
    )
}


export default MenuScreen


const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 20
    },
    view1: { paddingHorizontal: 10, },

    view2: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        padding: 10,
        borderBottomColor: colors.grey5
    },

    text1: {
        color: colors.grey3,
        fontSize: 18,
        fontWeight: "bold"
    }


})
