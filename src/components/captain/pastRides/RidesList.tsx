import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RideCard } from './RideCard';

interface Ride {
  id: string;
  status: any;
  date: string;
  pickup: string;
  dropoff: string;
  duration: string;
  distance: string;
  fare: string;
}

interface RidesListProps {
  rides: Ride[];
}

export function RidesList({ rides }: RidesListProps) {
  if (rides.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1636651424143-df0e86c68e10?w=400' }}
          style={styles.emptyImage}
        />
        <Text style={styles.emptyText}>No rides found for the selected filters</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      {rides.map((ride) => (
        <RideCard key={ride.id} ride={ride} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});
