import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";
import React from "react";
import TabStackNavigator from "../TabStack";
import Home from "../../../screens/Home";
import AddContact from "../../../screens/Home/AddContact";

const Stack = createStackNavigator();

const HomeStackNavigator = () => {

    const screenOptionStyle = {
        headerShown: false,
        gestureEnabled: false,
        ...TransitionPresets.SlideFromRightIOS
    }
    return(
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Home"     component={TabStackNavigator} />
            <Stack.Screen name="AddContact"   component={AddContact} />
        </Stack.Navigator>
    )
}

export default HomeStackNavigator;