import { View, Text, SafeAreaView, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

//import constants
import { Colors, FontFamily, Images } from '../../common/constants';

//import components
import { PageHeader } from '../../components';

//import custom functions
import { getUcFirstLetter } from '../../common/helper/customFun';

//import svg
import SvgCheck    from './../../assets/icons/svg/check.svg';

const SelectContacts = ({navigation, route}) => {

  const isFocused = useIsFocused();
  const [ contacts, setContacts ]                 = useState([]);
  const [ letters, setLetters ]                   = useState([]);
  const [ selectedCount, setSelectedCount ]       = useState(null);

  //funtion to select contacts
  const selectContacts = (id, value) => {
    let updatedList = [...contacts];
    let prevIndex = updatedList.findIndex(item => item?.id === id);
    if(prevIndex !== -1){
        updatedList[prevIndex].isSelected = value;
        setContacts(updatedList);
        setSelectedCount(updatedList.filter(item => item.isSelected && item?.isSelected === true)?.length);
    }
  }

  //contact item component
  const ContactItem = ({item, index}) => {
    return(
      <TouchableOpacity key={index} activeOpacity={0.7} onPress={() => selectContacts(item?.id, !item?.isSelected)} style={styles.contactItemContainer}>
        <View style={{flexDirection:'row', alignItems:'center', width:"87%"}}>
            <Image source={Images.defaultAvatar} style={{width:44, height: 44}} />
            <Text style={styles.contactNameText}>{item?.name}</Text>
        </View>
        {!item.isSelected? 
        <View style={styles.checkBtn} />
        :
        <View style={styles.checkedBtn}>
            <SvgCheck width={13} height={13} />
        </View>}
      </TouchableOpacity>
    )
  }

  //contacts group item component
  const ContactGroupItem = ({item: letter, index}) => {
    return(
      <View key={index} style={{flexDirection:'row'}}>
        <Text style={styles.contactInitialText}>{letter}</Text>
        <FlatList
          data={contacts.filter(contact => getUcFirstLetter(contact?.name) === letter)}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          renderItem={ContactItem}
        />
      </View>
    )
  }

  //function to get the contacts list
  const getContactList = () => {
    let contacts = route?.params?.contacts;
    if(route?.params?.type === undefined){
      contacts.forEach(item => {
        delete item?.isSelected;
      })
      setContacts(contacts);
    } else {
      contacts.forEach(item => {
        item.isSelected = true;
      })
      setSelectedCount(contacts?.length);
      setContacts(contacts);
    }
  }

  useEffect(() => {
    if(isFocused){
        getContactList();
        setLetters(route?.params?.letters);
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
        <PageHeader headerTitle={selectedCount? `${selectedCount} selected`: 'Select Contacts'} backBtn iconArr={selectedCount? ['trash', 'share']: []} navigation={navigation} />
        <View style={{paddingHorizontal: 20}}>
            <FlatList
                data={letters}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                renderItem={ContactGroupItem}
                ListFooterComponent={<View style={{height: Platform.OS === 'android'? 230: 200}} />}
            />
      </View>
    </SafeAreaView>
  )
}

export default SelectContacts;

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: Colors.BgColor
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
    contactItemContainer: {
        flexDirection:"row", 
        alignItems:"center", 
        paddingVertical:10,
        width:"100%"
    },
    checkBtn: {
        width: 20, 
        height: 20, 
        borderWidth: 1, 
        borderColor: Colors.Base_Grey, 
        borderRadius:6
    },
    checkedBtn: {
        alignItems:"center", 
        justifyContent:'center', 
        width:20, 
        height: 20, 
        borderRadius:6, 
        backgroundColor: Colors.Primary
    },
})