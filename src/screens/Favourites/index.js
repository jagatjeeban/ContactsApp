import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'

//import constants
import { Colors, FontFamily, Images } from '../../common/constants';
import { HomeHeader } from '../../components';

//import svgs
import SvgPlus from '../../assets/icons/svg/plus.svg';

const Favourites = ({navigation}) => {

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

  const [ filteredContacts, setFilteredContacts ] = useState([...dummyContacts]);

  //header component
  const Header = () => {
    return(
      <View style={styles.headerStyle}>
        <Text style={styles.favouriteText}>Favourites</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddFavourites')} activeOpacity={0.7} style={styles.addFavouriteBtn}>
          <SvgPlus width={15} height={15} />
          <Text style={styles.addFavText}>Add</Text>
        </TouchableOpacity>
      </View>
    )
  }

  //function to search contacts
  const searchEvent = (req) => {
    if(req === ''){
      setFilteredContacts(dummyContacts);
    } else {
      setFilteredContacts(dummyContacts.filter(item => item?.name?.toLowerCase()?.includes(req?.toLowerCase())));
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <HomeHeader refRBSheet={refProfileSheet} placeholder='Search Favourites' searchEvent={(val) => searchEvent(val)} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 130}}>
        <Header />
        <View style={styles.favContactsContainer}>
          {filteredContacts.map((item, index) => {
            return(
              <View key={index} style={styles.favContactItem}>
                <Image source={Images.defaultAvatar} style={{width: 70, height: 70}} />
                <Text style={styles.favContactName}>{item?.name}</Text>
              </View>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Favourites;

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: Colors.BgColor
    },
    addFavouriteBtn: {
      backgroundColor: Colors.Primary_Light, 
      borderRadius:6, 
      paddingVertical:7, 
      paddingHorizontal:15, 
      alignItems:'center', 
      justifyContent:'center', 
      flexDirection:'row'
    },
    headerStyle: {
      flexDirection:'row', 
      alignItems:"center", 
      justifyContent:"space-between",
      marginHorizontal: 20,
      marginTop: 10
    },
    favouriteText: {
      color: Colors.Base_White, 
      fontSize: 20, 
      fontFamily: FontFamily.OutfitMedium, 
      fontWeight: '500'
    },
    addFavText: {
      color: Colors.Primary, 
      fontSize: 16, 
      fontFamily: FontFamily.OutfitMedium, 
      marginLeft: 10
    },
    favContactsContainer: {
      flexDirection:'row', 
      alignItems:"center", 
      flexWrap:'wrap',
    },
    favContactItem: {
      alignItems:'center', 
      paddingTop: 30, 
      width:'25%',
    },
    favContactName: {
      color: Colors.Base_White, 
      fontSize: 18, 
      fontFamily: FontFamily.OutfitRegular, 
      marginTop:15
    },
})