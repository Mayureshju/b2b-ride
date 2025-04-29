import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Checkbox, IconButton } from 'react-native-paper';
import { signin } from '@/service/authService';
import { useWS } from '@/service/WSProvider';
import { useLocalSearchParams } from 'expo-router';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Male');
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [hasReferralCode, setHasReferralCode] = useState(false);
  const [estimatedStart, setEstimatedStart] = useState(null);
  const [estimatedEnd, setEstimatedEnd] = useState(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const { updateAccessToken } = useWS();
  const params = useLocalSearchParams();
  const phone = Array.isArray(params.phone) ? params.phone[0] : params.phone;

  const handleNext = async () => {
    if (phone) {
      signin({ role: 'captain', phone }, updateAccessToken);
    }
  };

  const formatTime = (date:any) => {
    if (!date) return '';
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <IconButton icon="arrow-left" size={24} onPress={() => { router.navigate('/captain/auth'); }} />
            <Text style={styles.title}>One last step</Text>
          </View>
          <IconButton icon="help-circle-outline" size={24} onPress={() => {}} />
        </View>

        {/* Name Input */}
        <Text style={styles.label}>Your name</Text>
        <TextInput
          style={styles.input}
          placeholder="Type your name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        {/* Email Input */}
        <Text style={styles.label}>Your email</Text>
        <TextInput
          style={styles.input}
          placeholder="Type your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        {/* Gender Selection */}
        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderContainer}>
          {['Male', 'Female', 'Other'].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.genderButton, gender === item && styles.selectedGender]}
              onPress={() => setGender(item)}
            >
              <Text style={[styles.genderText, gender === item && styles.selectedText]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Estimated On-Duty Start */}
        <Text style={styles.label}>Estimated On-Duty Start</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowStartPicker(true)}
        >
          <Text>{estimatedStart ? formatTime(estimatedStart) : 'Select Start Time'}</Text>
        </TouchableOpacity>
        {showStartPicker && (
          <DateTimePicker
            value={estimatedStart || new Date()}
            mode="time"
            display="default"
            onChange={(event, date) => {
              setShowStartPicker(false);
              if (date) setEstimatedStart(date);
            }}
          />
        )}

        {/* Estimated On-Duty End */}
        <Text style={styles.label}>Estimated On-Duty End</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowEndPicker(true)}
        >
          <Text>{estimatedEnd ? formatTime(estimatedEnd) : 'Select End Time'}</Text>
        </TouchableOpacity>
        {showEndPicker && (
          <DateTimePicker
            value={estimatedEnd || new Date()}
            mode="time"
            display="default"
            onChange={(event, date) => {
              setShowEndPicker(false);
              if (date) setEstimatedEnd(date);
            }}
          />
        )}

        {/* Checkboxes */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={receiveUpdates ? 'checked' : 'unchecked'}
            onPress={() => setReceiveUpdates(!receiveUpdates)}
          />
          <Text style={styles.checkboxLabel}>Receive updates on WhatsApp</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={hasReferralCode ? 'checked' : 'unchecked'}
            onPress={() => setHasReferralCode(!hasReferralCode)}
          />
          <Text style={styles.checkboxLabel}>Have a referral code?</Text>
        </View>
      </ScrollView>

      {/* Next Button at Bottom */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !name || !email || !gender || !estimatedStart || !estimatedEnd ? styles.disabledButton : null,
          ]}
          disabled={!name || !email || !gender || !estimatedStart || !estimatedEnd}
          onPress={handleNext}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    justifyContent: 'center',
  },
  genderContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  genderButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
  },
  selectedGender: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  genderText: {
    fontSize: 16,
    color: '#555',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  bottomButtonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  nextButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  nextText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
