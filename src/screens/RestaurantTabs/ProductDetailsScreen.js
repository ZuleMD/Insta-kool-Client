import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, Image, Platform, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-ionicons';
import { colors } from "../../global/styles";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const ProductDetailsScreen = ({ navigation, route }) => {
    const { product } = route.params;
    const [finalPrice, setFinalPrice] = useState(1);

    const addToCart = () => {
        const currentUser = auth().currentUser;
        if (currentUser) {
            const email = currentUser.email;
            const cartItem = {
                product,
                quantity: finalPrice,
            };

            const userRef = firestore().collection('users').where('email', '==', email);

            userRef.get()
                .then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        const doc = querySnapshot.docs[0];
                        const userDocRef = firestore().collection('users').doc(doc.id);

                        // User document exists, check if the product already exists in the cart
                        userDocRef.get()
                            .then((userDoc) => {
                                const userData = userDoc.data();
                                const cart = userData.cart || [];

                                const existingItem = cart.find((item) => item.product.name === product.name);
                                if (existingItem) {
                                    // Product already exists in the cart, increment the quantity
                                    existingItem.quantity += finalPrice;
                                } else {
                                    // Product does not exist in the cart, add it as a new item
                                    cart.push(cartItem);
                                }

                                // Update the cart field in the user document
                                userDocRef.update({
                                    cart,
                                })
                                    .then(() => {
                                        console.log('Product added to cart successfully!');
                                        Alert.alert('Success', 'Product added to cart successfully!', [
                                            {
                                                text: 'OK',
                                                onPress: () => navigation.navigate('CartScreen'), // Navigate to CartScreen
                                            },
                                        ]);
                                    })
                                    .catch((error) => {
                                        console.error('Error adding product to cart:', error);
                                    });
                            })
                            .catch((error) => {
                                console.error('Error getting user document:', error);
                            });
                    } else {
                        console.log('User document not found');
                    }
                })
                .catch((error) => {
                    console.error('Error getting user document:', error);
                });
        } else {
            console.log('User not authenticated');
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.backgroundImage}
                    source={{ uri: product.img }}
                />
            </View>

            <View style={styles.view12}>

                <Icon
                    ios="ios-arrow-round-back"
                    android="md-arrow-round-back"
                    color={colors.cardbackground}
                    size={25}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <View style={styles.view1}>
                <Text style={styles.text1}>{product.name}</Text>
                <Text style={styles.text2}>{product.description}</Text>

            </View>



            <View style={styles.view13}>
                <Text style={styles.text11}>Quantity</Text>
            </View>
            <View style={styles.view14}>
                <View style={styles.view15}>
                    <Icon
                        name="remove"
                        type="material"
                        color={colors.black}
                        size={25}
                        onPress={() => setFinalPrice(prevPrice => prevPrice > 1 ? prevPrice - 1 : 1)
                        }
                    />
                </View>
                <Text style={styles.text9}>{finalPrice}</Text>
                <View style={styles.view16}>
                    <Icon
                        name="add"
                        type="material"
                        color={colors.black}
                        size={25}
                        onPress={() => setFinalPrice(prevPrice => prevPrice + 1)}
                    />
                </View>
            </View>
            <TouchableOpacity onPress={addToCart} style={styles.view17}>
                <View style={styles.view18}>
                    <Text style={styles.text10}>
                        Add {finalPrice} to Cart {product.price * finalPrice} TND
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    fill: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    header: {
        width: "100%",
        backgroundColor: colors.buttons,
        overflow: 'hidden',
        height: 180//HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        width: "100%", //null,
        height: 180, //HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    bar: {
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'ios' ? 28 : 38,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    title: {
        color: 'white',
        fontSize: 28,
        fontWeight: "bold",
        marginLeft: 40
    },
    scrollViewContent: {
        // iOS uses content inset, which acts like padding.
        //paddingTop: Platform.OS !== 'ios' ?
        //HEADER_MAX_HEIGHT : 0,
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },

    view1: {
        backgroundColor: "white",
        padding: 10,
        marginBottom: 10
    },

    text1: {
        fontSize: 15,
        color: colors.grey1,
        fontWeight: "bold"
    },

    text2: {
        fontSize: 14,
        color: colors.grey2,
        marginTop: 5
    },
    view2: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    text3: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.grey1,
        marginLeft: 10
    },

    viw3: {
        borderWidth: 3,
        borderColor: colors.grey5,
        borderRadius: 5,
        marginRight: 10
    },

    text4: {
        fontWeight: "bold",
        color: colors.grey3,
        padding: 5
    },

    view4: {
        backgroundColor: "white",
        marginBottom: 10
    },
    view5: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 10
    },
    view6: {
        flexDirection: "row",
        alignItems: "center"
    },
    text5: { fontWeight: "bold", marginLeft: -10 },
    text6: { fontSize: 16, fontWeight: "bold", },

    view7: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    text8: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.grey1,
        marginLeft: 10
    },

    view9: {
        borderWidth: 3,
        borderColor: colors.grey5,
        borderRadius: 5,
        marginRight: 10
    },

    text7: {
        fontWeight: "bold",
        color: colors.grey3,
        padding: 5
    },

    view10: {
        backgroundColor: "white",
        marginBottom: 10
    },

    view11: {
        flexDirection: "row",
        alignItems: "center",
    },

    view12: {
        position: "absolute",
        top: 35,
        left: 15
    },

    view13: {
        paddingBottom: 0,
        marginTop: 5,
    },

    text11: {
        paddingLeft: 10,
        fontWeight: "bold",
        fontSize: 18,
        color: colors.grey3,
    },

    view14: {
        flexDirection: "row",
        backgroundColor: colors.cardbackground,
        paddingVertical: 5, marginBottom: 0,
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 5
    },

    view15: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.lightgreen,
        alignItems: "center",
        justifyContent: "center"
    },

    text9: {
        fontWeight: "bold",
        fontSize: 18,
    },
    view16: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.lightgreen,
        alignItems: "center",
        justifyContent: "center"
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

    view19: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 10
    }

})