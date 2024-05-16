import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import { useIsFocused } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

//import constants
import { Colors, FontFamily, Strings } from '../../common/constants';

//import config file
import config from '../../common/config';

//import svgs
import SvgGoogleLogo from '../../assets/icons/svg/googleLogo.svg';
import SvgWelcome    from '../../assets/images/svg/welcome.svg';

const Login = ({navigation}) => {

    const isFocused = useIsFocused();

    //function to sign in using google credentials
    const onGoogleButtonPress = async() => {
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();
        
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            alert('Successfully signed in');
            console.log('------> ', JSON.stringify(auth().signInWithCredential(googleCredential)));

            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential);
        } catch (error) {
            console.log('SIGN IN ERROR: ', JSON.stringify(error));
            showMessage({message: error?.message, type:"danger", icon:'info'})
        }
    }

    useEffect(() => {
        if(isFocused){
            GoogleSignin.configure({
                'webClientId': config.WEB_CLIENT_ID,
                'scopes': ['https://www.googleapis.com/auth/contacts.readonly']
            });
        }
    }, [isFocused]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.mainContainer}>
            <View style={{marginTop:'30%'}}>
                <SvgWelcome width={276} height={214} />
            </View>
            <View style={{marginTop: 32, alignItems:'center'}}>
                <Text style={styles.welcomeToConnect}>{Strings.WelcomeToConnect}</Text>
                <Text style={styles.appDescription}>{Strings.WelcomeText}</Text>
            </View>
            <TouchableOpacity activeOpacity={1} onPress={() => onGoogleButtonPress()} style={styles.loginBtn}>
                <SvgGoogleLogo />
                <Text style={styles.loginBtnText}>{Strings.ContinueWithGoogle}</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Login;

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: Colors.BgColor
    },
    mainContainer: {
        flex: 1, 
        backgroundColor: Colors.BgColor,
        alignItems:'center', 
        paddingHorizontal:20
    },
    inputContainer: {
        width:'100%', 
        marginTop:20
    },
    inputStyle: {
        borderColor: 'black', 
        padding: 10, 
        borderWidth:1, 
        borderRadius:10, 
        color: 'black'
    },
    loginBtn: {
        flexDirection:'row',
        alignItems:'center',
        position:'absolute', 
        bottom: 30, 
        backgroundColor: Colors.Bg_Light, 
        alignItems:'center', 
        justifyContent:"center", 
        borderRadius:12, 
        paddingVertical: 15, 
        width:'100%',
        borderWidth: 1,
        borderColor: Colors.Base_Grey
    },
    welcomeToConnect: {
        color: Colors.Base_White, 
        fontSize: 30, 
        fontWeight: '500', 
        fontFamily: FontFamily.OutfitMedium
    },
    appDescription: {
        color: Colors.Base_Medium_Grey, 
        fontSize: 18, 
        marginTop: 16, 
        fontFamily: FontFamily.OutfitRegular
    },
    loginBtnText: {
        color: Colors.Base_White, 
        fontSize: 18, 
        fontWeight: '500', 
        marginLeft: 20, 
        fontFamily: FontFamily.OutfitMedium
    },
})