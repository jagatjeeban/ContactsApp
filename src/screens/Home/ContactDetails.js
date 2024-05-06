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
import SvgCall       from '../../assets/icons/svg/call.svg';
import SvgMessage    from '../../assets/icons/svg/message.svg';
import SvgMail       from '../../assets/icons/svg/mail.svg';
import SvgShare      from '../../assets/icons/svg/share.svg';
import SvgCallWhite  from '../../assets/icons/svg/callWhite.svg';
import SvgTrash      from '../../assets/icons/svg/trash.svg';

const ContactDetails = ({navigation, route}) => {

  var contactObj = {
    'name': '',
    'emailId': '',
    'number': ''
  }

  const isFocused = useIsFocused();
  const [ actions, setActions ]                 = useState([
                                                  {id: 1, icon: <SvgCall />,    title: 'Call'},
                                                  {id: 2, icon: <SvgMessage />, title: 'Message'},
                                                  {id: 3, icon: <SvgMail />,    title: 'Email'},
                                                  {id: 4, icon: <SvgShare />,   title: 'Share'}
                                                ]);

  const ContactInfoItem = () => {
    return(
      <View style={{flexDirection:'row', alignItems:"center"}}>
        <SvgCallWhite />
        <View style={{marginLeft: 20}}>
          <Text style={{color: Colors.Base_White, fontSize: 18, fontFamily: FontFamily.OutfitRegular}}>+91 8114 984 310</Text>
          <Text style={{color: Colors.Base_Medium_Grey, fontSize: 16, fontFamily: FontFamily.OutfitRegular}}>Mobile</Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.BgColor}}>
      <View style={{position:'absolute'}}>
        <SvgUpperCurve width={screenDimensions?.width} />
      </View>
      <PageHeader backBtn iconArr={['whiteStar', 'pencil']} navigation={navigation} />
      <View style={{alignItems:'center'}}>
        <Image source={Images.defaultAvatar1} style={{width: 120, height: 120}}  />
        <Text style={{color: Colors.Base_White, fontSize: 22, fontFamily: FontFamily.OutfitRegular, marginTop: 20}}>{route?.params?.name}</Text>
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
          data={[1, 2]}
          showsVerticalScrollIndicator={false}
          renderItem={ContactInfoItem}
          ItemSeparatorComponent={<View style={{backgroundColor: Colors.Base_Grey, height:1, marginVertical:15}} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={null} style={{flexDirection:'row', alignItems:'center', marginHorizontal: 20, paddingBottom:20}}>
        <SvgTrash />
        <Text style={{color: Colors.Base_Red, fontSize: 18, fontFamily: FontFamily.OutfitMedium, marginLeft: 15}}>Delete Number</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ContactDetails;

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