import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react';

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

  //contact item component
  const ContactItem = ({item, index}) => {
    return(
      <View key={index} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <View style={styles.contactItemContainer}>
            <Image source={Images.defaultAvatar} style={{width:44, height: 44}} />
            <Text style={styles.contactNameText}>{item?.name}</Text>
        </View>
        <TouchableOpacity style={{padding: 10}}>
            <SvgFavourite />
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
  const sortedContacts = dummyContacts.sort((a, b) => a?.name?.localeCompare(b?.name));

  //extract unique first letters from the sorted contacts array
  const uniqueLetters = [...new Set(sortedContacts.map(contact => getUcFirstLetter(contact?.name)))];

  return (
    <SafeAreaView style={styles.safeAreaView}>
        <PageHeader headerTitle={'Select Contacts'} backBtn iconArr={['search']} navigation={navigation} />
        <View style={{marginHorizontal: 20}}>
            <FlatList
                data={uniqueLetters}
                showsVerticalScrollIndicator={false}
                renderItem={ContactGroupItem}
            />
        </View>
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
})