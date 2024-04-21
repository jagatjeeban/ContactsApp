import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../screens";
import Login from "../screens/Login";
import Contacts from "../screens/Contacts";
import AddContact from "../screens/AddContact";

const Stack = createStackNavigator();

const MainNavigator = () => {

    const screenOptionStyle = {
        headerShown: false,
        gestureEnabled: false,
        ...TransitionPresets.SlideFromRightIOS
    }
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptionStyle}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Login"        component={Login} />
                <Stack.Screen name="Contacts"     component={Contacts} />
                <Stack.Screen name="AddContact"   component={AddContact} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator;