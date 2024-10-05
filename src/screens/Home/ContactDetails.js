import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, StatusBar, FlatList, Platform, Linking } from 'react-native'
import React, { useRef, useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import FastImage from 'react-native-fast-image';
import vCard from 'vcards-js';
import Share from 'react-native-share';
import base64 from 'react-native-base64';
import Contact from 'react-native-contacts';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';

//import constants
import { Colors, FontFamily, Strings } from '../../common/constants';

//import system statics
import { screenDimensions } from '../../common/helper/systemStatic';

//import components
import { PageHeader } from '../../components';

//import custom functions
import { getUcFirstLetterString, getUcFirstLetter } from '../../common/helper/customFun';

//import svgs
import SvgUpperCurve from '../../assets/images/svg/upperCurve.svg';
import SvgCall       from '../../assets/icons/svg/call.svg';
import SvgMessage    from '../../assets/icons/svg/message.svg';
import SvgMail       from '../../assets/icons/svg/mail.svg';
import SvgShare      from '../../assets/icons/svg/share.svg';
import SvgCallWhite  from '../../assets/icons/svg/callWhite.svg';
import SvgTrash      from '../../assets/icons/svg/trash.svg';

//import redux slice
import { storeContacts } from '../../store/dashSlice';

const ContactDetails = ({navigation, route}) => {
  
  const contact = vCard();
  const isFocused = useIsFocused();

  //store events
  const dispatch = useDispatch();
  const dash = useSelector(state => state.dash);

  //refs
  const deleteSheetRef = useRef();

  //states
  const [ contactInfo, setContactInfo ]         = useState({});

  //contact info item component
  const ContactInfoItem = ({item, index}) => {
    return(
      <View key={index} style={{flexDirection:'row'}}>
        <View style={{marginTop:5}}>
          <SvgCallWhite />
        </View>
        <View style={{marginLeft: 20}}>
          <Text style={styles.mobileNumber}>{item?.number}</Text>
          <Text style={styles.contactLabel}>{getUcFirstLetterString(item?.label)}</Text>
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
          <TouchableOpacity activeOpacity={0.7} onPress={() => refRBSheet.current.close()} style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>No, Keep it!</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={() => deleteContact()} style={[styles.actionBtn, {backgroundColor: Colors.Primary}]}>
            <Text style={[styles.actionBtnText, {color: Colors.Base_White}]}>Yes, Delete!</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    )
  }

  //function to delete the contact
  const deleteContact = () => {
    deleteSheetRef.current.close();
    Contact.deleteContact({ recordID: contactInfo?.recordID })
    .then(() => {
      let updatedContacts = [...dash?.contacts];
      let index = updatedContacts.findIndex(contact => contact?.recordID === contactInfo?.recordID);
      updatedContacts.splice(index, 1);
      dispatch(storeContacts(updatedContacts));
      navigation.pop();
      showMessage({message:'Contact deleted successfully!', type:'danger', icon:'success'});
    })
    .catch((error) => {
      console.log('DELETE ERROR:', JSON.stringify(error));
    })
  }

  //function to remove duplicate phone numbers
  const removeDuplicateNumbers = (arr) => {
    const uniqueNumbers = new Set();
    return arr?.reduce((info, current) => {
      if (!uniqueNumbers.has(current.number.replace(/\s+/g, ''))) {
        uniqueNumbers.add(current.number.replace(/\s+/g, ''));
        info.push(current);
      }
      return info;
    }, []);
  };

  //function to open the default message app
  const openMessagingApp = (phoneNumber) => {
    let url = '';
    
    if (Platform.OS === 'android') {
      url = `sms:${phoneNumber.replace(/\s+/g, '')}`;
    } else if (Platform.OS === 'ios') {
      url = `sms:${phoneNumber.replace(/\s+/g, '')}`;
    }

    Linking.openURL(url);
  };

  //function to open the default mail app
  const openMailApp = (mailId) => {
    let url = '';

    if (Platform.OS === 'android') {
      url = `mailto:${mailId}`;
    } else if (Platform.OS === 'ios') {
      url = `mailto:${mailId}`;
    }

    Linking.openURL(url);
  }

  //function to open the default calling app
  const openCallApp = (phoneNumber) => {
    let url = '';

    if (Platform.OS === 'android') {
      url = `tel:${phoneNumber.replace(/\s+/g, '')}`;
    } else if (Platform.OS === 'ios') {
      url = `tel:${phoneNumber.replace(/\s+/g, '')}`;
    }

    Linking.openURL(url);
  }

  //function to generate the vCard string
  const generateVCardString = () => {
    contact.firstName = contactInfo?.givenName;
    contact.middleName = contactInfo?.middleName;
    contact.lastName = contactInfo?.familyName;
    contactInfo?.phoneNumbers.forEach((item, index) => {
      if(item?.label === 'main' || item?.label === 'mobile' || item?.label === 'other'){
        contact.cellPhone = contactInfo?.phoneNumbers[index]?.number;
      }
      if(item?.label === 'home'){
        contact.homePhone = contactInfo?.phoneNumbers[index]?.number;
      }
      if(item?.label === 'work'){
        contact.workPhone = contactInfo?.phoneNumbers[index]?.number;
      }
    });
    contactInfo?.emailAddresses.forEach((item, index) => {
      if(item?.label === 'work'){
        contact.workEmail = contactInfo?.emailAddresses[index]?.email;
      } else {
        contact.email = contactInfo?.emailAddresses[index]?.email;
      }
    });

    const vCardString = contact.getFormattedString();
    return vCardString;
  }

  //function to share the contact
  const shareContact = () => {
    const vCardString = generateVCardString();
    const vCardBase64 = base64.encode(vCardString);
    const vCardDataUrl = `data:text/vcard;base64,${vCardBase64}`;

    const options = {
      url: vCardDataUrl,
      type: 'text/vcard',
      fileName: `${contactInfo?.displayName}.vcf`
    }
    Share.open(options)
    .then(() => {})
    .catch((err) => { console.log(err) })
  }

  //function to perform contact actions
  const actionClickEvent = (req) => {
    if(req === 'edit'){
      navigation.navigate('CreateContact', {'info': contactInfo, 'reqType': 'edit'});
    }
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
      <PageHeader backBtn iconArr={['whiteStar', 'pencil']} rightBtnClickEvent={(req) => actionClickEvent(req)} navigation={navigation} />
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        renderItem={() => {
          return(
            <View>
              <View style={{alignItems:'center'}}>
                {contactInfo?.thumbnailPath && contactInfo?.thumbnailPath !== ''? 
                  <FastImage source={{uri: contactInfo?.thumbnailPath}} style={styles.contactImg}  />
                :
                  <View style={styles.defaultContactImg}>
                    <Text style={styles.contactFirstLetter}>{getUcFirstLetter(Platform.OS === 'android'? contactInfo?.displayName: contactInfo?.givenName)}</Text>
                  </View>
                }
                <Text style={styles.contactName}>{Platform.OS === 'android'? contactInfo?.displayName: `${contactInfo?.givenName} ${contactInfo?.familyName}`}</Text>
              </View>
              <View style={styles.actionsContainer}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => openCallApp(contactInfo?.phoneNumbers[0]?.number)} style={{alignItems:"center"}}>
                  <View style={styles.actionIconContainer}>
                    <SvgCall />
                  </View>
                  <Text style={styles.actionText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={() => openMessagingApp(contactInfo?.phoneNumbers[0]?.number)} style={{alignItems:"center"}}>
                  <View style={styles.actionIconContainer}>
                    <SvgMessage />
                  </View>
                  <Text style={styles.actionText}>Message</Text>
                </TouchableOpacity>
                {contactInfo?.emailAddresses?.length > 0?
                  <TouchableOpacity activeOpacity={0.7} onPress={() => openMailApp(contactInfo?.emailAddresses[0]?.email)} style={{alignItems:"center"}}>
                    <View style={styles.actionIconContainer}>
                      <SvgMail />
                    </View>
                    <Text style={styles.actionText}>Email</Text>
                  </TouchableOpacity>
                : null}
                <TouchableOpacity activeOpacity={0.7} onPress={() => shareContact()} style={{alignItems:"center"}}>
                  <View style={styles.actionIconContainer}>
                    <SvgShare />
                  </View>
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.contactInfoContainer}>
                <Text style={styles.contactInfoText}>Contact Info</Text>
                <FlatList
                  data={removeDuplicateNumbers(contactInfo?.phoneNumbers)}
                  showsVerticalScrollIndicator={false}
                  renderItem={ContactInfoItem}
                  ItemSeparatorComponent={<View style={{backgroundColor: Colors.Base_Grey, height:1, marginVertical:15}} />}
                  keyExtractor={(_, index) => index.toString()}
                />
              </View>
              <TouchableOpacity activeOpacity={0.7} onPress={() => deleteSheetRef.current.open()} style={{flexDirection:'row', alignItems:'center', marginHorizontal: 20, marginTop: 20, paddingVertical:10}}>
                <SvgTrash width={18} height={18} />
                <Text style={{color: Colors.Base_Red, fontSize: 16, fontFamily: FontFamily.OutfitMedium, marginLeft: 15}}>Delete contact</Text>
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
    borderTopWidth:1,
    borderLeftWidth: 1,
    borderRightWidth: 1, 
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
    marginTop: 40,
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
    marginTop: 30, 
    padding: 20
  },
  contactInfoText: {
    color: Colors.Base_Medium_Grey, 
    fontSize: 16, 
    fontFamily: FontFamily.OutfitMedium,
    fontWeight: '500', 
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
  contactName: {
    color: Colors.Base_White, 
    fontSize: 22, 
    fontFamily: FontFamily.OutfitRegular, 
    marginTop: 20
  },
  contactLabel: {
    color: Colors.Base_Medium_Grey, 
    fontSize: 16, 
    fontFamily: FontFamily.OutfitRegular
  },
  contactImg: {
    width: 140, 
    height: 140, 
    borderRadius: 30
  },
  defaultContactImg: {
    width: 140, 
    height: 140, 
    alignItems:'center', 
    justifyContent:"center", 
    borderRadius: 30, 
    backgroundColor: Colors.Primary
  },
  contactFirstLetter: {
    color: Colors.Base_White, 
    fontSize: 50, 
    fontFamily: FontFamily.OutfitMedium
  },
})