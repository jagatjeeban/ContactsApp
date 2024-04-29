import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Colors } from '../../common/constants';

const AddContact = ({navigation}) => {

  var contactObj = {
    'name': '',
    'emailId': '',
    'number': ''
  }

  const isFocused = useIsFocused();
  const [ formValue, setFormValue ]             = useState(Object.assign({}, contactObj));
  const [ prevContacts, setPrevContacts ]       = useState([]);

  //function to set input value into state
  const addIntoForm = (value, name) => {
    if(value !== undefined){
      setFormValue(formValue => ({...formValue, [name]: value}));
    }
  }

  //function to save new contact 
  const saveNewContact = async() => {
    try {
      let newContactList;
      if(typeof prevContacts === 'string'){
        newContactList = [...JSON.parse(prevContacts)];
      } else {
        newContactList = [...prevContacts];
      }
      newContactList.push(formValue);
      await AsyncStorage.setItem('NEW_CONTACT', JSON.stringify(newContactList));
      navigation.navigate('Contacts');
  } catch (error) {
      console.log(error);
    }
  }

  //function to validate the contact form
  const validateForm = () => {
    if(formValue?.name === ''){
      showMessage({message:'Name', description:'Please enter your name', type:'danger', icon:'info'});
    } else if(formValue?.emailId === ''){
      showMessage({message:'Email Id', description:'Please enter your email id', type:'danger', icon:'info'});
    } else if(formValue?.number === ''){
      showMessage({message:'Mobile Number', description:'Please enter your mobile number', type:'danger', icon:'info'});
    } else {
      saveNewContact();
    }
  }

  //function to get previous saved contacts
  const savedContacts = async() => {
    let contacts = await AsyncStorage.getItem('NEW_CONTACT');
    if(contacts && contacts?.length > 0) setPrevContacts(contacts);
  }

  useEffect(() => {
    if(isFocused){
      savedContacts();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.BgColor}}>
      <View style={{flex: 1, marginHorizontal:20}}>
        {/* <View style={{width:'100%', alignItems:'center', marginBottom:50}}>
          <View style={{width: 150, height: 150, borderRadius:100, backgroundColor:'grey', marginBottom:20}} />
          <Text style={{color:'black', fontSize: 20, fontWeight: 500}}>Add Photo</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Enter Name'
            placeholderTextColor={'grey'}
            value={formValue?.name}
            keyboardType='default'
            style={styles.inputStyle}
            onChangeText={(e) => addIntoForm(e, 'name')}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Enter Email Id'
            placeholderTextColor={'grey'}
            value={formValue?.emailId}
            keyboardType='email-address'
            style={styles.inputStyle}
            onChangeText={(e) => addIntoForm(e, 'emailId')}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Enter Mobile Number'
            placeholderTextColor={'grey'}
            value={formValue?.number}
            keyboardType='number-pad'
            style={styles.inputStyle}
            maxLength={10}
            onChangeText={(e) => addIntoForm(e, 'number')}
          />
        </View> */}
        <View style={{width:'100%', position:'absolute', bottom: 20, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()} style={styles.saveContactBtn}>
            <Text style={{color:'white', fontSize:20, fontWeight: 600}}>Go Back</Text>
          </TouchableOpacity>
        </View>
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
})