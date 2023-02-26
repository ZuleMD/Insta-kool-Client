import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import RestaurantMapScreen from '../screens/RestaurantMapScreen';

const App = createStackNavigator();

export function AppStack() {

    return (
        <App.Navigator>

            <App.Screen
                name="RestaurantMapScreen"
                component={RestaurantMapScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />

        </App.Navigator>
    )
}
