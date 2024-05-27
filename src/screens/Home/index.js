import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, Image, Platform, PermissionsAndroid, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Contact, { checkPermission, requestPermission } from 'react-native-contacts';
import { useDispatch, useSelector } from 'react-redux';

//import constants
import { Colors, FontFamily, Images } from '../../common/constants';

//import common functions
import { sortContacts } from '../../common/helper/commonFun';

//import svgs
import SvgPlus       from '../../assets/icons/svg/plus.svg';

//import components
import { HomeHeader } from '../../components';

//import custom functions
import { getUcFirstLetter } from '../../common/helper/customFun';

//import redux actions
import { storeContacts } from '../../store/dashSlice';

const Contacts = ({navigation}) => {

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  let dash = useSelector((state) => state.dash);

  //states
  const [ contacts, setContacts ]                   = useState([]);
  const [ filteredContacts, setFilteredContacts ]   = useState([]);
  const [ sortedContacts, setSortedContacts ]       = useState([]);
  const [ uniqueLetters, setUniqueLetters ]         = useState([]);
  const [ loaderStatus, setLoaderStatus ]           = useState(false);

  //contact item component
  const ContactItem = ({item, index}) => {
    return(
      <TouchableOpacity key={index} activeOpacity={0.7} onPress={() => navigation.navigate('ContactDetails', {info: dash.contacts.filter(contact => contact?.recordID === item?.recordID)[0]})} style={styles.contactItemContainer}>
        <FastImage source={item?.thumbnailPath !== ''? {uri: item?.thumbnailPath, priority:'high'}: Images.defaultAvatar} style={{width:44, height: 44, borderRadius: 10}} />
        <Text style={styles.contactNameText}>{item?.displayName}</Text>
      </TouchableOpacity>
    )
  }

  //contacts group item component
  const ContactGroupItem = ({item: letter, index}) => {
    return(
      <View key={index} style={{flexDirection:'row'}}>
        <Text style={styles.contactInitialText}>{letter}</Text>
        <FlatList
          data={sortedContacts.filter(contact => getUcFirstLetter(contact?.displayName) === letter)}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          renderItem={ContactItem}
          keyExtractor={item => item?.recordID}
        />
      </View>
    )
  }

  //function to get all the contacts
  const getAllContacts = () => {
    setLoaderStatus(true);
    Contact.getAll()
      .then((contacts) => {
        let newList = contacts.filter(item => item?.phoneNumbers?.length > 0);
        dispatch(storeContacts(newList));
        let displayList = newList.map(item => {
          return {
            'recordID': item?.recordID,
            'displayName': Platform.OS === 'android'? item?.displayName: `${item?.givenName} ${item?.familyName}`,
            'thumbnailPath': item?.thumbnailPath
          }
        });
        setContacts(displayList);
        setFilteredContacts(displayList);
        setLoaderStatus(false);
      })
      .catch((e) => {
        setLoaderStatus(false);
        console.log(e);
      });
  }

  //function to request permission to read contacts
  const requestContactsPermission = async() => {
    if(Platform.OS === 'android'){
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Connect',
        message: 'Connect would like to view your contacts',
        buttonPositive: 'OK',
        buttonNeutral: 'Not now',
        buttonNegative: 'Cancel'
      })
      .then((res) => {
        getAllContacts();
      })
      .catch((error) => {
        console.log('Permission Error: ', error);
      });
    } 
    else {
      let response = await checkPermission();
      if(response === 'authorized'){
        getAllContacts();
      } else {
        await requestPermission();
      }
    }
  }

  useEffect(() => {
    requestContactsPermission();
  }, []);

  //sorted contacts arrays in alphabetical order
  useEffect(() => {
    setSortedContacts(sortContacts(filteredContacts));
  }, [filteredContacts]);

  //extract unique first letters from the sorted contacts array
  useEffect(() => {
    setUniqueLetters([...new Set(sortedContacts.map(contact => getUcFirstLetter(contact?.displayName)))]);
  }, [sortedContacts]);

  //function to search contacts
  const searchEvent = (req) => {
    if(req === ''){
      setFilteredContacts(contacts);
    } else {
      setFilteredContacts(contacts.filter(item => item?.displayName?.toLowerCase()?.includes(req?.toLowerCase())));
    }
  }

  //function to handle the navigation to select contacts screen
  const handleNavigationToSelectContacts = (type) => {
    if(type === 'all'){
      navigation.navigate('SelectContacts', {type: 'all', letters: uniqueLetters, contacts: sortedContacts});
    } else {
      navigation.navigate('SelectContacts', {letters: uniqueLetters, contacts: sortedContacts});
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <HomeHeader clickEvent={() => refProfileSheet.current.open()} placeholder={'Search contacts'} menuBtn selectEvent={() => handleNavigationToSelectContacts()} selectAllEvent={() => handleNavigationToSelectContacts('all')} searchEvent={(val) => searchEvent(val)} />
      {loaderStatus? 
          <View style={{alignItems:"center", justifyContent:"center", marginTop:'70%'}}>
            <ActivityIndicator size={'large'} color={Colors.Primary} />
          </View>
        :
        <View style={{paddingHorizontal: 20}}>
          <FlatList
            data={uniqueLetters}
            nestedScrollEnabled={true}
            refreshControl={
              <RefreshControl
                refreshing={loaderStatus}
                onRefresh={() => getAllContacts()}
                colors={[Colors.Primary]}
                progressBackgroundColor={Colors.Primary_Light}
              />
            }
            showsVerticalScrollIndicator={false}
            renderItem={ContactGroupItem}
            ListFooterComponent={<View style={{height: Platform.OS === 'android'? 230: 200}} />}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      }
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('CreateContact')} style={styles.addContactBtn}>
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
    right:20, 
    bottom:150, 
    backgroundColor: Colors.Primary_Light, 
    padding: 17,
    borderRadius:15, 
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