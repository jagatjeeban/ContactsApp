import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "../../../screens/Login";

const Stack = createStackNavigator();

const AuthStackNavigator = () => {

    const screenOptionStyle = {
        headerShown: false,
        gestureEnabled: false,
        ...TransitionPresets.SlideFromRightIOS
    }
    return(
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Login"        component={Login} />
        </Stack.Navigator>
    )
}

export default AuthStackNavigator;