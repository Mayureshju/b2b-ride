import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RidesFilter } from './RidesFilter';
import { RidesList } from './RidesList';

const MOCK_RIDES = [
  {
    id: '1',
    status: 'completed',
    date: 'Today, 2:30 PM',
    pickup: 'Central Mall, MG Road',
    dropoff: 'Airport Terminal 1',
    duration: '45 mins',
    distance: '28.5 km',
    fare: '450',
  },
  {
    id: '2',
    status: 'cancelled',
    date: 'Today, 11:15 AM',
    pickup: 'Tech Park, Whitefield',
    dropoff: 'Metro Station, Indiranagar',
    duration: '35 mins',
    distance: '15.2 km',
    fare: '320',
  },
  // Add more mock rides as needed
];

export function RidesHistory() {
  const [filters, setFilters] = useState({
    dateRange: 'all',
    status: 'all',
  });

  const filteredRides = useMemo(() => {
    return MOCK_RIDES.filter((ride) => {
      if (filters.status !== 'all' && ride.status !== filters.status) {
        return false;
      }
      // Add date range filter logic if needed
      return true;
    });
  }, [filters]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Rides</Text>
        <Text style={styles.subtitle}>View and manage your ride history</Text>
      </View>

      <ScrollView>
        <RidesFilter filters={filters} onFilterChange={setFilters} />
        <RidesList rides={filteredRides} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#2563eb',
    padding: 16,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#bfdbfe',
  },
});
