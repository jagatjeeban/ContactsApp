import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./stack/AuthStack";
import HomeStackNavigator from "./stack/HomeStack";

const MainStackNavigator = () => {

    return(
        <NavigationContainer>
            <HomeStackNavigator />
        </NavigationContainer>
    )
}

export default MainStackNavigator;