import React, { useState, useContext, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-ionicons';
import { colors } from '../global/styles'
import { SignInContext } from '../contexts/authContext';
import { useNavigation } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

export default function DrawerContent(props) {

    const [displayName, setDisplayName] = useState('');
    const [email, setUserEmail] = useState('');
    const [cartitemsnumber, setCartItemsNumber] = useState(0);
    const { dispatchSignedIn } = useContext(SignInContext)
    const navigation = useNavigation();

    const handleNavigateToCartScreen = (item) => {
        navigation.navigate('CartScreen');

    };


    useEffect(() => {
        const unsubscribe = firestore()
            .collection('users')
            .where('email', '==', email)
            .onSnapshot(querySnapshot => {
                const data = [];
                querySnapshot.forEach(documentSnapshot => {
                    data.push({
                        id: documentSnapshot.id,
                        ...documentSnapshot.data(),
                    });
                });

                if (data.length > 0) {
                    const userData = data[0];
                    const cartItemsLength = userData.cart.length;
                    setCartItemsNumber(cartItemsLength);
                }
            });

        return unsubscribe;
    }, [email]);

    useEffect(() => {
        const fetchUserName = async () => {
            const user = auth().currentUser;
            if (user) {

                setDisplayName(user.displayName);
                setUserEmail(user.email);

            }
        };

        fetchUserName();
    }, []);


    async function signOut() {

        try {
            auth()
                .signOut()
                .then(
                    () => {
                        console.log("USER SUCCESSFULLY SIGNED OUT")
                        dispatchSignedIn({ type: "UPDATE_SIGN_IN", payload: { userToken: null } })
                    })

        } catch (error) {
            Alert.alert(error.code)
        }
    }

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={{ backgroundColor: colors.buttons, }}>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        paddingLeft: 20, paddingVertical: 10
                    }}>


                        <View style={{ marginLeft: 50 }}>
                            <Text style={{ fontWeight: 'bold', color: colors.cardbackground, fontSize: 18 }} >{displayName}</Text>
                            <Text style={{ color: colors.cardbackground, fontSize: 14 }} >{email}</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: "space-evenly", paddingBottom: 5 }}>

                        <View style={{ flexDirection: 'row', marginTop: 0, }}>
                            <View style={{ marginLeft: 10, alignItems: "center", justifyContent: "center" }}  >
                                <Text style={{ fontWeight: 'bold', color: colors.cardbackground, fontSize: 18 }}>1</Text>
                                <Text style={{ color: colors.cardbackground, fontSize: 14 }} >My Favorites</Text>
                            </View>
                        </View>

                        <TouchableOpacity onPress={handleNavigateToCartScreen}>
                            <View style={{ flexDirection: 'row', marginTop: 0 }}>
                                <View style={{ marginLeft: 10, alignItems: "center", justifyContent: "center" }}  >
                                    <Text style={{ fontWeight: 'bold', color: colors.cardbackground, fontSize: 18 }}>{cartitemsnumber}</Text>
                                    <Text style={{ color: colors.cardbackground, fontSize: 14 }} >My Cart</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>



                <DrawerItemList {...props} />

                <DrawerItem
                    label="Payment"
                    icon={({ color, size }) => (
                        <Icon
                            type="material"
                            name="card"
                            color={color}
                            size={size}

                        />
                    )}
                />


                <DrawerItem
                    label="Promotions"
                    icon={({ color, size }) => (
                        <Icon
                            type="material"
                            name="pricetags"
                            color={color}
                            size={size}

                        />
                    )}
                />



                <DrawerItem
                    label="Settings"
                    icon={({ color, size }) => (
                        <Icon
                            type="material"
                            name="settings"
                            color={color}
                            size={size}

                        />
                    )}
                />



                <DrawerItem
                    label="Help"
                    icon={({ color, size }) => (
                        <Icon
                            type="material"
                            name="help-circle"
                            color={color}
                            size={size}

                        />
                    )}
                />





                <View style={{ borderTopWidth: 1, borderTopColor: colors.grey5 }}>
                    <Text style={styles.preferences}>Preferences</Text>

                    <View style={styles.switchText}>
                        <Text style={styles.darkthemeText}>Dark Theme</Text>
                        <View style={{ paddingRight: 10 }}>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor="#f4f3f4"
                            />
                        </View>
                    </View>

                </View>




            </DrawerContentScrollView>


            <DrawerItem
                label="Sign Out"
                icon={({ color, size }) => (
                    <Icon
                        type="material"
                        name="exit"
                        color={color}
                        size={size}

                    />
                )}
                onPress={() => { signOut() }}


            />

        </View>
    )
}






const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    preferences: {
        fontSize: 16,
        color: colors.grey2,
        paddingTop: 10,
        paddingLeft: 20,
    },

    switchText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingVertical: 5,
        paddingRight: 10
    },
    darkthemeText: {
        fontSize: 16,
        color: colors.grey2,
        paddingTop: 10,
        paddingLeft: 0,
        fontWeight: "bold"
    }

})