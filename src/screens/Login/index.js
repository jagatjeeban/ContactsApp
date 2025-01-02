import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { showMessage } from 'react-native-flash-message';
import { useIsFocused } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

//import constants
import { Colors, FontFamily, Strings } from '../../common/constants';

//import config file
import config from '../../common/config';

//import svgs
import SvgGoogleLogo from '../../assets/icons/svg/googleLogo.svg';
import SvgWelcome from '../../assets/images/svg/welcome.svg';

//import redux actions
import { loginSuccess } from '../../store/authSlice';

const Login = () => {

    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    //states
    const [loaderStatus, setLoaderStatus] = useState(false);

    //function to sign in using google credentials
    const signIn = async () => {
        setLoaderStatus(true);
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            const currentUser = await GoogleSignin.getCurrentUser();
            dispatch(loginSuccess(currentUser));
            setLoaderStatus(false);

            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential);
        } catch (error) {
            setLoaderStatus(false);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                showMessage({ message: 'Sign In failed', description: 'Something wrong happened! Please try again.', type: "danger", icon: "info" });
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                showMessage({ message: 'Please install or update the play services on your devices to be able to sign in using google!', type: "danger", icon: 'info' })
            } else {
                showMessage({ message: 'Sign In failed', description: 'Something wrong happened! Please check your internet connection.', type: "danger", icon: "info" });
                console.log('SIGN IN ERROR: ', JSON.stringify(error));
            }
        }
    }

    //configure google sign in with web client id
    useEffect(() => {
        if (isFocused) {
            GoogleSignin.configure({
                'webClientId': config.WEB_CLIENT_ID
            });
        }
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.mainContainer}>
                <View style={{ marginTop: '30%' }}>
                    <SvgWelcome width={276} height={214} />
                </View>
                <View style={{ marginTop: 32, alignItems: 'center' }}>
                    <Text style={styles.welcomeToConnect}>{Strings.WelcomeToConnect}</Text>
                    <Text style={styles.appDescription}>{Strings.WelcomeText}</Text>
                </View>
                <TouchableOpacity activeOpacity={1} onPress={() => signIn()} style={styles.loginBtn}>
                    {loaderStatus ?
                        <ActivityIndicator size={'small'} color={Colors.Base_White} />
                        :
                        <>
                            <SvgGoogleLogo />
                            <Text style={styles.loginBtnText}>{Strings.ContinueWithGoogle}</Text>
                        </>
                    }
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
        alignItems: 'center',
        paddingHorizontal: 20
    },
    inputContainer: {
        width: '100%',
        marginTop: 20
    },
    inputStyle: {
        borderColor: 'black',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        color: 'black'
    },
    loginBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        backgroundColor: Colors.Bg_Light,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 12,
        paddingVertical: 15,
        width: '100%',
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