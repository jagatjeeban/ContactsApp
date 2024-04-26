import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../../common/constants';

const Favourites = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}></SafeAreaView>
  )
}

export default Favourites;

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: Colors.BgColor
    }
})