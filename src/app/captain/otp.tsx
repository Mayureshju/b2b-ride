import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For arrow icon (Install if not already added)
import { router,useLocalSearchParams } from 'expo-router';
import { signin } from '@/service/authService';
import { useWS } from '@/service/WSProvider';
const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const inputs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];
  const { updateAccessToken } = useWS()
  const params = useLocalSearchParams();
  const phone = Array.isArray(params.phone) ? params.phone[0] : params.phone;
  const userAlreadyCreated = true;
    const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    if (value && index < 3) {
      inputs[index + 1]?.current?.focus();
    }
    setOtp(newOtp);
  };

  const handleKeyPress = (e: { nativeEvent: { key: string } }, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputs[index - 1]?.current?.focus();
    }
  };

  const handleConfirm = async () => {
    if (otp.join('').length === 4) {
      if (userAlreadyCreated) {
        const Formatedotp = otp.join('');
        console.log(otp)
        await signin({ role: 'captain', phone,countryCode:params?.countryCode, otp:Formatedotp }, updateAccessToken);
        console.log("Driver signed in successfully.");
      } else {
        console.log("Redirecting to personal details...");
        router.navigate({ pathname: "/captain/personaldetails", params: { phone } });
      }
    } else {
      console.log("Invalid OTP. Please enter all 4 digits.");
    }
  };

  const handleBackPress = () => {
router.navigate('/captain/auth')
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Verification Code</Text>
      <Text style={styles.subtitle}>We have sent the verification code to your phone number</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputs[index]}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(value) => handleChange(value, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            value={digit}
            autoFocus={index === 0}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    marginTop: 80,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    marginHorizontal: 8,
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#FF7A00',
    width: '80%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OTPVerification;
