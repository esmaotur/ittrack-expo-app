import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatBadgeProps {
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
}

export function StatBadge({ label, value, unit, color = '#FF6B6B' }: StatBadgeProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.value, { color }]}>
        {value}{unit ? ` ${unit}` : ''}
      </Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
  },
  label: {
    fontSize: 12,
    color: '#8E9AAF',
    marginTop: 2,
  },
});
