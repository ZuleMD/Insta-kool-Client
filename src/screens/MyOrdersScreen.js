import React, { useState, useEffect } from 'react'
import { colors } from "../global/styles"
import Header from "../components/Header"
import { Text, StyleSheet, View, ScrollView, Image } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function MyOrdersScreen({ navigation }) {
    const [orderItems, setOrderItems] = useState([]);



    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const currentUser = auth().currentUser;
                if (currentUser) {
                    const email = currentUser.email;
                    const orderRef = firestore()
                        .collection('orders')
                        .where('user.email', '==', email)
                        .where('status', '==', 'pending');

                    const orderSnapshot = await orderRef.get();

                    const orders = orderSnapshot.docs.map((doc) => doc.data().products);
                    const mergedOrderItems = [].concat(...orders);

                    setOrderItems(mergedOrderItems);

                }
            } catch (error) {
                console.log('Error fetching orders data: ', error);
            }
        };

        fetchOrderData();
    }, []);





    return (
        <View style={styles.container}>
            <Header title="Your Orders" type="arrow-left" navigation={navigation} />

            <ScrollView>
                <View>
                    <View>
                        <View style={styles.view2}>
                            <Text style={styles.text4}>You Have {orderItems.length} Pending Order(s)</Text>
                        </View>

                        {orderItems.map((item, index) => (
                            <View key={index}>
                                <View style={styles.view2}>
                                    <Text style={styles.text2}>{item.product.name} (QTY: {item.quantity})</Text>
                                </View>
                                <Image source={{ uri: item.product.img }} style={styles.image} />

                                <Text style={styles.text3}>Restaurant: {item.product.restaurantName}</Text>
                                <Text style={styles.text4}>{item.product.description}</Text>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.text12}>{item.product.price * item.quantity} TND</Text>
                                </View>
                                <View style={styles.divider} />

                            </View>
                        ))}


                    </View>
                </View>
            </ScrollView>


        </View>
    );
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
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
    },

    view2: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    text3: {
        fontSize: 20,
        fontWeight: "bold",
        color: "green",
        marginLeft: 10
    },

    text2: {
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 10
    },

    view3: {
        borderWidth: 3,
        borderColor: colors.grey5,
        borderRadius: 5,
        marginRight: 10
    },

    text4: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.grey3,
        marginLeft: 10
    },


    text7: {
        fontWeight: "bold",
        color: colors.grey3,
        padding: 5,
        marginRight: 14,
    },

    text11: {
        paddingLeft: 10,
        fontWeight: "bold",
        fontSize: 18,
        color: colors.grey1
    },

    text12: {
        paddingLeft: 10,
        fontWeight: "bold",
        fontSize: 20,
        color: colors.red
    },

    view17: {
        alignItems: "center",
        padding: 10,
        backgroundColor: colors.cardbackground,
        marginTop: -5
    },

    view18: {
        backgroundColor: colors.buttons,
        alignItems: "center",
        paddingVertical: 5,
        marginBottom: 0,
        width: 320,
        borderRadius: 12
    },

    text10: {
        padding: 10,
        fontWeight: "bold",
        fontSize: 18,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: colors.grey4,
        marginVertical: 10,
    }


})