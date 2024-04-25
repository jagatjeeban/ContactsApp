import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, View } from "react-native";
import { Colors } from "../../../common/constants";

import Contacts from "../../../screens/Home";
import AddContact from "../../../screens/Home/AddContact";

const Tab = createBottomTabNavigator();

const TabStackNavigator = () => {

    const TabOption = (props) => {
        let activeScreen = props.state.routeNames[props.state.index];
        return(
            <View style={{width:'100%', position:'absolute', bottom:0, flexDirection:"row", justifyContent:"space-around", alignItems:"center", alignSelf:'center', backgroundColor: Colors.Primary_Light, height: 200}}>
                <Text style={{color: Colors.Base_White}}>Contacts</Text>
            </View>
        )
    }

    return(
        <Tab.Navigator screenOptions={{headerShown: false}} tabBar={(props) => <TabOption {...props} />}>
            <Tab.Screen name="Contacts" component={Contacts} />
        </Tab.Navigator>
    )
}

export default TabStackNavigator;