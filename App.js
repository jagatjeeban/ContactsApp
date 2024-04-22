import React, { useEffect } from "react";
import { StatusBar, Platform } from "react-native";
import MainNavigator from "./src/navigator";
import FlashMessage from "react-native-flash-message";
import { Colors } from "./src/assets/common/constants";

const App = () => {

    useEffect(() => {
        if(Platform.OS === 'android') StatusBar.setBackgroundColor(Colors.Primary);
    }, []);
    
    return(
        <>
            <MainNavigator />
            <FlashMessage position={'bottom'} duration={4000} floating={true} />
        </>
    )
}

export default App;