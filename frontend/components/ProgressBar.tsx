import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressBarProps {
  progress: number; // 0 to 1
  color?: string;
  height?: number;
  label?: string;
  showPercent?: boolean;
}

export function ProgressBar({
  progress,
  color = '#FF6B6B',
  height = 10,
  label,
  showPercent = false,
}: ProgressBarProps) {
  const clampedProgress = Math.min(1, Math.max(0, progress));

  return (
    <View style={styles.wrapper}>
      {(label || showPercent) && (
        <View style={styles.labelRow}>
          {label ? <Text style={styles.label}>{label}</Text> : <View />}
          {showPercent && (
            <Text style={[styles.percent, { color }]}>
              {Math.round(clampedProgress * 100)}%
            </Text>
          )}
        </View>
      )}
      <View style={[styles.track, { height }]}>
        <View
          style={[
            styles.fill,
            { width: `${clampedProgress * 100}%`, backgroundColor: color, height },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    color: '#4A5568',
    fontWeight: '500',
  },
  percent: {
    fontSize: 13,
    fontWeight: '700',
  },
  track: {
    backgroundColor: '#EDF2F7',
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 999,
  },
});
