import { View, Text, TextInput, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

//import constants
import { Images, Colors, FontFamily } from '../common/constants';

//import svgs
import SvgSearch     from '../assets/icons/svg/search.svg';
import SvgMenu       from '../assets/icons/svg/menu.svg';
import SvgCross      from '../assets/icons/svg/crossGrey.svg';
import SvgBackGrey   from '../assets/icons/svg/backArrowGrey.svg';

const HomeHeader = ({placeholder='Search', menuBtn=false, selectEvent=null, selectAllEvent=null, searchBlur=null, searchEvent}) => {
  const [ searchInput, setSearchInput ]     = useState('');
  const [ searchStatus, setSearchStatus ]   = useState(false);
  const [ menuVisible, setMenuVisible ]     = useState(false);

  //function to handle system backpress
  const handleBackPress = () => {
    if(searchStatus==true){
        setSearchStatus(false);
        searchEvent('');
        setSearchInput('');
        return true;
    }
    return false;
  }

  useEffect(()=>{
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => backHandler.remove();
  }, [searchStatus]);

  return (
    <View style={[styles.mainContainer, {padding: !searchStatus? 20: null}]}>
        {!searchStatus? 
        <TouchableOpacity activeOpacity={0.7} onPress={() => [setSearchStatus(true)]} style={[styles.searchContainer, {paddingVertical: menuBtn? null: 14}]}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <SvgSearch />
            <Text style={styles.searchText}>{placeholder}</Text>
          </View>
          {menuBtn? 
          <Menu 
            visible={menuVisible} 
            onRequestClose={() => setMenuVisible(false)}
            style={styles.menuContainer}
            anchor={
              <TouchableOpacity activeOpacity={0.7} onPress={() => setMenuVisible(true)} style={{padding: 15}}>
                <SvgMenu />
              </TouchableOpacity>
            }
          >
            <MenuItem onPress={() => [ setMenuVisible(false), selectEvent? selectEvent(): null ]} pressColor={null} textStyle={styles.menuItemText} >Select</MenuItem>
            <MenuItem onPress={() => [ setMenuVisible(false), selectAllEvent? selectAllEvent(): null ]} pressColor={null} textStyle={styles.menuItemText} >Select all</MenuItem>
          </Menu>: null}
        </TouchableOpacity>
        :
        <View style={{flex: 1, flexDirection: 'row', alignItems:"center", justifyContent:"space-between", borderBottomWidth: 1, borderColor: Colors.Base_Grey, paddingTop: 13, marginBottom:13}}>
          <View style={{flexDirection:'row', alignItems:"center", width:"87%"}}>
              <TouchableOpacity onPress={() => [setSearchStatus(false), searchEvent(''), setSearchInput('')]} style={{padding: 20}}>
                  <SvgBackGrey />
              </TouchableOpacity>
              <TextInput
                  placeholder={placeholder}
                  selectionColor={Colors.Primary}
                  placeholderTextColor={Colors.Base_Medium_Grey}
                  value={searchInput}
                  autoFocus={true}
                  style={{color: Colors.Base_White, fontSize: 18, fontFamily: FontFamily.OutfitRegular, paddingVertical:20, width:'85%'}}
                  onBlur={() => { if(searchBlur) searchBlur() }}
                  onChange={(e) => [searchEvent(e.nativeEvent.text), setSearchInput(e.nativeEvent.text)]}
              />
          </View>
          {searchInput !== ''? 
          <TouchableOpacity onPress={() => [searchEvent(''), setSearchInput('')]} style={{padding:20}}>
              <SvgCross />
          </TouchableOpacity>: null}
        </View>}
    </View>
  )
}

export default HomeHeader;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between', 
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
  menuItemText: {
    color: Colors.Base_White, 
    fontSize: 14, 
    fontFamily: FontFamily.OutfitRegular
  },
  menuContainer: {
    backgroundColor: Colors.Bg_Light, 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: Colors.Base_Grey
  },
})