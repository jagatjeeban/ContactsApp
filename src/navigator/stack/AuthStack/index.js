import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../../../screens/Login";

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {

    const screenOptionStyle = {
        headerShown: false,
        gestureEnabled: false,
    }
    return(
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Login"        component={Login} />
        </Stack.Navigator>
    )
}

export default AuthStackNavigator;