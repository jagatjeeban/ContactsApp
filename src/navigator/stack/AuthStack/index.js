import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Colors } from "../../../common/constants";
import Login from "../../../screens/Login";

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {

    const screenOptionStyle = {
        headerShown: false,
        gestureEnabled: false,
        navigationBarColor: Colors.BgColor
    }
    return(
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Login"        component={Login} />
        </Stack.Navigator>
    )
}

export default AuthStackNavigator;