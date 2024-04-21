import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({navigation}) => {

    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused){
            setTimeout(() => {
                checkLogin();
            }, 2000);
        }
    }, [isFocused]);

    //function to check if user is already logged in
    const checkLogin = async() => {
        const emailId = await AsyncStorage.getItem('EMAIL');
        const password = await AsyncStorage.getItem('PASSWORD');

        if(emailId && password){
            navigation.navigate('Contacts');
        } else {
            navigation.navigate('Login');
        }
    }
    
    return(
        <SafeAreaView style={styles.safeAreaView}>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text style={{color: 'black', fontSize:35, fontWeight:600}}>Contacts</Text>
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    safeAreaView: {
        flex:1
    }
});