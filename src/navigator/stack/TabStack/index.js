import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

//import constants
import { Colors, FontFamily } from "../../../common/constants";

//import svgs
import SvgContacts from '../../../assets/icons/svg/contacts.svg';
import SvgActiveContacts from "../../../assets/icons/svg/primaryContact.svg";
import SvgFavourites from "../../../assets/icons/svg/favourites.svg";
import SvgActiveFav from '../../../assets/icons/svg/primaryFav.svg';

//import tab screens
import Contacts from "../../../screens/Home";
import AddContact from "../../../screens/Home/AddContact";
import Favourites from "../../../screens/Favourites";

const Tab = createBottomTabNavigator();

const TabStackNavigator = () => {

    const TabOption = (props) => {
        let activeScreen = props.state.routeNames[props.state.index];

        const navigateToContacts = () => {
            props.navigation.navigate('Contacts');
        }

        const navigateToFavourites = () => {
            props.navigation.navigate('Favourites');
        }

        return(
            <View style={styles.mainContainer}>
                <TouchableOpacity activeOpacity={1} onPress={navigateToContacts} style={{alignItems:'center'}}>
                    <View style={[styles.tabIconContainer, {backgroundColor: activeScreen === 'Contacts'? Colors.Primary_Light: null}]}>
                        {activeScreen === 'Contacts'? <SvgActiveContacts />: <SvgContacts />}
                    </View>
                    <Text style={[styles.tabTitle, {color: activeScreen === 'Contacts'? Colors.Primary: Colors.Base_Medium_Grey}]}>Contacts</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={navigateToFavourites} style={{alignItems:'center'}}>
                    <View style={[styles.tabIconContainer, {backgroundColor: activeScreen === 'Favourites'? Colors.Primary_Light: null}]}>
                        {activeScreen === 'Favourites'? <SvgActiveFav />: <SvgFavourites />}
                    </View>
                    <Text style={[styles.tabTitle, {color: activeScreen === 'Favourites'? Colors.Primary: Colors.Base_Medium_Grey}]}>Favourites</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return(
        <Tab.Navigator screenOptions={{headerShown: false}} tabBar={(props) => <TabOption {...props} />}>
            <Tab.Screen name="Contacts" component={Contacts} />
            <Tab.Screen name="Favourites" component={Favourites} />
        </Tab.Navigator>
    )
}

export default TabStackNavigator;

const styles = StyleSheet.create({
    mainContainer: {
        width:'100%', 
        position:'absolute', 
        bottom:0, 
        flexDirection:"row", 
        justifyContent:"space-evenly", 
        alignItems:"center", 
        backgroundColor: Colors.Bg_Light, 
        borderWidth: 1,
        borderColor: Colors.Base_Grey,
        paddingBottom: Platform.OS === 'ios'? 30: 20,
        paddingTop: 20,
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30,
    },
    tabIconContainer: {
        paddingVertical: 15, 
        paddingHorizontal: 17, 
        alignItems:"center", 
        borderRadius:10
    },
    tabTitle: {
        fontSize: 14, 
        fontFamily: FontFamily.OutfitMedium, 
        marginTop: 5
    },
})