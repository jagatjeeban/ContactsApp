import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

const SplashScreen = ({navigation}) => {

    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused){
            setTimeout(() => {
                navigation.navigate('Login');
            }, 3000);
        }
    });
    
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