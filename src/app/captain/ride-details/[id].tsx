import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface Ride {
  id: string;
  status: string;
  date: string;
  pickup: string;
  dropoff: string;
  duration: string;
  distance: string;
  fare: string;
  payment: {
    method: string;
    status: 'completed' | 'pending' | 'failed';
  };
  driver: {
    name: string;
    rating: number;
    vehicleNumber: string;
    vehicleModel: string;
  };
  timeline: {
    time: string;
    status: string;
    description: string;
  }[];
}

const MOCK_RIDE: Ride = {
  id: '1',
  status: 'completed',
  date: 'Today, 2:30 PM',
  pickup: 'Central Mall, MG Road',
  dropoff: 'Airport Terminal 1',
  duration: '45 mins',
  distance: '28.5 km',
  fare: '450',
  payment: {
    method: 'Cash',
    status: 'completed',
  },
  driver: {
    name: 'John Doe',
    rating: 4.8,
    vehicleNumber: 'KA 01 AB 1234',
    vehicleModel: 'Swift Dzire',
  },
  timeline: [
    {
      time: '2:30 PM',
      status: 'Completed',
      description: 'Ride completed successfully',
    },
    {
      time: '2:15 PM',
      status: 'In Progress',
      description: 'Reached destination',
    },
    {
      time: '1:45 PM',
      status: 'In Progress',
      description: 'Trip started',
    },
    {
      time: '1:44 PM',
      status: 'Arrived',
      description: 'Driver arrived at pickup location',
    },
  ],
};

function useRideDetails(id: string | undefined) {
  const [ride, setRide] = useState<Ride | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setRide(MOCK_RIDE);
    }, 500);
  }, [id]);

  return { ride };
}

export default function RideDetailsScreen() {
    const id = '1'; // Static ID for testing
    const router = useRouter();
    const { ride } = useRideDetails(id);
  
    if (!ride) {
      return <Text style={styles.loadingText}>Loading...</Text>;
    }
  
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Ride Details</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="share-social" size={20} color="white" />
          </TouchableOpacity>
        </View>
  
        <ScrollView contentContainerStyle={styles.content}>
          {/* Map */}
          <View style={styles.mapContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1577086664693-894d8405334a?w=800&auto=format&fit=crop&q=60' }}
              style={styles.mapImage}
            />
            <View style={styles.mapOverlay}>
              <View style={styles.route}>
                <View style={styles.routeDot} />
                <View style={styles.routeLine} />
                <View style={styles.routeDot} />
              </View>
              <View>
                <Text style={styles.routeText}>{ride.pickup}</Text>
                <Text style={styles.routeText}>{ride.dropoff}</Text>
              </View>
            </View>
          </View>
  
          {/* Ride Info */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.statusBadge}>{ride.status}</Text>
              <Text style={styles.dateText}>{ride.date}</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="access-time" size={20} color="#6b7280" />
              <Text style={styles.infoText}>Duration: {ride.duration}</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="navigation" size={20} color="#6b7280" />
              <Text style={styles.infoText}>Distance: {ride.distance}</Text>
            </View>
          </View>
  
          {/* Payment Info */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Payment Details</Text>
            <View style={styles.infoRow}>
              <MaterialIcons name="credit-card" size={20} color="#6b7280" />
              <Text style={styles.infoText}>Method: {ride.payment.method}</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="check-circle" size={20} color={ride.payment.status === 'completed' ? 'green' : 'red'} />
              <Text style={[styles.infoText, { color: ride.payment.status === 'completed' ? 'green' : 'red' }]}>
                Status: {ride.payment.status}
              </Text>
            </View>
            <Text style={styles.totalAmount}>₹{ride.fare}</Text>
          </View>
  
          {/* Driver Info */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Driver Details</Text>
            <View style={styles.driverInfo}>
              <View style={styles.driverAvatar}>
                <Text style={styles.driverAvatarText}>{ride.driver.name.charAt(0)}</Text>
              </View>
              <View>
                <Text style={styles.driverName}>{ride.driver.name}</Text>
                <Text style={styles.driverRating}>Rating: {ride.driver.rating}</Text>
              </View>
            </View>
            <Text style={styles.driverDetails}>Vehicle: {ride.driver.vehicleModel}</Text>
            <Text style={styles.driverDetails}>Number: {ride.driver.vehicleNumber}</Text>
          </View>
  
          {/* Timeline */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Timeline</Text>
            {ride.timeline.map((event, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineIndicator}>
                  <View style={styles.timelineDot} />
                  {index !== ride.timeline.length - 1 && <View style={styles.timelineLine} />}
                </View>
                <View>
                  <Text style={styles.timelineStatus}>{event.status}</Text>
                  <Text style={styles.timelineTime}>{event.time}</Text>
                  <Text style={styles.timelineDescription}>{event.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
  

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { backgroundColor: '#2563eb', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  iconButton: { padding: 8 },
  title: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  content: { padding: 16 },
  mapContainer: { height: 200, backgroundColor: '#e5e7eb', marginBottom: 16 },
  mapImage: { width: '100%', height: '100%' },
  mapOverlay: { position: 'absolute', bottom: 10, left: 10, right: 10 },
  route: { flexDirection: 'row', alignItems: 'center' },
  routeDot: { width: 10, height: 10, backgroundColor: '#2563eb', borderRadius: 5 },
  routeLine: { flex: 1, height: 2, backgroundColor: '#6b7280' },
  routeText: { color: 'white', fontSize: 14 },
  card: { backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 }, // FIXED HERE
  statusBadge: { backgroundColor: '#d1fae5', color: '#065f46', padding: 4, borderRadius: 4 },
  dateText: { color: '#6b7280' },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  infoText: { marginLeft: 8, color: '#4b5563' },
  totalAmount: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  driverInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  driverAvatar: { width: 40, height: 40, backgroundColor: '#d1d5db', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  driverAvatarText: { color: '#4b5563', fontSize: 18, fontWeight: 'bold' },
  driverName: { fontWeight: 'bold', fontSize: 16 },
  driverRating: { color: '#6b7280' },
  driverDetails: { color: '#4b5563', marginBottom: 4 },
  timelineItem: { flexDirection: 'row', marginBottom: 16 },
  timelineIndicator: { alignItems: 'center', marginRight: 8 },
  timelineDot: { width: 8, height: 8, backgroundColor: '#2563eb', borderRadius: 4 },
  timelineLine: { flex: 1, width: 2, backgroundColor: '#6b7280' },
  timelineStatus: { fontWeight: 'bold', fontSize: 14, marginBottom: 4 },
  timelineTime: { color: '#6b7280', fontSize: 12 },
  timelineDescription: { color: '#4b5563' },
  loadingText: { textAlign: 'center', marginTop: 20, color: '#6b7280' },
});
