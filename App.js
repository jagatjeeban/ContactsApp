import React from "react";
import MainNavigator from "./src/navigator";
import FlashMessage from "react-native-flash-message";

const App = () => {
    return(
        <>
            <MainNavigator />
            <FlashMessage position={'bottom'} duration={4000} floating={true} />
        </>
    )
}

export default App;