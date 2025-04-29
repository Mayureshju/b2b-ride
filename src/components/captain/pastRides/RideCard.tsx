import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export interface Ride {
  id: string;
  status: 'completed' | 'cancelled';
  date: string;
  pickup: string;
  dropoff: string;
  duration: string;
  distance: string;
  fare: string;
}

interface RideCardProps {
  ride: Ride;
}

export function RideCard({ ride }: RideCardProps) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/captain/ride-details/${ride.id}`)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.status,
            ride.status === 'completed' ? styles.completed : styles.cancelled,
          ]}
        >
          {ride.status}
        </Text>
        <Text style={styles.date}>{ride.date}</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.route}>
          <View style={styles.routeIndicator}>
            <View style={styles.routePoint} />
            <View style={styles.routeLine} />
            <View style={styles.routePoint} />
          </View>
          <View style={styles.routeDetails}>
            <Text style={styles.pickup}>{ride.pickup}</Text>
            <Text style={styles.dropoff}>{ride.dropoff}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.info}>
            <View style={styles.infoItem}>
              <MaterialIcons name="access-time" size={14} color="gray" />
              <Text style={styles.infoText}>{ride.duration}</Text>
            </View>
            <View style={styles.infoItem}>
              <Entypo name="location" size={14} color="gray" />
              <Text style={styles.infoText}>{ride.distance}</Text>
            </View>
          </View>
          <View style={styles.fare}>
            <FontAwesome name="rupee" size={14} color="blue" />
            <Text style={styles.fareText}>{ride.fare}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 8,
  },
  pressed: {
    opacity: 0.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  status: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    textTransform: 'capitalize',
  },
  completed: {
    backgroundColor: '#d1fae5',
    color: '#047857',
  },
  cancelled: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  body: {
    flexDirection: 'column',
  },
  route: {
    flexDirection: 'row',
  },
  routeIndicator: {
    alignItems: 'center',
    marginRight: 8,
  },
  routePoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563eb',
  },
  routeLine: {
    width: 2,
    height: 24,
    backgroundColor: '#e5e7eb',
  },
  routeDetails: {
    flex: 1,
  },
  pickup: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dropoff: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginTop: 12,
    paddingTop: 8,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 4,
  },
  fare: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fareText: {
    fontSize: 14,
    color: '#2563eb',
    marginLeft: 4,
    fontWeight: 'bold',
  },
});
