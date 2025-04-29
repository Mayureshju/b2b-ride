import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function DriverStats() {
  const stats = [
    { label: 'Rating', value: '4.89', icon: 'star', color: '#FFC107' },
    { label: 'Total Rides', value: '2,847', icon: 'route', color: '#17A2B8' },
    { label: 'Acceptance', value: '98%', icon: 'thumbs-up', color: '#28A745' },
    { label: 'Experience', value: '2y 3m', icon: 'clock', color: '#6C757D' },
  ];

  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.icon}>
            <FontAwesome5 name={stat.icon} size={20} color={stat.color} />
          </View>
          <Text style={styles.value}>{stat.value}</Text>
          <Text style={styles.label}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 8,
  },
  card: {
    backgroundColor: '#FFF',
    flexBasis: '48%',
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 8,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
  },
  label: {
    color: '#6C757D',
    fontSize: 12,
  },
});
