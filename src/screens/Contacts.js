import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, BackHandler, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'

const Contacts = ({navigation}) => {

  const isFocused = useIsFocused();
  const [ contacts, setContacts ]           = useState([]);

  //function to get new contacts
  const getContacts = async() => {
    const newContact = await AsyncStorage.getItem('NEW_CONTACT');
    setContacts(JSON.parse(newContact));
  }

  //function to delete any contact
  const deleteContact = async(index) => {
    let updatedList = [...contacts];
    updatedList.splice(index, 1);
    setContacts(updatedList);
    await AsyncStorage.setItem('NEW_CONTACT', JSON.stringify(updatedList));
  }

  //function to show alert for delete action
  const deleteAlert = (name, index) => {
    Alert.alert(
      'Delete Contact', 
      `Are you sure you want to delete ${name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteContact(index),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    )
  }

  //contact card item component
  const ContactCard = ({item, index}) => {
    return(
      <View key={index} style={{width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between', padding: 15, borderRadius: 10, backgroundColor:'black'}}>
        <View style={{maxWidth:'75%'}}>
          <Text style={{color:'white', fontSize: 20, fontWeight: 600}}>{item?.name}</Text>
          <Text style={{color:'white', fontSize: 15, fontWeight: 400}}>{`Email Id: ${item?.emailId}`}</Text>
          <Text style={{color:'white', fontSize: 15, fontWeight: 400}}>{`Mobile Number: +91-${item?.number}`}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => deleteAlert(item?.name, index)} style={{backgroundColor:"white", paddingVertical:5, paddingHorizontal:10, borderRadius:6, alignItems:'center', justifyContent:'center'}}>
          <Text style={{color:'black', fontSize: 15}}>Delete</Text>
        </TouchableOpacity>
      </View>
    )
  }

  useEffect(() => {
    if(isFocused){
      getContacts();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, margin:20}}>
        <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{color:'black', fontSize: 30, marginBottom: 30, fontWeight: 600}}>All Contacts</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop:10}}>
            <Text style={{color:'red', fontSize: 20, fontWeight: 500}}>Log Out</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={contacts}
          showsVerticalScrollIndicator={false}
          renderItem={ContactCard}
          ListEmptyComponent={<View style={{marginTop:'80%', alignItems:'center', justifyContent:"center"}}><Text style={{color:"grey", fontSize:30}}>No Contact found!</Text></View>}
          ItemSeparatorComponent={<View style={{height: 10}} />}
        />
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('AddContact')} style={styles.addContactBtn}>
          <Text style={{color:'white', fontSize: 17, fontWeight: 500}}>+ Add Contact</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Contacts;

const styles = StyleSheet.create({
  addContactBtn: {
    position:"absolute", 
    right:15, 
    bottom:50, 
    backgroundColor:'black', 
    paddingVertical:15,
    paddingHorizontal: 20, 
    borderRadius:40, 
    alignItems:'center', 
    justifyContent:'center'
  },
})