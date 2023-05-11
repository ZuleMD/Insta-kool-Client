import React, { useState, useEffect } from 'react'
import { colors } from "../global/styles"
import Header from "../components/Header"
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native'
import Icon from 'react-native-ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function CartScreen({ navigation }) {
    const [cartItems, setCartItems] = useState([]);
    const [userAddress, setUserAddress] = useState('');
    const [addressModalVisible, setAddressModalVisible] = useState(false);
    const [newAddress, setNewAddress] = useState('');


    const handleNavigateToOrderScreen = async () => {

        Alert.alert(
            'Confirmation',
            `You want the order to be delivered to address:\n\n${userAddress}?\n`,
            [
                {
                    text: 'Update Address',
                    onPress: () => {
                        setAddressModalVisible(true);
                    },
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        createOrder();
                    },
                }
            ]
        );
    }


    const createOrder = async () => {
        try {
            const currentUser = auth().currentUser;
            if (currentUser) {
                const email = currentUser.email;
                const userRef = firestore().collection('users').where('email', '==', email);
                const userSnapshot = await userRef.get();

                userSnapshot.forEach(async (doc) => {
                    const userData = doc.data();
                    if (userData && userData.cart) {
                        const orderData = {
                            user: userData,
                            products: userData.cart,
                            status: "pending",
                            timestamp: firestore.FieldValue.serverTimestamp(),
                        };

                        await firestore().collection('orders').add(orderData);

                        // Delete the cart items
                        await firestore().collection('users').doc(doc.id).update({ cart: [] });

                        setCartItems([]); // Update the local state

                        navigation.navigate('OrderScreen');
                    }
                });
            }
        } catch (error) {
            console.log('Error creating order: ', error);
        }
    };

    const handleUpdateAddress = async () => {
        try {
            const currentUser = auth().currentUser;
            if (currentUser) {
                const email = currentUser.email;
                const userRef = firestore().collection('users').where('email', '==', email);
                const userSnapshot = await userRef.get();

                userSnapshot.forEach(async (doc) => {
                    const userData = doc.data();
                    if (userData) {
                        await firestore().collection('users').doc(doc.id).update({
                            address: newAddress
                        });
                        setUserAddress(newAddress);
                    }
                });
            }
            setAddressModalVisible(false);
        } catch (error) {
            console.log('Error updating address: ', error);
        }
    }


    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const currentUser = auth().currentUser;
                if (currentUser) {
                    const email = currentUser.email;
                    const userRef = firestore().collection('users').where('email', '==', email);

                    const userSnapshot = await userRef.get();

                    userSnapshot.forEach((doc) => {
                        const userData = doc.data();
                        if (userData && userData.cart) {
                            setCartItems(userData.cart);
                            setUserAddress(userData.address);

                        }
                    });
                }
            } catch (error) {
                console.log('Error fetching cart data: ', error);
            }
        };

        fetchCartData();
    }, []);

    const calculateTotal = () => {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.product.price * item.quantity;
        });
        return total.toFixed(2); // Round to 2 decimal places
    };


    const deleteCartItem = async (index) => {
        try {
            const currentUser = auth().currentUser;
            if (currentUser) {
                const email = currentUser.email;
                const userRef = firestore().collection('users').where('email', '==', email);

                const userSnapshot = await userRef.get();
                userSnapshot.forEach((doc) => {
                    const userData = doc.data();
                    if (userData && userData.cart) {
                        const updatedCart = [...userData.cart];
                        updatedCart.splice(index, 1);

                        Alert.alert(
                            'Confirmation',
                            'Are you sure you want to delete this item from cart?',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                },
                                {
                                    text: 'Delete',
                                    onPress: async () => {
                                        // Delete the item
                                        await firestore().collection('users').doc(doc.id).update({ cart: updatedCart });
                                        setCartItems(updatedCart);
                                    },
                                    style: 'destructive',
                                },
                            ],
                            { cancelable: false }
                        );
                    }
                });
            }
        } catch (error) {
            console.log('Error deleting cart item: ', error);
        }
    };


    return (
        <View style={styles.container}>
            <Header title="Your Cart" type="arrow-left" navigation={navigation} />

            <ScrollView>
                <View>
                    <View>
                        <View style={styles.view2}>
                            <Text style={styles.text4}>You have {cartItems.length} items in your cart</Text>
                        </View>

                        {cartItems.map((item, index) => (
                            <View key={index}>
                                <View style={styles.view2}>
                                    <Text style={styles.text11}>{item.product.name} (QTY: {item.quantity})</Text>
                                    <TouchableOpacity onPress={() => deleteCartItem(index)}>
                                        <Text style={styles.text7}>
                                            <Icon name="trash" size={24} color="red" />
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.text3}>{item.product.price}*{item.quantity}= {item.product.price * item.quantity} TND</Text>
                            </View>
                        ))}

                    </View>
                </View>
            </ScrollView>

            {cartItems.length > 0 && (
                <TouchableOpacity onPress={handleNavigateToOrderScreen}>
                    <View style={styles.view17}>
                        <View style={styles.view18}>
                            <Text style={styles.text10}>
                                Order now ({calculateTotal()} TND)
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}

            <Modal visible={addressModalVisible}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Give new address</Text>
                    <TextInput
                        value={newAddress}
                        onChangeText={setNewAddress}
                        placeholder="Enter new address"
                        style={styles.input}
                    />
                    <TouchableOpacity onPress={handleUpdateAddress} style={styles.updateButton}>
                        <Text style={styles.buttonText}>Update Address</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setAddressModalVisible(false)} style={styles.cancelButton}>
                        <Text style={styles.buttonText2}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

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


    view2: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10
    },

    text3: {
        fontSize: 16,
        fontWeight: "bold",
        color: "green",
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
        fontSize: 20,
        color: colors.grey1
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

    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 5,
        justifyContent: 'center', // Center vertically
        flex: 1, // Take full height of the screen
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    updateButton: {
        backgroundColor: colors.buttons,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        marginBottom: 10,
    },
    cancelButton: {
        backgroundColor: colors.background3,
        borderColor: colors.background2,
        borderRadius: 12,
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,

    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonText2: {
        color: colors.background2,
        fontWeight: 'bold',
        fontSize: 16,
    },



})