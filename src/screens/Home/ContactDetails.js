import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, StatusBar, FlatList, Platform } from 'react-native'
import React, { useRef, useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import FastImage from 'react-native-fast-image';

//import constants
import { Colors, FontFamily, Images, Strings } from '../../common/constants';

//import system statics
import { screenDimensions } from '../../common/helper/systemStatic';

//import components
import { PageHeader } from '../../components';

//import svg
import SvgUpperCurve from '../../assets/images/svg/upperCurve.svg';
import SvgCall       from '../../assets/icons/svg/call.svg';
import SvgMessage    from '../../assets/icons/svg/message.svg';
import SvgMail       from '../../assets/icons/svg/mail.svg';
import SvgShare      from '../../assets/icons/svg/share.svg';
import SvgCallWhite  from '../../assets/icons/svg/callWhite.svg';
import SvgTrash      from '../../assets/icons/svg/trash.svg';

const ContactDetails = ({navigation, route}) => {

  const deleteSheetRef = useRef();

  const isFocused = useIsFocused();
  const [ contactInfo, setContactInfo ]         = useState({});
  const [ actions, setActions ]                 = useState([
                                                  {id: 1, icon: <SvgCall />,    title: 'Call'},
                                                  {id: 2, icon: <SvgMessage />, title: 'Message'},
                                                  {id: 3, icon: <SvgMail />,    title: 'Email'},
                                                  {id: 4, icon: <SvgShare />,   title: 'Share'}
                                                ]);

  //contact info item component
  const ContactInfoItem = ({item, index}) => {
    return(
      <View key={index} style={{flexDirection:'row'}}>
        <View style={{marginTop:5}}>
          <SvgCallWhite />
        </View>
        <View style={{marginLeft: 20}}>
          <Text style={styles.mobileNumber}>{item?.number}</Text>
          <Text style={{color: Colors.Base_Medium_Grey, fontSize: 16, fontFamily: FontFamily.OutfitRegular}}>{item?.label}</Text>
        </View>
      </View>
    )
  }

  //delete number bottomsheet component
  const DeleteNumberSheet = ({refRBSheet}) => {
    return(
      <RBSheet ref={refRBSheet} height={Platform.OS === 'ios'? 250: 230} customStyles={{container: styles.bottomSheet, draggableIcon: styles.pillsBarStyle}} closeOnPressBack draggable dragOnContent>
        <View style={styles.deleteTextContainer}>
          <Text style={styles.deleteText} numberOfLines={null}>{Strings.DeleteNumberText}</Text>
        </View>
        <View style={styles.actionBtnContainer}>
          <TouchableOpacity onPress={() => refRBSheet.current.close()} style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>No, Keep it!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, {backgroundColor: Colors.Primary}]}>
            <Text style={[styles.actionBtnText, {color: Colors.Base_White}]}>Yes, Delete!</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    )
  }

  useEffect(() => {
    if(isFocused && Platform.OS === 'android'){
      StatusBar.setBackgroundColor(Colors.Base_Dark_Black);
      return () => StatusBar.setBackgroundColor(Colors.BgColor);
    }
  }, [isFocused]);

  useEffect(() => {
    if(isFocused){
      setContactInfo(route?.params?.info);
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.upperCurveEffect}>
        <SvgUpperCurve width={screenDimensions?.width} />
      </View>
      <PageHeader backBtn iconArr={['whiteStar', 'pencil']} navigation={navigation} />
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return(
            <View>
              <View style={{alignItems:'center'}}>
                <FastImage source={contactInfo?.thumbnailPath !== ''? {uri: contactInfo?.thumbnailPath}: Images.defaultAvatar1} style={{width: 120, height: 120, borderRadius:30}}  />
                <Text style={{color: Colors.Base_White, fontSize: 22, fontFamily: FontFamily.OutfitRegular, marginTop: 20}}>{contactInfo?.displayName}</Text>
              </View>
              <View style={styles.actionsContainer}>
                {actions.map((item, index) => {
                  return(
                    <TouchableOpacity key={index} activeOpacity={0.7} style={{alignItems:"center"}}>
                      <View style={styles.actionIconContainer}>
                        {item.icon}
                      </View>
                      <Text style={styles.actionText}>{item.title}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
              <View style={styles.contactInfoContainer}>
                <Text style={styles.contactInfoText}>Contact Info</Text>
                <FlatList
                  data={contactInfo?.phoneNumbers}
                  showsVerticalScrollIndicator={false}
                  renderItem={ContactInfoItem}
                  ItemSeparatorComponent={<View style={{backgroundColor: Colors.Base_Grey, height:1, marginVertical:15}} />}
                  keyExtractor={item => item?.id.toString()}
                />
              </View>
              <TouchableOpacity activeOpacity={0.7} onPress={() => deleteSheetRef.current.open()} style={{flexDirection:'row', alignItems:'center', marginHorizontal: 20, paddingBottom:20}}>
                <SvgTrash />
                <Text style={{color: Colors.Base_Red, fontSize: 18, fontFamily: FontFamily.OutfitMedium, marginLeft: 15}}>Delete Number</Text>
              </TouchableOpacity>
            </View>
          )
        }}
        keyExtractor={(_, index) => index.toString()}
      />
      <DeleteNumberSheet refRBSheet={deleteSheetRef} />
    </SafeAreaView>
  )
}

export default ContactDetails;

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
  bottomSheet: {
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    borderWidth:1, 
    borderColor: Colors.Base_Grey,
    backgroundColor: Colors.Bg_Light
  },
  pillsBarStyle: {
    width: 80, 
    height:3.5, 
    marginVertical:20,
    borderRadius: 40,
    backgroundColor: Colors.Base_Grey
  },
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
    width: 56,
    height: 56,
    borderRadius:60, 
    backgroundColor: Colors.Primary_Light
  },
  actionBtnContainer: {
    position:"absolute", 
    bottom: Platform.OS === 'ios'? 50: 20, 
    paddingHorizontal: 20, 
    alignItems:"center", 
    justifyContent:"space-between", 
    flexDirection:"row", 
    width:'100%'
  },
  actionsContainer: {
    flexDirection:'row', 
    alignItems:"center", 
    justifyContent:"space-around", 
    marginTop: 60,
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
  deleteTextContainer: {
    paddingHorizontal: 20, 
    alignItems:"center", 
    justifyContent:"center", 
    backgroundColor: Colors.Bg_Light
  },
  deleteText: {
    color: Colors.Base_White, 
    fontSize:18, 
    fontFamily: FontFamily.OutfitRegular, 
    textAlign:'center'
  },
  mobileNumber: {
    color: Colors.Base_White, 
    fontSize: 18, 
    fontFamily: FontFamily.OutfitRegular
  },
})