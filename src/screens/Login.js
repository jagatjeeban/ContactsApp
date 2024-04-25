import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import { useIsFocused } from '@react-navigation/native';

//import constants
import { Colors, FontFamily, Strings } from '../common/constants';

//import svgs
import SvgGoogleLogo from '../assets/icons/svg/googleLogo.svg';
import SvgWelcome    from '../assets/images/svg/welcome.svg';

const Login = ({navigation}) => {

    const isFocused = useIsFocused();

    const [ emailId, setEmailId ]                     = useState('');
    const [ password, setPassword ]                   = useState('');
    const [ emailInputColor, setEmailInputColor ]     = useState('black');
    const [ passInputColor, setPassInputColor ]       = useState('black');

    //function to validate the login form
    const validateForm = () => {
        if(emailId === ''){
            setEmailInputColor('red');
            showMessage({message: 'Email Id', description:"Please enter email id", type:'danger', icon:'info'});
        } else if(!emailId.includes('.com') || !emailId.includes('@')){
            setEmailInputColor('red')
            showMessage({message: 'Email Id', description:'Please enter valid email id', type:'danger', icon:'danger'});
        } else if(password === ''){
            setEmailInputColor('black');
            setPassInputColor('red')
            showMessage({message: 'Password', description:"Please enter password", type:'danger', icon:'info'});
        } else {
            setPassInputColor('black');
            saveCredentials();
        }
    }

    //function to save the credentials in the async storage
    const saveCredentials = async() => {
        try {
            await AsyncStorage.setItem('EMAIL', emailId);
            await AsyncStorage.setItem('PASSWORD', password);
            // navigation.navigate('Contacts');
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.mainContainer}>
            <View style={{marginTop:'30%'}}>
                <SvgWelcome width={276} height={214} />
            </View>
            <View style={{marginTop: 32, alignItems:'center'}}>
                <Text style={styles.welcomeToConnect}>Welcome To Connect</Text>
                <Text style={styles.appDescription}>{Strings.WelcomeText}</Text>
            </View>
            <TouchableOpacity activeOpacity={1} onPress={() => null} style={styles.loginBtn}>
                <SvgGoogleLogo />
                <Text style={styles.loginBtnText}>Continue with Google</Text>
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
        fontWeight: 500, 
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
        fontWeight: 500, 
        marginLeft: 20, 
        fontFamily: FontFamily.OutfitMedium
    },
})