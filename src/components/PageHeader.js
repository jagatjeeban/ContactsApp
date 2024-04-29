import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

//import constants
import { Colors, FontFamily } from "../common/constants";

//import svgs
import SvgBackArrow from '../assets/icons/svg/backArrow.svg';
import SvgSearch    from '../assets/icons/svg/searchWhite.svg';

const NormalHeader = ({navigation, placeholder, backBtn, headerTitle, headerTitleColor, iconArr, customClickEvent, rightBtnClickEvent, searchStatus, updateSearchStatus, searchBlur, textChangeEvent}) => {
    return(
        <View style={styles.body}>
            {!searchStatus? 
            <View style={{flex: 1, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <View style={{flexDirection:'row', alignItems:'center', maxWidth:"85%"}}>
                    {backBtn? 
                    <>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 20}}>
                            <SvgBackArrow />
                        </TouchableOpacity>
                        <View style={{paddingVertical: 20}}>
                            <Text style={{color: headerTitleColor, fontSize: 20, fontFamily: FontFamily.OutfitMedium}}>{headerTitle}</Text>
                        </View>
                    </>
                    :
                    <Text style={{color: headerTitleColor, fontSize: 20, fontFamily: FontFamily.OutfitMedium, padding: 20}}>{headerTitle}</Text>}
                </View>
                {iconArr?.length > 0? 
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    {iconArr.some((item) => item === 'search')?
                    <TouchableOpacity style={{padding: 20}} onPress={() => updateSearchStatus()}>
                        <SvgSearch />
                    </TouchableOpacity>: null}
                </View>: null}
            </View>
            :
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{color: Colors.Base_White, fontSize:16, marginLeft:20}}>Go Back</Text>
            </TouchableOpacity>}
        </View>
    )
}

const PageHeader = ({navigation, placeholder='Search', headerType='normalHeader', headerTitle=null, headerTitleColor=Colors.Base_White, iconArr=[], backBtn=false, customClickEvent=null, rightBtnClickEvent=null, searchBlur=null, searchEvent=null}) => {
    const [ searchStatus, setSearchStatus ] = useState(false);
    return(
        <>
            { headerType === 'normalHeader'? <NormalHeader navigation={navigation} headerTitle={headerTitle} headerTitleColor={headerTitleColor} placeholder={placeholder} backBtn={backBtn} iconArr={iconArr} customClickEvent={customClickEvent} rightBtnClickEvent={(req) => rightBtnClickEvent(req)} searchStatus={searchStatus} textChangeEvent={(val) => searchEvent(val)} searchBlur={() => {if(searchBlur) searchBlur()}} updateSearchStatus={() => setSearchStatus(!searchStatus)} />: null }
        </>
    )
}

export default PageHeader;

const styles = StyleSheet.create({
    body: {
        // paddingVertical: 10,
        // paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems:'center',
        // backgroundColor:"red"
    },
})