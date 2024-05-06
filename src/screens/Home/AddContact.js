import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useIsFocused } from '@react-navigation/native';

//import constants
import { Colors, FontFamily, Images } from '../../common/constants';

//import system statics
import { screenDimensions } from '../../common/helper/systemStatic';

//import components
import { PageHeader } from '../../components';

//import svg
import SvgUpperCurve from '../../assets/images/svg/upperCurve.svg';

const AddContact = ({navigation}) => {

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.BgColor}}>
      <View style={{position:'absolute'}}>
        <SvgUpperCurve width={screenDimensions?.width} />
      </View>
    </SafeAreaView>
  )
}

export default AddContact;

const styles = StyleSheet.create({
  inputContainer: {
    width:'100%', 
    marginTop:20
  },
  inputStyle: {
    borderColor: 'black', 
    padding: 10, 
    borderWidth:1, 
    borderRadius:10, 
    color: 'black'
  },
  saveContactBtn: {
    width:"48%", 
    borderRadius:10, 
    backgroundColor:"black", 
    alignItems:'center', 
    justifyContent:'center', 
    paddingVertical:10
  },
  actionIconContainer: {
    alignItems:"center", 
    justifyContent:"center", 
    padding:20, 
    borderRadius:40, 
    backgroundColor: Colors.Primary_Light
  },
  actionsContainer: {
    flexDirection:'row', 
    alignItems:"center", 
    justifyContent:"space-around", 
    marginTop: 60
  },
  actionText: {
    color: Colors.Base_White, 
    fontSize: 16, 
    fontFamily: FontFamily.OutfitRegular,
    marginTop: 15
  },
  contactInfoContainer: {
    backgroundColor: Colors.Bg_Light, 
    borderRadius: 22, 
    marginHorizontal: 20, 
    marginVertical: 30, 
    padding: 20
  },
  contactInfoText: {
    color: Colors.Base_Medium_Grey, 
    fontSize: 16, 
    fontFamily: FontFamily.OutfitRegular, 
    marginBottom: 20
  },
})