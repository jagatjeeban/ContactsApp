import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useSelector } from "react-redux";
import FastImage from "react-native-fast-image";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

//import constants
import { Colors, FontFamily, Images } from "../../../common/constants";

//import svgs
import SvgContacts from '../../../assets/icons/svg/contacts.svg';
import SvgActiveContacts from "../../../assets/icons/svg/primaryContact.svg";
import SvgFavourites from "../../../assets/icons/svg/favourites.svg";
import SvgActiveFav from '../../../assets/icons/svg/primaryFav.svg';

//import tab screens
import Contacts from "../../../screens/Home";
import Favourites from "../../../screens/Favourites";
import Accounts from "../../../screens/Accounts";

const Tab = createBottomTabNavigator();

const TabStackNavigator = () => {

    let userInfo = useSelector((state) => state.name.userInfo);

    const TabOption = (props) => {
        let activeScreen = props.state.routeNames[props.state.index];
        const navigateToContacts = () => {
            props.navigation.navigate('Contacts');
        }
        const navigateToFavourites = () => {
            props.navigation.navigate('Favourites');
        }
        const navigateToAccounts = () => {
            props.navigation.navigate('Accounts');
        }

        return(
            <View style={styles.mainContainer}>
                <TouchableOpacity activeOpacity={1} onPress={navigateToContacts} style={{alignItems:'center'}}>
                    <View style={[styles.tabIconContainer, {backgroundColor: activeScreen === 'Contacts'? Colors.Primary_Light: null}]}>
                        {activeScreen === 'Contacts'? <SvgActiveContacts width={20} height={20} />: <SvgContacts width={20} height={20} />}
                    </View>
                    <Text style={[styles.tabTitle, {color: activeScreen === 'Contacts'? Colors.Primary: Colors.Base_Medium_Grey}]}>Contacts</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={navigateToFavourites} style={{alignItems:'center'}}>
                    <View style={[styles.tabIconContainer, {backgroundColor: activeScreen === 'Favourites'? Colors.Primary_Light: null}]}>
                        {activeScreen === 'Favourites'? <SvgActiveFav width={20} height={20} />: <SvgFavourites width={20} height={20} />}
                    </View>
                    <Text style={[styles.tabTitle, {color: activeScreen === 'Favourites'? Colors.Primary: Colors.Base_Medium_Grey}]}>Favourites</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={navigateToAccounts} style={{alignItems:"center"}}>
                    <FastImage source={{uri: userInfo?.user?.photo, priority:"high"}} style={{width: 50, height: 50, borderWidth: activeScreen === 'Accounts'? 1.5: 0, borderColor: Colors.Primary, borderRadius:10}} />
                    <Text style={[styles.tabTitle, {color: activeScreen === 'Accounts'? Colors.Primary: Colors.Base_Medium_Grey}]}>Accounts</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return(
        <Tab.Navigator screenOptions={{headerShown: false}} tabBar={(props) => <TabOption {...props} />}>
            <Tab.Screen name="Contacts"   component={Contacts} />
            <Tab.Screen name="Favourites" component={Favourites} />
            <Tab.Screen name="Accounts"   component={Accounts} />
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