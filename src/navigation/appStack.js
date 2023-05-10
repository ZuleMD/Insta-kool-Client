import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen';
import RootClientTabs from './ClientTabs';
import RestaurantMapScreen from '../screens/RestaurantMapScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import RestaurantHomeScreen from '../screens/RestaurantHomeScreen';
import DrawerNavigator from './DrawerNavigator';
import ProductDetailsScreen from '../screens/RestaurantTabs/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';

const App = createStackNavigator();

export function AppStack() {

    return (
        <App.Navigator>
            <App.Screen
                name="App"
                component={DrawerNavigator}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />
            <App.Screen
                name="RestaurantMapScreen"
                component={RestaurantMapScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />

            <App.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />

            <App.Screen
                name="RootClientTabs"
                component={RootClientTabs}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />


            <App.Screen
                name="SearchResultScreen"
                component={SearchResultScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />
            <App.Screen
                name="RestaurantHomeScreen"
                component={RestaurantHomeScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />

            <App.Screen
                name="ProductDetailsScreen"
                component={ProductDetailsScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />

            <App.Screen
                name="CartScreen"
                component={CartScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />




        </App.Navigator>
    )
}
