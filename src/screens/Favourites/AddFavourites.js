import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, Image, Platform, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';

//import constants
import { Colors, FontFamily, Images } from '../../common/constants';

//import components
import { PageHeader } from '../../components';

//import custom functions
import { getUcFirstLetter } from '../../common/helper/customFun';

//import svgs
import SvgFavourite from '../../assets/icons/svg/favourites.svg';
import SvgPrimaryFav from '../../assets/icons/svg/primaryFav.svg';

const AddFavourites = ({navigation}) => {

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
  const [ filteredContacts, setFilteredContacts ]   = useState([...dummyContacts]);
  const [ sortedContacts, setSortedContacts ]       = useState([]);
  const [ uniqueLetters, setUniqueLetters ]         = useState([]);

  //function to update the fav contacts list
  const updateFavContacts = (id, value) => {
    let updatedList = [...filteredContacts];
    let prevIndex = updatedList.findIndex(item => item?.id === id);
    if(prevIndex !== -1){
      updatedList[prevIndex].isSelected = value;
      setFilteredContacts(updatedList);
    }
  }

  //contact item component
  const ContactItem = ({item, index}) => {
    return(
      <View key={index} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <View style={styles.contactItemContainer}>
            <Image source={Images.defaultAvatar} style={{width:44, height: 44}} />
            <Text style={styles.contactNameText}>{item?.name}</Text>
        </View>
        <TouchableOpacity onPress={() => updateFavContacts(item.id, !item?.isSelected)} style={{padding: 10}}>
            {item.isSelected? <SvgPrimaryFav width={20} height={20} />: <SvgFavourite width={20} height={20} />}
        </TouchableOpacity>
      </View>
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
          renderItem={ContactItem}
        />
      </View>
    )
  }

  //sorted contacts arrays in alphabetical order
  useEffect(() => {
    setSortedContacts(filteredContacts.sort((a, b) => a?.name?.localeCompare(b?.name)));
  }, [filteredContacts]);

  //extract unique first letters from the sorted contacts array
  useEffect(() => {
    setUniqueLetters([...new Set(sortedContacts.map(contact => getUcFirstLetter(contact?.name)))]);
  }, [sortedContacts]);

  //function to search contacts
  const searchEvent = (req) => {
    if(req === ''){
      setFilteredContacts(dummyContacts);
    } else {
      setFilteredContacts(dummyContacts.filter(item => item?.name?.toLowerCase()?.includes(req?.toLowerCase())));
    }
  }

  //function to handle click on cancel button
  const handleClickOnCancel = () => {
    let updatedList = [...filteredContacts];
    updatedList.forEach(item => {
      if(item.isSelected) delete item?.isSelected;
    });
    setFilteredContacts(updatedList);
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
        <PageHeader headerTitle={'Select Contacts'} backBtn iconArr={['search']} placeholder='Search Contacts' searchEvent={(val) => searchEvent(val)} navigation={navigation} />
        <View style={{flex: 1, marginHorizontal: 20}}>
            <FlatList
                data={uniqueLetters}
                showsVerticalScrollIndicator={false}
                renderItem={ContactGroupItem}
            />
        </View>
        {filteredContacts.some(item => item.isSelected && item.isSelected === true)? 
        <Animated.View style={styles.buttonContainer}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => handleClickOnCancel()} style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()} style={[styles.actionBtn, {backgroundColor: Colors.Primary}]}>
            <Text style={[styles.actionBtnText, {color: Colors.Base_White}]}>Done</Text>
          </TouchableOpacity>
        </Animated.View>: null}
    </SafeAreaView>
  )
}

export default AddFavourites;

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: Colors.BgColor
    },
    saveContactBtn: {
        width:"48%", 
        borderRadius:10, 
        backgroundColor:"black", 
        alignItems:'center', 
        justifyContent:'center', 
        paddingVertical:10
    },
    contactItemContainer: {
        flexDirection:"row", 
        alignItems:"center", 
        paddingVertical:10,
        width:'75%'
    },
    contactNameText: {
        color: Colors.Base_White, 
        fontSize: 18, 
        fontFamily: FontFamily.OutfitRegular, 
        marginLeft: 20
    },
    contactInitialText: {
        color: Colors.Base_Medium_Grey, 
        fontSize: 20, 
        fontWeight: '500', 
        fontFamily: FontFamily.OutfitMedium,
        marginTop: 20,
        width: 40
    },
    buttonContainer: {
      backgroundColor: Colors.Bg_Light,
      position:'absolute', 
      bottom: 0, 
      width:'100%', 
      flexDirection:'row', 
      alignItems:'center', 
      justifyContent:'space-between', 
      paddingTop:20, 
      paddingBottom: Platform.OS === 'ios'? 30: 20,
      paddingHorizontal: 30, 
      borderTopLeftRadius: 30, 
      borderTopRightRadius: 30, 
      borderWidth: 1, 
      borderColor: Colors.Base_Grey
    },
    actionBtn: {
      backgroundColor: Colors.Primary_Light, 
      borderRadius:12, 
      paddingVertical: 15, 
      width:'47%', 
      alignItems:'center', 
      justifyContent:'center'
    },
    actionBtnText: {
      color: Colors.Primary, 
      fontSize: 18, 
      fontFamily: FontFamily.OutfitMedium
    },
})