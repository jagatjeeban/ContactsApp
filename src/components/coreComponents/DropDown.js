import React, { useState } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { Colors, FontFamily } from "../../common/constants";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import SvgArrowDown from '../../assets/icons/svg/arrowDown.svg';

export default DropDown = ({ dropDownList, closeDropdown, placeholder = null, isEdit=false, clearInput, initialValue, loaderStatus, name = "", errorStatus = "", onRef, onSelectEvent, dropdownController}) => {

    const [selectedId, setSelectedId] = useState(0);

    return (
        <AutocompleteDropdown
            controller={(controller) => {
                dropdownController.current = controller;
            }}
            containerStyle={{ marginBottom: -7, fontFamily: FontFamily.OutfitRegular }}
            position={'absolute'}
            onChevronPress={() => closeDropdown? closeDropdown(): null}
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
            onClear={() => clearInput? clearInput(): null}
            EmptyResultComponent={<View style={{ padding: 15 }}><Text style={{ fontFamily: FontFamily.OutfitRegular, color: Colors.Base_White, backgroundColor: Colors.Bg_Light }}>No Options</Text></View>}
            renderItem={(item, index) =>
                <View style={{zIndex: 1000, borderRadius:12 }}>
                    <Text style={{ fontFamily: FontFamily.OutfitRegular, color: Colors.Base_White, backgroundColor: Colors.Bg_Light, borderRadius: 12, paddingHorizontal: 15, paddingVertical:12, fontSize: 16 }}>{item.title}</Text>
                </View>
            }
            suggestionsListContainerStyle={{backgroundColor: Colors.Bg_Light, borderRadius: 12, width: '40%', marginLeft: 40, marginTop: 20}}
            initialValue={initialValue}
            onSelectItem={(e) => [onSelectEvent(e), setSelectedId(e)]}
            loading={loaderStatus}
            inputContainerStyle={styles.inputContainer}
            dataSet={dropDownList}
            flatListProps={{
                style: {borderRadius: 12, borderWidth: 1, borderColor: Colors.Base_Grey},
                ItemSeparatorComponent: <View />
            }}
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