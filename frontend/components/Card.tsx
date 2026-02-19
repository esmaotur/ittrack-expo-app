import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

export function Card({ children, onPress, style }: CardProps) {
  const cardStyle = [styles.card, style];
  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.85}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 2px 8px rgba(0,0,0,0.07)' } as any
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.07,
          shadowRadius: 8,
          elevation: 3,
        }),
  },
});
