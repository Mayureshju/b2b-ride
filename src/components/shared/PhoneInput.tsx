import { View, TextInput, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native'
import React, { FC, useState } from 'react'
import CustomText from './CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
const countries = [
    { name: "Kuwait", code: "+965", flag: "🇰🇼" },
    { name: "India", code: "+91", flag: "🇮🇳" },
    { name: "UAE", code: "+971", flag: "🇦🇪" },
   
];

const PhoneInput: FC<PhoneInputProps> = ({ value, onChangeText, onBlur, onFocus, setCountryCode }) => {
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>
              <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.countryPicker}>
                <CustomText fontFamily='Medium' style={styles.text}>
                    {selectedCountry.flag} {selectedCountry.code}
                </CustomText>
            </TouchableOpacity>

            {/* <CustomText fontFamily='Medium' style={styles.text}>🇮🇳 +91</CustomText> */}
            <TextInput
                placeholder='0000000000'
                keyboardType='phone-pad'
                value={value}
                maxLength={10}
                placeholderTextColor={'#ccc'}
                onChangeText={onChangeText}
                onFocus={onFocus}
                onBlur={onBlur}
                style={styles.input}
            />
             <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={countries}
                            keyExtractor={(item) => item.code}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.countryOption}
                                    onPress={() => {
                                        setSelectedCountry(item);
                                        setCountryCode(item.code);
                                        setModalVisible(false);
                                    }}
                                >
                                    <CustomText fontFamily='Medium' style={styles.text}>
                                        {item.flag} {item.name} ({item.code})
                                    </CustomText>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: "center",
        gap: 4,
        marginVertical: 15,
        borderWidth: 1,
        borderColor:'#222',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    input: {
        fontSize: RFValue(13),
        fontFamily: "Medium",
        height:45,
        width:'90%'
    },
    text: {
        fontSize: RFValue(13),
        top: -1,
        fontFamily: "Medium"
    }
,
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        width: '80%',
        padding: 20,
        borderRadius: 10,
    },
    countryOption: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    }

    ,

    countryPicker: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 10,
    },
})

export default PhoneInput