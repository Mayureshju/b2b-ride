import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';

interface FilterProps {
  filters: {
    dateRange: string;
    status: string;
  };
  onFilterChange: (filters: any) => void;
}

export function RidesFilter({ filters, onFilterChange }: FilterProps) {
  return (
    <View style={styles.filterContainer}>
      <View style={styles.filterHeader}>
        <View style={styles.filterTitle}>
          <MaterialIcons name="filter-list" size={20} color="#2563eb" />
          <Text style={styles.filterText}>Filters</Text>
        </View>
        <TouchableOpacity onPress={() => onFilterChange({ dateRange: 'all', status: 'all' })}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.label}>Date Range</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={filters.dateRange}
            onValueChange={(value) => onFilterChange({ ...filters, dateRange: value })}
          >
            <Picker.Item label="Today" value="today" />
            <Picker.Item label="This Week" value="week" />
            <Picker.Item label="This Month" value="month" />
            <Picker.Item label="Custom Range" value="custom" />
          </Picker>
        </View>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.label}>Status</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={filters.status}
            onValueChange={(value) => onFilterChange({ ...filters, status: value })}
          >
            <Picker.Item label="All Status" value="all" />
            <Picker.Item label="Completed" value="completed" />
            <Picker.Item label="Cancelled" value="cancelled" />
          </Picker>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
    marginLeft: 8,
  },
  resetText: {
    fontSize: 12,
    color: '#2563eb',
  },
  filterSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
  },
  pickerWrapper: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
});
