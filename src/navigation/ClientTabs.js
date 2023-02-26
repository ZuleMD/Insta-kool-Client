import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { colors } from '../global/styles'
import Icon from 'react-native-ionicons';
import HomeScreen from '../screens/HomeScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import { ClientStack } from './ClientStack';
import SearchScreen from '../screens/SearchScreeen';


const ClientTabs = createBottomTabNavigator();


export default function RootClientTabs() {

    return (
        <ClientTabs.Navigator
            screenOptions={{
                activeTintColor: colors.buttons,
                headerShown: false
            }}
        >
            <ClientTabs.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={
                    {
                        tabBarLabel: "Home",
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                ios="ios-home"
                                android="md-home"
                                color={color}
                                size={size}
                            />
                        )
                    }
                }

            />


            <ClientTabs.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={
                    {
                        tabBarLabel: "Search",
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                ios="ios-search"
                                android="md-search"
                                color={color}
                                size={size}
                            />
                        )
                    }
                }

            />



            <ClientTabs.Screen
                name="MyOrdersScreen"
                component={MyOrdersScreen}
                options={
                    {
                        tabBarLabel: "My Orders",
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                ios="ios-list"
                                android="md-list"
                                color={color}
                                size={size}
                            />
                        )
                    }
                }

            />



            <ClientTabs.Screen
                name="MyAccount"
                component={MyAccountScreen}
                options={
                    {
                        tabBarLabel: "My Account",
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                ios="ios-person"
                                android="md-person"
                                color={color}
                                size={size}
                            />
                        )
                    }
                }

            />





        </ClientTabs.Navigator>
    )
}