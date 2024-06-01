import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TabStackNavigator from "../TabStack";
import { Colors } from "../../../common/constants";
{/* Contacts screen starts here */}
import CreateContact from "../../../screens/Home/CreateContact";
import ContactDetails from "../../../screens/Home/ContactDetails";
import SelectContacts from "../../../screens/Home/SelectContacts";
{/* Favourites screen starts here */}
import AddFavourites from "../../../screens/Favourites/AddFavourites";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {

    const screenOptionStyle = {
        headerShown: false,
        gestureEnabled: false,
    }

    return(
        <Stack.Navigator screenOptions={screenOptionStyle}>
            {/* Contacts screen starts here */}
            <Stack.Screen name="Home"                   component={TabStackNavigator} options={{navigationBarColor: Colors.Bg_Light}} />
            <Stack.Screen name="CreateContact"          component={CreateContact}     options={{navigationBarColor: Colors.BgColor}} />
            <Stack.Screen name="ContactDetails"         component={ContactDetails}    options={{navigationBarColor: Colors.BgColor}} />
            <Stack.Screen name="SelectContacts"         component={SelectContacts}    options={{navigationBarHidden: true}} />
            {/* Favourites screen starts here */}
            <Stack.Screen name="AddFavourites"          component={AddFavourites}     options={{navigationBarHidden: true}}/>
        </Stack.Navigator>
    )
}

export default HomeStackNavigator;