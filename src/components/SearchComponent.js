import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Modal, TextInput, FlatList, TouchableOpacity, Keyboard } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-ionicons';
import { colors } from "../global/styles"
import firestore from '@react-native-firebase/firestore';


export default function SearchComponent() {

    const navigation = useNavigation();

    const [categoriesData, setCategoriesData] = useState([]);
    const [data, setData] = useState([...categoriesData])
    const [modalVisible, setModalVisible] = useState(false)
    const [textInputFossued, setTextInputFossued] = useState(true)
    const textInput = useRef(0)


    const contains = ({ name }, query) => {
        if (name.includes(query)) {
            return true
        }
        return false
    }


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
        <View style={{ alignItems: "center" }}>
            <TouchableWithoutFeedback
                onPress={() => {
                    setModalVisible(true)
                }}
            >
                <View style={styles.SearchArea}>
                    <Icon
                        ios="ios-search"
                        android="md-search"
                        style={styles.searchIcon}

                        size={32}
                    />
                    <Text style={{ fontSize: 15 }}>What are you looking for ?</Text>
                </View>
            </TouchableWithoutFeedback>

            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
            >
                <View style={styles.modal}>
                    <View style={styles.view1}>
                        <View style={styles.TextInput}>
                            <Animatable.View
                                animation={textInputFossued ? "fadeInRight" : "fadeInLeft"}
                                duration={400}
                            >
                                <Icon name={textInputFossued ? "arrow-back" : "search"}
                                    onPress={() => {
                                        if (textInputFossued)
                                            setModalVisible(false)
                                        setTextInputFossued(true)
                                    }}
                                    style={styles.icon2}
                                    type="material"
                                    iconStyle={{ marginRight: 5 }}
                                />
                            </Animatable.View>

                            <TextInput
                                style={{ width: "90%" }}
                                placeholder=""
                                autoFocus={false}
                                ref={textInput}

                                onFocus={() => {
                                    setTextInputFossued(true)
                                }}

                                onBlur={() => {
                                    setTextInputFossued(false)
                                }}

                            />

                            <Animatable.View
                                animation={textInputFossued ? "fadeInLeft" : ""}
                                duration={400}
                            >
                                <Icon
                                    name={textInputFossued ? "cancel" : null}
                                    iconStyle={{ color: colors.grey3 }}
                                    type="material"
                                    style={{ marginRight: -10 }}
                                    onPress={() => {
                                        textInput.current.clear()
                                    }}
                                />
                            </Animatable.View>
                        </View>
                    </View>


                    <FlatList
                        data={categoriesData}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {

                                    Keyboard.dismiss
                                    navigation.navigate("SearchResultScreen", { item: item.categoryName })
                                    setModalVisible(false)
                                    setTextInputFossued(true)
                                }} >
                                <View style={styles.view2}>
                                    <Text style={{ color: colors.grey2, fontSize: 15 }}>{item.categoryName}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}

                    />


                </View>
            </Modal>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    text1: {
        color: colors.grey3,
        fontSize: 16
    },

    TextInput: {
        borderWidth: 1,
        borderRadius: 12,
        marginHorizontal: 0,
        borderColor: "#86939e",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignContent: "center",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10

    },

    SearchArea: {
        marginTop: 10,
        width: "94%",
        height: 50,
        backgroundColor: colors.grey5,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.grey4,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 5
    },

    searchIcon: {
        fontSize: 24,
        padding: 5,
        color: colors.grey2,
    },

    view1: {
        height: 70,
        justifyContent: "center",

        paddingHorizontal: 10,
    },

    view2: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
    },

    icon2: {
        fontSize: 24,
        padding: 5,
        color: colors.grey2,
    },
    modal: {
        flex: 1
    }

})