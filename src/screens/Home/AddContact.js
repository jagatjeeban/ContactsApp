import { View, SafeAreaView, StyleSheet, Platform, TouchableOpacity, Image, Text, TextInput, StatusBar, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//import constants
import { Colors, FontFamily, Images } from '../../common/constants';

//import system statics
import { screenDimensions } from '../../common/helper/systemStatic';

//import components
import { PageHeader, DropDown } from '../../components';

//import svgs
import SvgUpperCurve from '../../assets/images/svg/upperCurve.svg';
import SvgAddPic     from '../../assets/icons/svg/addPic.svg';
import SvgUser       from '../../assets/icons/svg/userIcon.svg';
import SvgCall       from '../../assets/icons/svg/callGrey.svg';
import SvgMail       from '../../assets/icons/svg/mailGrey.svg';
import SvgPlus       from '../../assets/icons/svg/plusWhite.svg';
import { setAdjustPan, setAdjustResize } from 'rn-android-keyboard-adjust';

const AddContact = ({navigation}) => {

  const isFocused = useIsFocused();
  const dropdownController               = useRef(null);
  const labelRef                         = useRef();
  const [ labelList, setLabelList ]      = useState([
                                            {id: 1, title: 'Mobile'},
                                            {id: 2, title: 'Work'},
                                            {id: 3, title: 'Home'},
                                            {id: 4, title: 'Other'}
                                          ]);
  //function to close the dropdowns
  const closeDropdown = (req) => {
    req !== 'dropDown1'? dropdownController.current.close(): null
  }

  useEffect(() => {
    if(isFocused && Platform.OS === 'android'){
      StatusBar.setBackgroundColor(Colors.Base_Dark_Black);
      return () => StatusBar.setBackgroundColor(Colors.BgColor);
    }
  }, [isFocused]);

  useEffect(() => {
    setAdjustResize();
    return () => setAdjustPan();
  }, []);
  
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.upperCurveEffect}>
        <SvgUpperCurve width={screenDimensions?.width} />
      </View>
      <PageHeader headerTitle={'Create Contact'} crossBtn iconArr={['saveBtn']} navigation={navigation} />
      <KeyboardAwareScrollView enableOnAndroid={false} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
        <TouchableOpacity activeOpacity={1} onPress={() => null} style={{alignSelf:"center", marginTop: 20}}>
          <View style={styles.userPicContainer}>
            <Image source={Images.defaultUserPic} style={{width: 60, height: 73}} />
          </View>
          <View style={{flexDirection:'row', alignItems:'center', marginTop:20}}>
            <SvgAddPic />
            <Text style={{color: Colors.Base_White, fontSize: 16, fontFamily: FontFamily.OutfitRegular, marginLeft: 10}}>Add Picture</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <View style={[styles.width100, {zIndex: 5}]}>
            <Text style={styles.inputTitle}>Name</Text>
            <View style={styles.inputWithIcon}>
              <SvgUser />
              <View style={{marginLeft: 20, width:"90%"}}>
                <TextInput
                  placeholder={'Enter name'}
                  value={null}
                  selectionColor={Colors.Primary}
                  placeholderTextColor={Colors.Base_Medium_Grey}
                  style={styles.inputContainer}
                  onChangeText={(e) => null}
                />
              </View>
            </View>
          </View>
          <View style={[styles.width100, {marginTop: 30, zIndex: 4}]}>
            <View style={styles.numberTitleContainer}>
                <Text style={styles.inputTitle}>Phone Number</Text>
                <TouchableOpacity onPress={() => null} style={{flexDirection:'row', alignItems:"center"}}>
                  <View style={styles.addNumberBtn}>
                    <SvgPlus width={12} height={12} />
                  </View>
                  <Text style={styles.addNumberText}>Add</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputWithIcon}>
              <SvgCall />
              <View style={{marginLeft: 20, width:"90%"}}>
                <TextInput
                  placeholder={'Enter number'}
                  value={null}
                  selectionColor={Colors.Primary}
                  placeholderTextColor={Colors.Base_Medium_Grey}
                  style={styles.inputContainer}
                  keyboardType={'phone-pad'}
                  onChangeText={(e) => null}
                />
              </View>
            </View>
          </View>
          <View style={[styles.width100, {marginTop: 30, zIndex: 3}]}>
            <Text style={styles.inputTitle}>Select Label</Text>
            <DropDown 
              onRef={labelRef}
              dropDownList={labelList}
              placeholder={'Select Label'} 
              dropdownController={dropdownController} 
              onSelectEvent={(e) => null} 
              closeDropdown={() => closeDropdown('dropDown1')} 
              clearInput={() => null} 
            />
          </View>
          <View style={[styles.width100, {marginTop: 30, zIndex: 2}]}>
            <Text style={styles.inputTitle}>Email ID</Text>
            <View style={styles.inputWithIcon}>
              <SvgMail />
              <View style={{marginLeft: 20, width:"90%"}}>
                <TextInput
                  placeholder={'example@gmail.com'}
                  value={null}
                  selectionColor={Colors.Primary}
                  placeholderTextColor={Colors.Base_Medium_Grey}
                  style={styles.inputContainer}
                  keyboardType={'email-address'}
                  onChangeText={(e) => null}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default AddContact;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1, 
    backgroundColor: Colors.BgColor
  },
  upperCurveEffect: {
    position:'absolute', 
    top: Platform.OS === 'ios'? -47: -90, 
    alignSelf:'center'
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
  userPicContainer: {
    padding: 20, 
    borderRadius: 30, 
    borderWidth: 1, 
    borderColor: Colors.Base_Grey, 
    alignItems:'center', 
    justifyContent:"center", 
    backgroundColor: Colors.Bg_Light
  },
  inputTitle: {
    color: Colors.Base_White, 
    fontSize: 16, 
    fontFamily: FontFamily.OutfitMedium, 
    marginLeft: 40
  },
  inputWithIcon: {
    flexDirection:"row", 
    alignItems:'center', 
    marginTop: 10, 
    width:'100%'
  },
  inputContainer: {
    backgroundColor:Colors.Bg_Light, 
    borderRadius:12, 
    fontSize: 16, 
    fontFamily: FontFamily.OutfitRegular, 
    color: Colors.Base_White, 
    borderWidth:1, 
    borderColor: Colors.Base_Grey, 
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  formContainer: {
    marginHorizontal: 20, 
    marginTop:70
  },
  width100: {
    width: '100%'
  },
  numberTitleContainer: {
    flexDirection:'row', 
    alignItems:"center", 
    justifyContent:"space-between"
  },
  addNumberBtn: {
    backgroundColor: Colors.Bg_Light, 
    borderRadius:6, 
    padding:5, 
    alignItems:"center", 
    justifyContent:"center", 
    borderWidth:1, 
    borderColor: Colors.Base_Grey
  },
  addNumberText: {
    color: Colors.Base_White, 
    fontSize: 16, 
    fontFamily: FontFamily.OutfitRegular, 
    marginLeft:10
  },
})