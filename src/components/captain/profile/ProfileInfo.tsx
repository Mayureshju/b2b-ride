import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function ProfileInfo() {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Ionicons name="camera" size={28} color="#A9A9A9" />
        </View>
        <TouchableOpacity style={styles.cameraButton}>
          <Ionicons name="camera" size={16} color="#FFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.subtext}>ID: DRV28973</Text>
        <View style={styles.vehicleInfo}>
          <MaterialIcons name="directions-car" size={16} color="#6C757D" />
          <Text style={styles.subtext}>Toyota Camry • KA 01 AB 1234</Text>
        </View>
        <View style={styles.status}>
          <Text style={styles.statusText}>Available for Rides</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 140,
    backgroundColor: '#000',
    padding: 6,
    borderRadius: 16,
  },
  info: {
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
  },
  subtext: {
    color: '#6C757D',
    fontSize: 14,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  status: {
    marginTop: 8,
    backgroundColor: '#E0F7E0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    color: '#28A745',
    fontSize: 14,
    fontWeight: '600',
  },
});
