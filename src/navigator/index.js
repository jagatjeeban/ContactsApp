import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./stack/AuthStack";
import HomeStackNavigator from "./stack/HomeStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const MainStackNavigator = () => {

    //function to check if user is already logged in
    const isCurrentUser = async() => {
        const currentUser = await GoogleSignin.getCurrentUser();
        if(currentUser){
            return true;
        } else {
            return false;
        }
    }

    return(
        <NavigationContainer>
            {isCurrentUser() === true? 
                <HomeStackNavigator />
                :
                <AuthStackNavigator />
            }
        </NavigationContainer>
    )
}

export default MainStackNavigator;