import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import { useIsFocused } from '@react-navigation/native';

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
            navigation.navigate('Contacts');
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.mainContainer}>
            <Text style={{color:'black', fontSize:25, fontWeight: 600}}>Log In</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Enter Email Id'
                    placeholderTextColor={'grey'}
                    value={emailId}
                    keyboardType='email-address'
                    style={[styles.inputStyle, {borderColor: emailInputColor}]}
                    onChangeText={(e) => setEmailId(e)}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Enter Password'
                    placeholderTextColor={'grey'}
                    value={password}
                    secureTextEntry={true}
                    style={[styles.inputStyle, {borderColor: passInputColor}]}
                    onChangeText={(e) => setPassword(e)}
                />
            </View>
            <TouchableOpacity onPress={() => validateForm()} activeOpacity={0.7} style={styles.loginBtn}>
                <Text style={{color:'white', fontSize:15, fontWeight:500}}>Log In to Contacts</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Login;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, 
        alignItems:'flex-start', 
        marginTop:'50%', 
        marginHorizontal:20
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
        backgroundColor: 'black', 
        marginTop:20, 
        alignItems:'center', 
        justifyContent:'center', 
        padding:15, 
        borderRadius:10, 
        width:'100%'
    },
})