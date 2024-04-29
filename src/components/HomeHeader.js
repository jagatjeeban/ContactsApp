import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

//import constants
import { Images, Colors, FontFamily } from '../common/constants';

//import svgs
import SvgSearch     from '../assets/icons/svg/search.svg';
import SvgMenu       from '../assets/icons/svg/menu.svg';

const HomeHeader = ({clickEvent, searchEvent=null}) => {
  return (
    <View style={styles.mainContainer}>
        <View style={styles.searchContainer}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <SvgSearch />
            <Text style={styles.searchText}>Search</Text>
          </View>
          <TouchableOpacity activeOpacity={1} onPress={() => clickEvent? clickEvent(): null} style={{padding:15}}>
            <SvgMenu />
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default HomeHeader;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between', 
    padding:20
  },
  searchContainer: {
    width:'100%', 
    flexDirection:"row", 
    alignItems:'center', 
    justifyContent:'space-between',
    paddingLeft: 15, 
    borderRadius: 12, 
    borderWidth:1, 
    borderColor: Colors.Base_Grey, 
    backgroundColor:Colors.Bg_Light
  },
  searchText: {
    color: Colors.Base_Medium_Grey, 
    fontSize: 16, 
    fontFamily: FontFamily.OutfitRegular, 
    marginLeft:10
  },
})