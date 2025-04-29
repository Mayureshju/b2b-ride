import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function DocumentsSection() {
  const documents = [
    { name: "Driver's License", status: 'Valid till Dec 2024' },
    { name: 'Vehicle Insurance', status: 'Valid till Jun 2024' },
    { name: 'Vehicle Registration', status: 'Valid till Aug 2024' },
    { name: 'Background Check', status: 'Last updated Jan 2024' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Documents</Text>
      {documents.map((doc, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.name}>{doc.name}</Text>
          <Text style={styles.status}>{doc.status}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  card: {
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
  },
  status: {
    color: '#6C757D',
    fontSize: 12,
  },
});
