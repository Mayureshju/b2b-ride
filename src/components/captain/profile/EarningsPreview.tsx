import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function EarningsPreview() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Earnings Overview</Text>
        <Text style={styles.link}>View Details</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="dollar-sign" size={16} color="#17A2B8" />
          </View>
          <Text style={styles.subtitle}>This Week</Text>
        </View>
        <Text style={styles.amount}>$847.50</Text>
        <Text style={styles.change}>↑ 12% vs last week</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    fontSize: 14,
    color: '#007BFF',
  },
  card: {
    backgroundColor: '#F0F4F8',
    padding: 16,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    marginRight: 8,
    backgroundColor: '#E0F7F8',
    padding: 8,
    borderRadius: 16,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  amount: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  change: {
    fontSize: 12,
    color: '#28A745',
  },
});
