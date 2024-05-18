import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./stack/AuthStack";
import HomeStackNavigator from "./stack/HomeStack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainStackNavigator = () => {

    const [ isLoggedIn, setIsLogedIn ] = useState(false);

    //function to get the current user
    const getCurrentUser = async() => {
        const currentUser = await AsyncStorage.getItem('CURRENT_USER');
        if(currentUser && Object.keys(JSON.parse(currentUser))?.length !== 0){
            setIsLogedIn(true);
        } else {
            setIsLogedIn(false);
        }
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    return(
        <NavigationContainer>
            {isLoggedIn? 
                <HomeStackNavigator />
            :
                <AuthStackNavigator />
            }
        </NavigationContainer>
    )
}

export default MainStackNavigator;