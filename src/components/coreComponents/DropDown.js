import React, { useState } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { Colors, FontFamily } from "../../common/constants";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import SvgArrowDown from '../../assets/icons/svg/arrowDown.svg';

export default DropDown = ({ dropDownList, closeDropdown, positionType='absolute', placeholder = null, isEdit=false, clearInput, initialValue, loaderStatus, name = "", errorStatus = "", onRef, onSelectEvent, dropdownController, dataCallApi=null }) => {

    const [selectedId, setSelectedId] = useState(0);

    return (
        <AutocompleteDropdown
            controller={(controller) => {
                dropdownController.current = controller;
            }}
            containerStyle={{ marginBottom: -7, fontFamily: FontFamily.OutfitRegular }}
            position={Platform.OS == 'ios' ? positionType : 'relative'}
            onChevronPress={() => closeDropdown()}
            onOpenSuggestionsList={(e) => e ? closeDropdown() : null}
            closeOnSubmit={true}
            closeOnBlur={false}
            useFilter={false}
            clearOnFocus={true}
            showClear={false}
            textInputProps={{
                style: styles.textInputProps,
                placeholder: placeholder,
                selectionColor: Colors.Primary,
                placeholderTextColor: Colors.Base_Medium_Grey,
            }}
            ChevronIconComponent={<SvgArrowDown />}
            direction={"down"}
            ref={onRef}
            onBlur={() => { console.log("=============>") }}
            onClear={() => clearInput == undefined ? null : clearInput()}
            EmptyResultComponent={<View style={{ padding: 15 }}><Text style={{ fontFamily: FontFamily.OutfitRegular, color: Colors.Base_White, backgroundColor: Colors.Bg_Light }}>No Options</Text></View>}
            renderItem={(item, text) =>
                <View style={{ width: '100%', zIndex: 100000 }}>
                    <Text style={{ fontFamily: FontFamily.OutfitRegular, color: Colors.Base_White, backgroundColor: Colors.Bg_Light, padding: 15 }}>{item.title}</Text>
                </View>
            }
            initialValue={initialValue}
            onSelectItem={(e) => [onSelectEvent(e), setSelectedId(e)]}
            loading={loaderStatus}
            inputContainerStyle={styles.inputContainer}
            dataSet={dropDownList}
        />
    );
}

const styles = StyleSheet.create({
    textInputProps: {
        color: Colors.Base_White,
        fontWeight: '400',
        fontSize: 16,
        paddingLeft: 10,
        paddingVertical: 7,
        fontFamily: FontFamily.OutfitRegular,
    },
    inputContainer: {
        marginLeft: 40,
        marginTop: 10,
        width:'40%',
        backgroundColor: Colors.Bg_Light,
        borderWidth: 1,
        borderColor: Colors.Base_Grey,
        borderRadius: 12,
        padding: 5,
        top: -4,
    }
});