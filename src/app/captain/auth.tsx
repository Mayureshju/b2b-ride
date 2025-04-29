import { View, Image, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { commonStyles } from '@/styles/commonStyles'
import { authStyles } from '@/styles/authStyles'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CustomText from '@/components/shared/CustomText';
import CustomButton from '@/components/shared/CustomButton';
import PhoneInput from '@/components/shared/PhoneInput';
import { signin } from '@/service/authService';
import { useWS } from '@/service/WSProvider';
import { router } from 'expo-router';

const Auth = () => {
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('+965')
  const { updateAccessToken } = useWS()
  const handleNext = async () => {
    if (!phone) {
      Alert.alert("Please enter your phone number")
      return
    }
    router.navigate({ pathname: "/captain/otp", params: { phone, countryCode  } });
    // signin({ role: 'captain', phone }, updateAccessToken)
  }

  return (
    <SafeAreaView style={authStyles.container}>
      <ScrollView contentContainerStyle={authStyles.container}>

        <View style={commonStyles.flexRowBetween}>
          <Image source={require('@/assets/images/captain_logo.png')} style={authStyles.logo} />
          <TouchableOpacity style={authStyles.flexRowGap}>
            <MaterialIcons name="help" size={18} color='grey' />
            <CustomText fontFamily='Medium' variant='h7'>Help</CustomText>
          </TouchableOpacity>
        </View>

        <CustomText fontFamily='Medium' variant='h6'>Good to see you, Captain!</CustomText>
        <CustomText fontFamily='Regular' style={commonStyles.lightText} variant='h7'>Enter your phone number to proceed</CustomText>


        <PhoneInput
          onChangeText={setPhone}
          value={phone}
          setCountryCode={setCountryCode}
        />
      </ScrollView>

      <View style={authStyles.footerContainer}>
        <CustomText
          fontFamily='Regular'
          style={[commonStyles.lightText, { textAlign: 'center', marginHorizontal: 20 }]}
          variant='h8'>
          By continuing, you agree to the terms and privacy policy of Rapido
        </CustomText>
        <CustomButton
          title='Next'
          onPress={handleNext}
          loading={false}
          disabled={false}
        />
      </View>


    </SafeAreaView>
  )
}

export default Auth