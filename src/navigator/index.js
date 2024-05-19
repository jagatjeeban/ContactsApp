import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import AuthStackNavigator from "./stack/AuthStack";
import HomeStackNavigator from "./stack/HomeStack";
import { useSelector } from "react-redux";

const MainStackNavigator = () => {

    let authStatus = useSelector((state) => state.name.loginStatus);

    return(
        <NavigationContainer theme={DarkTheme}>
            {authStatus? 
                <HomeStackNavigator />
            :
                <AuthStackNavigator />
            }
        </NavigationContainer>
    )
}

export default MainStackNavigator;