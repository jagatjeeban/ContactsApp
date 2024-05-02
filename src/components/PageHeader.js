import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, BackHandler } from "react-native";

//import constants
import { Colors, FontFamily } from "../common/constants";

//import svgs
import SvgBackArrow from '../assets/icons/svg/backArrow.svg';
import SvgBackGrey  from '../assets/icons/svg/backArrowGrey.svg';
import SvgSearch    from '../assets/icons/svg/searchWhite.svg';
import SvgCross     from '../assets/icons/svg/crossGrey.svg';

const NormalHeader = ({navigation, placeholder, backBtn, headerTitle, headerTitleColor, iconArr, customClickEvent, rightBtnClickEvent, searchStatus, updateSearchStatus, searchBlur, textChangeEvent}) => {
    const [ searchInput, setSearchInput ] = useState('');
    const searchRef = useRef();

    useEffect(() => {
        if(searchStatus){
            searchRef.current.focus();
        }
    }, [searchStatus]);

    const handleBackPress = () => {
        if(searchStatus){
            updateSearchStatus();
            textChangeEvent('');
            setSearchInput('');
            return true;
        }
        return false;
    }

    useEffect(()=>{
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => backHandler.remove();
    }, [searchStatus]);

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
            <View style={{flex: 1, flexDirection: 'row', alignItems:"center", justifyContent:"space-between", borderBottomWidth: 1, borderColor: Colors.Base_Grey, marginBottom:1}}>
                <View style={{flexDirection:'row', alignItems:"center", width:"87%"}}>
                    <TouchableOpacity onPress={() => [updateSearchStatus(), textChangeEvent(''), setSearchInput('')]} style={{padding: 20}}>
                        <SvgBackGrey />
                    </TouchableOpacity>
                    <TextInput
                        ref={searchRef}
                        placeholder={placeholder}
                        selectionColor={Colors.Primary}
                        placeholderTextColor={Colors.Base_Medium_Grey}
                        value={searchInput}
                        autoFocus={true}
                        style={{color: Colors.Base_White, fontSize: 18, fontFamily: FontFamily.OutfitRegular, paddingVertical:20, width:'85%'}}
                        onBlur={() => { if(searchBlur) searchBlur() }}
                        onChange={(e) => [textChangeEvent(e.nativeEvent.text), setSearchInput(e.nativeEvent.text)]}
                    />
                </View>
                {searchInput !== ''? 
                <TouchableOpacity onPress={() => [textChangeEvent(''), setSearchInput('')]} style={{padding:20}}>
                    <SvgCross />
                </TouchableOpacity>: null}
            </View>}
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
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems:'center',
    },
})