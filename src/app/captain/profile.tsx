import { View, ScrollView, StyleSheet } from 'react-native';
import React from 'react'
import { homeStyles } from '@/styles/homeStyles';
import CaptainHeader from '@/components/captain/CaptainHeader'
import { StatusBar } from 'expo-status-bar';
import ProfileInfo from '@/components/captain/profile/ProfileInfo';
import DriverStats from '@/components/captain/profile/DriverStats';
import EarningsPreview from '@/components/captain/profile/EarningsPreview';
import DocumentsSection from '@/components/captain/profile/DocumentsSection';
const profile = () => {
  return (
    <View style={homeStyles.container}>
    <StatusBar style="light" backgroundColor="orange" translucent={false} />
    <CaptainHeader />
    <ScrollView contentContainerStyle={styles.content}>
        <ProfileInfo />
        <DriverStats />
        <EarningsPreview />
        <DocumentsSection />
      </ScrollView>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({
  
    content: {
      paddingBottom: 16,
    },
  });