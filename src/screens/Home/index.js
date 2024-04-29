import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, Alert, Image, Platform } from 'react-native'
import React, { useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';

//import constants
import { Colors, FontFamily, Images } from '../../common/constants';

//import svgs
import SvgPlus       from '../../assets/icons/svg/plus.svg';
import SvgActiveUser from '../../assets/icons/svg/activeUser.svg';
import SvgAddAccount from '../../assets/icons/svg/addAccount.svg';

//import components
import { HomeHeader } from '../../components';

//import custom functions
import { getUcFirstLetter } from '../../common/helper/customFun';

const Contacts = ({navigation}) => {

  const isFocused = useIsFocused();

  //refs
  const refProfileSheet = useRef();

  const dummyContacts = [
    {'id': 1, 'name': 'Alex'},
    {'id': 2, 'name': 'Kirti'},
    {'id': 3, 'name': 'Jagat'},
    {'id': 4, 'name': 'Vivek'},
    {'id': 5, 'name': 'Sk Singh'},
    {'id': 6, 'name': 'Aman'},
    {'id': 7, 'name': 'Vishal'},
    {'id': 8, 'name': 'Akhilesh'},
    {'id': 9, 'name': 'Jaggu'},
    {'id': 10, 'name': 'Shariq'},
    {'id': 11, 'name': 'Vishal Singh'},
  ];

  //logged in user profile component
  const UserProfileSheet = ({refRBSheet}) => {

    const ProfileItem = ({item, index}) => {
      return(
        <View style={styles.userInfo}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Image source={Images.defaultAvatar} style={{width: 44, height: 44}} />
            <View style={{marginLeft: 20}}>
              <Text style={styles.userName}>Morgan Bill Ford</Text>
              <Text style={styles.userEmail}>fordmorganbill@gmail.com</Text>
            </View>
          </View>
          {index === 0? 
          <View style={styles.activeUser}>
            <SvgActiveUser width={15} height={15} />
            <Text style={{color: Colors.Primary, fontSize: 15, fontFamily: FontFamily.OutfitRegular, marginLeft:7}}>Active</Text>
          </View>: null}
        </View>
      )
    }

    return(
      <RBSheet ref={refRBSheet} height={350} customStyles={{draggableIcon: styles.pillsBarStyle, container: styles.bottomSheet}} draggable dragOnContent closeOnPressBack>
        <View style={styles.bottomSheetContainer}>
          <View>
            <FlatList
              data={[1, 2]}
              showsVerticalScrollIndicator={false}
              renderItem={ProfileItem}
              ItemSeparatorComponent={<View style={styles.lineSeparator} />}
            />
          </View>
          <TouchableOpacity onPress={() => refRBSheet.current.close()} activeOpacity={0.7} style={styles.addAccountBtn}>
            <SvgAddAccount />
            <Text style={{color: Colors.Base_White, fontSize: 18, fontFamily: FontFamily.OutfitMedium, fontWeight: '500', marginLeft: 10}}>Add Another Account</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    )
  }

  //contact item component
  const ContactItem = ({item, index}) => {
    return(
      <TouchableOpacity key={index} activeOpacity={0.7} style={styles.contactItemContainer}>
        <Image source={Images.defaultAvatar} style={{width:44, height: 44}} />
        <Text style={styles.contactNameText}>{item?.name}</Text>
      </TouchableOpacity>
    )
  }

  //contacts group item component
  const ContactGroupItem = ({item: letter, index}) => {
    return(
      <View key={index} style={{flexDirection:'row'}}>
        <Text style={styles.contactInitialText}>{letter}</Text>
        <FlatList
          data={sortedContacts.filter(contact => getUcFirstLetter(contact?.name) === letter)}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          renderItem={ContactItem}
        />
      </View>
    )
  }

  //sorted contacts arrays in alphabetical order
  const sortedContacts = dummyContacts.sort((a, b) => a?.name?.localeCompare(b?.name));

  //extract unique first letters from the sorted contacts array
  const uniqueLetters = [...new Set(sortedContacts.map(contact => getUcFirstLetter(contact?.name)))];

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <HomeHeader clickEvent={() => refProfileSheet.current.open()} />
      <View style={{paddingHorizontal: 20}}>
        <FlatList
          data={uniqueLetters}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          renderItem={ContactGroupItem}
          ListFooterComponent={<View style={{height: Platform.OS === 'android'? 230: 130}} />}
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
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
    paddingBottom: 20,
    backgroundColor: Colors.Bg_Light,
    borderWidth: 1,
    borderColor: Colors.Base_Grey
  },
  userInfo: {
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between'
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
  activeUser: {
    backgroundColor: Colors.Primary_Light, 
    borderRadius:6, 
    paddingVertical:7, 
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
  bottomSheetContainer: {
    flex: 1, 
    marginHorizontal:20, 
    justifyContent:"space-between",
  },
  contactItemContainer: {
    flexDirection:"row", 
    alignItems:"center", 
    paddingVertical:10,
    width:"100%"
  },
  contactNameText: {
    color: Colors.Base_White, 
    fontSize: 18, 
    fontFamily: FontFamily.OutfitRegular, 
    marginLeft: 20,
    width:'100%'
  },
  contactInitialText: {
    color: Colors.Base_Medium_Grey, 
    fontSize: 20, 
    fontWeight: '500', 
    fontFamily: FontFamily.OutfitMedium,
    marginTop: 20,
    width: 40,
  },
})