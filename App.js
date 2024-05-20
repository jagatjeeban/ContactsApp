import React, { useEffect } from "react";
import { StatusBar, Platform } from "react-native";
import Navigator from "./src/navigator";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import FlashMessage from "react-native-flash-message";

//import constants
import { Colors } from "./src/common/constants";

//import store and persistor
import { store, persistor } from "./src/store/store";

const App = () => {

    useEffect(() => {
        if(Platform.OS === 'android') StatusBar.setBackgroundColor(Colors.BgColor);
    }, []);
    
    return(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Navigator />
                <FlashMessage position={'bottom'} duration={4000} floating={true} />
            </PersistGate>
        </Provider>
    )
}

export default App;