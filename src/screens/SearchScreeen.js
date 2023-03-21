import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ImageBackground, Dimensions, TouchableWithoutFeedback, ImageBackgroundComponent } from 'react-native'
import SearchComponent from '../components/SearchComponent'
import { colors } from "../global/styles";
import firestore from '@react-native-firebase/firestore';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function SearchScreen({ navigation }) {

    const [categoriesData, setCategoriesData] = useState([]);

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
        <View style={{ flex: 1, marginBottom: 10, paddingTop: 20 }}>

            <SearchComponent />
            <View style={{ marginTop: 10 }}>

                <View>
                    <FlatList
                        style={{}}
                        data={categoriesData}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => (
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    navigation.navigate("SearchResultScreen", { item: item.categoryName })
                                }}
                            >
                                <View style={styles.imageView}>
                                    <ImageBackground
                                        style={styles.image}
                                        source={{ uri: item.img }}
                                    >

                                        <View style={styles.textView}>
                                            <Text style={{ color: colors.cardbackground }}>{item.categoryName}</Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                            </TouchableWithoutFeedback>
                        )}

                        horizontal={false}
                        showsverticalScrollIndicator={false}
                        numColumns={2}
                        ListHeaderComponent={<Text style={styles.listHeader}>All Categories</Text>}

                    />
                </View>


            </View>

        </View>
    )
}






const styles = StyleSheet.create({

    imageView: {
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        width: SCREEN_WIDTH * 0.4475,
        height: SCREEN_WIDTH * 0.4475,
        marginLeft: SCREEN_WIDTH * 0.035,
        marginBottom: SCREEN_WIDTH * 0.035
    },

    image: {
        height: SCREEN_WIDTH * 0.4475,
        width: SCREEN_WIDTH * 0.4475,
        borderRadius: 10,
    },

    listHeader: {
        fontSize: 16,
        color: colors.grey2,
        paddingBottom: 10,
        marginLeft: 12

    },

    textView: {
        height: SCREEN_WIDTH * 0.4475,
        width: SCREEN_WIDTH * 0.4475,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(52, 52, 52,0.3)'
    },


})
