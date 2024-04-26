import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, Alert, Image } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import RBSheet from 'react-native-raw-bottom-sheet'

//import constants
import { Colors, FontFamily, Images } from '../../common/constants'

//import svgs
import SvgPlus       from '../../assets/icons/svg/plus.svg';
import SvgSearch     from '../../assets/icons/svg/search.svg';
import SvgActiveUser from '../../assets/icons/svg/activeUser.svg';
import SvgAddAccount from '../../assets/icons/svg/addAccount.svg';

const Contacts = ({navigation}) => {

  const isFocused = useIsFocused();

  //refs
  const refProfileSheet = useRef();

  //states
  const [ contacts, setContacts ]           = useState([]);

  //function to get new contacts
  const getContacts = async() => {
    const newContact = await AsyncStorage.getItem('NEW_CONTACT');
    setContacts(JSON.parse(newContact));
  }

  //function to delete any contact
  const deleteContact = async(index) => {
    let updatedList = [...contacts];
    updatedList.splice(index, 1);
    setContacts(updatedList);
    await AsyncStorage.setItem('NEW_CONTACT', JSON.stringify(updatedList));
  }

  //function to show alert for delete action
  const deleteAlert = (name, index) => {
    Alert.alert(
      'Delete Contact', 
      `Are you sure you want to delete ${name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteContact(index),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    )
  }

  //logged in user profile component
  const UserProfileSheet = ({refRBSheet}) => {
    return(
      <RBSheet ref={refRBSheet} height={350} customStyles={{draggableIcon: styles.pillsBarStyle, container: styles.bottomSheet}} draggable dragOnContent closeOnPressBack>
        <View style={{flex: 1, marginHorizontal:20, justifyContent:"space-between"}}>
          <View>
            <View style={styles.userInfo}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image source={Images.defaultAvatar} style={{width: 44, height: 44}} />
                <View style={{marginLeft: 20}}>
                  <Text style={styles.userName}>Morgan Bill Ford</Text>
                  <Text style={styles.userEmail}>fordmorganbill@gmail.com</Text>
                </View>
              </View>
              <View style={styles.activeUser}>
                <SvgActiveUser width={12} height={12} />
                <Text style={{color: Colors.Primary, fontSize: 12, fontFamily: FontFamily.OutfitRegular, marginLeft:7}}>Active</Text>
              </View>
            </View>
            <View style={styles.lineSeparator} />
            <View style={styles.userInfo}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image source={Images.defaultAvatar} style={{width: 44, height: 44}} />
                <View style={{marginLeft: 20}}>
                  <Text style={styles.userName}>Morgan Bill Ford</Text>
                  <Text style={styles.userEmail}>fordmorganbill@gmail.com</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.addAccountBtn}>
            <SvgAddAccount />
            <Text style={{color: Colors.Base_White, fontSize: 18, fontFamily: FontFamily.OutfitMedium, fontWeight: 500, marginLeft: 10}}>Add Another Account</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    )
  }

  useEffect(() => {
    if(isFocused){
      getContacts();
    }
  }, [isFocused]);

  const Header = () => {
    return(
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', padding:20}}>
        <View style={{width:"83%", flexDirection:"row", alignItems:'center', padding: 15, borderRadius: 12, borderWidth:1, borderColor: Colors.Base_Grey, backgroundColor:Colors.Bg_Light}}>
          <SvgSearch />
          <Text style={{color: Colors.Base_Medium_Grey, fontSize: 16, fontFamily: FontFamily.OutfitRegular, marginLeft:10}}>Search</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => refProfileSheet?.current?.open()} style={{width: 50, height: 50}}>
          <Image source={Images.defaultAvatar} style={{width: 50, height: 50}} />
        </TouchableOpacity>
      </View>
    )
  }

  const ContactItem = ({item, index}) => {
    return(
      <View style={{flexDirection:"row", alignItems:"center", paddingVertical:10}}>
        <View style={{marginRight: 20, alignItems:"center"}}>
          {index === 0? 
          <Text style={{color: Colors.Base_Medium_Grey, fontSize: 20, fontWeight: 500, fontFamily: FontFamily.OutfitMedium}}>A</Text>
          : 
          <View style={{marginRight:15}} />}
        </View>
        <Image source={Images.defaultAvatar} style={{width:44, height: 44}} />
        <Text style={{color: Colors.Base_White, fontSize: 18, fontFamily: FontFamily.OutfitMedium, marginLeft: 20}}>Alex</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header />
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{height: 10}} />}
          renderItem={ContactItem}
          ListFooterComponent={<View style={{height: 200}} />}
        />
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('AddContact')} style={styles.addContactBtn}>
        <SvgPlus />
      </TouchableOpacity>
      <UserProfileSheet refRBSheet={refProfileSheet} />
    </SafeAreaView>
  )
}

export default Contacts;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.BgColor
  },
  addContactBtn: {
    position:"absolute", 
    right:20, 
    bottom:150, 
    backgroundColor: Colors.Primary_Light, 
    padding: 17,
    borderRadius:12, 
    alignItems:'center', 
    justifyContent:'center'
  },
  pillsBarStyle: {
    backgroundColor: Colors.Base_Grey,
    marginVertical: 20,
    width: 72,
  },
  bottomSheet: {
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    paddingBottom: 20,
    backgroundColor: Colors.Bg_Light
  },
  userInfo: {
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between'
  },
  userName: {
    color: Colors.Base_White, 
    fontSize: 18, 
    fontWeight: 500, 
    fontFamily: FontFamily.OutfitMedium
  },
  userEmail: {
    color: Colors.Base_Medium_Grey, 
    fontSize: 14, 
    fontFamily: FontFamily.OutfitRegular, 
    marginTop:5
  },
  activeUser: {
    backgroundColor: Colors.Primary_Light, 
    borderRadius:6, 
    paddingVertical:10, 
    paddingHorizontal:15, 
    alignItems:'center', 
    justifyContent:'center', 
    flexDirection:'row'
  },
  lineSeparator: {
    height: 1, 
    backgroundColor: Colors.Base_Grey, 
    marginVertical:20
  },
  addAccountBtn: {
    flexDirection:"row", 
    marginBottom:20, 
    backgroundColor: Colors.Primary, 
    alignItems:"center", 
    justifyContent:'center', 
    borderRadius: 12, 
    paddingVertical: 15
  },
})