import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";
import React from "react";
import TabStackNavigator from "../TabStack";
{/* Contacts screen starts here */}
import AddContact from "../../../screens/Home/AddContact";
import ContactDetails from "../../../screens/Home/ContactDetails";
import SelectContacts from "../../../screens/Home/SelectContacts";
{/* Favourites screen starts here */}
import AddFavourites from "../../../screens/Favourites/AddFavourites";

const Stack = createStackNavigator();

const HomeStackNavigator = () => {

    const screenOptionStyle = {
        headerShown: false,
        gestureEnabled: false,
        ...TransitionPresets.SlideFromRightIOS
    }
    return(
        <Stack.Navigator screenOptions={screenOptionStyle}>
            {/* Contacts screen starts here */}
            <Stack.Screen name="Home"                   component={TabStackNavigator} />
            <Stack.Screen name="AddContact"             component={AddContact} />
            <Stack.Screen name="ContactDetails"         component={ContactDetails} />
            <Stack.Screen name="SelectContacts"         component={SelectContacts} />
            {/* Favourites screen starts here */}
            <Stack.Screen name="AddFavourites"          component={AddFavourites}/>
        </Stack.Navigator>
    )
}

export default HomeStackNavigator;