import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'

//import constants
import { Colors, FontFamily, Images } from '../../common/constants'

//import svgs
import SvgPlus from '../../assets/icons/svg/plus.svg';
import SvgSearch from '../../assets/icons/svg/search.svg';

const Contacts = ({navigation}) => {

  const isFocused = useIsFocused();
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

  //contact card item component
  const ContactCard = ({item, index}) => {
    return(
      <View key={index} style={{width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between', padding: 15, borderRadius: 10, backgroundColor:'black'}}>
        <View style={{maxWidth:'75%'}}>
          <Text style={{color:'white', fontSize: 20, fontWeight: 600}}>{item?.name}</Text>
          <Text style={{color:'white', fontSize: 15, fontWeight: 400}}>{`Email Id: ${item?.emailId}`}</Text>
          <Text style={{color:'white', fontSize: 15, fontWeight: 400}}>{`Mobile Number: +91-${item?.number}`}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => deleteAlert(item?.name, index)} style={{backgroundColor:"white", paddingVertical:5, paddingHorizontal:10, borderRadius:6, alignItems:'center', justifyContent:'center'}}>
          <Text style={{color:'black', fontSize: 15}}>Delete</Text>
        </TouchableOpacity>
      </View>
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
        <Image source={Images.defaultAvatar} style={{width: 50, height: 50}} />
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
      <View style={{width:'100%', height:'100%', paddingHorizontal: 20}}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
          showsVerticalScrollIndicator={false}
          renderItem={ContactItem}
        />
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('AddContact')} style={styles.addContactBtn}>
        <SvgPlus />
      </TouchableOpacity>
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
    right:15, 
    bottom:50, 
    backgroundColor: Colors.Primary_Light, 
    padding: 17,
    borderRadius:12, 
    alignItems:'center', 
    justifyContent:'center'
  },
})