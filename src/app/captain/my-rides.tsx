import { View, ScrollView, StyleSheet } from 'react-native';
import React from 'react'
import { homeStyles } from '@/styles/homeStyles';
import CaptainHeader from '@/components/captain/CaptainHeader'
import { StatusBar } from 'expo-status-bar';
import { RidesHistory } from '@/components/captain/pastRides/RidesHistory';

const MyRides = () => {
  return (
    <View style={homeStyles.container}>
    <StatusBar style="light" backgroundColor="orange" translucent={false} />
    <CaptainHeader />
<RidesHistory/>
    </View>
  )
}

export default MyRides

const styles = StyleSheet.create({
  
    content: {
      paddingBottom: 16,
    },
  });