import React, { useEffect } from "react";
import { StatusBar, Platform } from "react-native";
import Navigator from "./src/navigator";
import FlashMessage from "react-native-flash-message";
import { Colors } from "./src/common/constants";

const App = () => {

    useEffect(() => {
        if(Platform.OS === 'android') StatusBar.setBackgroundColor(Colors.Primary);
    }, []);
    
    return(
        <>
            <Navigator />
            <FlashMessage position={'bottom'} duration={4000} floating={true} />
        </>
    )
}

export default App;