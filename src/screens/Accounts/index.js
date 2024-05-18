import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import React from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

//import constants
import { Colors, FontFamily, Images } from '../../common/constants';

//import svg
import SvgPlus   from '../../assets/icons/svg/plus.svg';
import SvgRemove from '../../assets/icons/svg/remove.svg';
import SvgLock   from '../../assets/icons/svg/lock.svg';
import { PageHeader } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Accounts = () => {

  const signOut = async() => {
    await GoogleSignin.signOut();
    await AsyncStorage.removeItem('CURRENT_USER');
  }

  const UserProfile = ({item, index}) => {
    return(
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:'space-between', padding:20}}>
            <View style={{flexDirection:"row"}}>
                <Image source={Images.defaultAvatar} style={{width: 44, height: 44}} />
                <View style={{marginLeft: 15}}>
                    <Text style={styles.userName}>Morgan Bill Ford</Text>
                    <Text style={styles.userEmail}>billfordmorgan@gmail.com</Text>
                    {index === 0? 
                    <View style={{flexDirection:'row', alignItems:'center', marginTop: 5}}>
                        <View style={{backgroundColor: Colors.Primary, width:9, height: 9, borderRadius:40}} />
                        <Text style={{color: Colors.Primary, fontSize: 14, fontFamily: FontFamily.OutfitRegular, marginLeft: 7}}>Active account</Text>
                    </View>: null}
                </View>
            </View>
            <TouchableOpacity onPress={() => signOut()} style={{padding: 10, alignItems:"center", justifyContent:"center", backgroundColor: Colors.Base_Light_Red, borderRadius: 6}}>
                <SvgRemove />
            </TouchableOpacity>
        </View>
    )
  }

  const BlockedContactItem = () => {
    return(
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingVertical: 10}}>
            <View style={{flexDirection:'row', alignItems:"center"}}>
                <Image source={Images.defaultAvatar} style={{width: 44, height: 44}} />
                <Text style={{color: Colors.Base_White, fontSize: 18, fontFamily: FontFamily.OutfitRegular, marginLeft:15}}>Alex</Text>
            </View>
            <TouchableOpacity>
                <SvgLock />
            </TouchableOpacity>
        </View>
    )
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
        <PageHeader headerTitle={'Accounts'} iconArr={['addBtn']} />
        <View>
            <FlatList
                data={[1, 2]}
                showsVerticalScrollIndicator={false}
                renderItem={UserProfile}
                ItemSeparatorComponent={<View style={styles.lineSeparator} />}
            />
        </View>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
            <Text style={{color: Colors.Base_White, fontSize: 20, fontFamily: FontFamily.OutfitRegular, marginBottom:20}}>Blocked Contacts</Text>
            <FlatList
                data={[1, 2, 3, 4]}
                showsVerticalScrollIndicator={false}
                renderItem={BlockedContactItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: Colors.BgColor
    },
    headerStyle: {
        flexDirection:'row', 
        alignItems:"center", 
        justifyContent:"space-between",
        padding: 20,
    },
    favouriteText: {
        color: Colors.Base_White, 
        fontSize: 20, 
        fontFamily: FontFamily.OutfitMedium, 
        fontWeight: '500'
    },
    userName: {
        color: Colors.Base_White, 
        fontSize: 18, 
        fontWeight: '500', 
        fontFamily: FontFamily.OutfitMedium
    },
    userEmail: {
        color: Colors.Base_Medium_Grey, 
        fontSize: 14, 
        fontFamily: FontFamily.OutfitRegular, 
        marginTop:5
    },
    lineSeparator: {
        height: 1, 
        backgroundColor: Colors.Base_Grey, 
        marginHorizontal: 20
    },
})

export default Accounts;