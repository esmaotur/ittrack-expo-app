import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { activities } from '@/data/activities';
import { Card } from '@/components/Card';
import { StatBadge } from '@/components/StatBadge';

const BG = '#F0F2F8';

export default function ActivityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [joined, setJoined] = useState(false);

  const activity = activities.find((a) => a.id === id);

  if (!activity) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundEmoji}>🤷</Text>
          <Text style={styles.notFoundText}>Aktivite bulunamadı</Text>
          <TouchableOpacity style={styles.backLink} onPress={() => router.back()}>
            <Text style={styles.backLinkText}>Geri dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const difficultyTR = activity.difficulty;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: activity.color }]}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.heroContent}>
            <Text style={styles.heroEmoji}>{activity.emoji}</Text>
            <Text style={styles.heroCategory}>{activity.category}</Text>
            <Text style={styles.heroTitle}>{activity.title}</Text>
            <View style={styles.heroBadgeRow}>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>{difficultyTR}</Text>
              </View>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>{activity.duration} dak</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <Card style={styles.statsCard}>
          <StatBadge label="Kalori" value={activity.calories} unit="kcal" color={activity.color} />
          <View style={styles.statDivider} />
          <StatBadge label="Süre" value={activity.duration} unit="dak" color="#4ECDC4" />
          <View style={styles.statDivider} />
          <StatBadge
            label="Mesafe"
            value={activity.distance > 0 ? activity.distance : '—'}
            unit={activity.distance > 0 ? 'km' : ''}
            color="#A29BFE"
          />
        </Card>

        {/* Description */}
        <Card style={styles.descCard}>
          <Text style={styles.sectionTitle}>Bu Aktivite Hakkında</Text>
          <Text style={styles.description}>{activity.description}</Text>
        </Card>

        {/* Tips */}
        <Card style={styles.tipsCard}>
          <Text style={styles.sectionTitle}>Hızlı İpuçları</Text>
          {[
            'Başlamadan önce 5 dakika ısın',
            'Antrenman boyunca bol su iç',
            'Vücudunu dinle, gerekirse dinlen',
          ].map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <View style={[styles.tipDot, { backgroundColor: activity.color }]} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </Card>

        {/* Intensity Breakdown */}
        <Card style={styles.breakdownCard}>
          <Text style={styles.sectionTitle}>Yoğunluk Dağılımı</Text>
          {[
            { label: 'Kardiyo', pct: 0.75 },
            { label: 'Güç', pct: 0.45 },
            { label: 'Esneklik', pct: 0.3 },
          ].map((row) => (
            <View key={row.label} style={styles.barRow}>
              <Text style={styles.barLabel}>{row.label}</Text>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    { width: `${row.pct * 100}%` as any, backgroundColor: activity.color },
                  ]}
                />
              </View>
              <Text style={[styles.barPct, { color: activity.color }]}>
                {Math.round(row.pct * 100)}%
              </Text>
            </View>
          ))}
        </Card>

      </ScrollView>

      {/* Join Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.joinBtn, { backgroundColor: joined ? '#48BB78' : activity.color }]}
          onPress={() => setJoined(!joined)}
          activeOpacity={0.85}>
          <Text style={styles.joinBtnText}>
            {joined ? '✓ Antrenmanlarıma Eklendi' : `${activity.title} Başlat`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  content: { paddingBottom: 110 },

  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  notFoundEmoji: { fontSize: 48 },
  notFoundText: { fontSize: 18, fontWeight: '800', color: '#1A202C' },
  backLink: { marginTop: 8 },
  backLinkText: { color: '#FF6B6B', fontWeight: '700', fontSize: 15 },

  hero: {
    paddingTop: 60,
    paddingBottom: 44,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  backBtn: {
    position: 'absolute',
    top: 18,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: { fontSize: 20, color: '#FFF' },
  heroContent: { alignItems: 'center' },
  heroEmoji: { fontSize: 68, marginBottom: 10 },
  heroCategory: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 14,
    letterSpacing: -0.5,
  },
  heroBadgeRow: { flexDirection: 'row', gap: 8 },
  heroBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  heroBadgeText: { color: '#FFF', fontWeight: '700', fontSize: 13 },

  statsCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: -22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
    paddingVertical: 20,
  },
  statDivider: { width: 1, backgroundColor: '#EDF2F7', marginHorizontal: 4 },

  descCard: { margin: 20, marginBottom: 12 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A202C',
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  description: { fontSize: 14, lineHeight: 23, color: '#4A5568' },

  tipsCard: { marginHorizontal: 20, marginBottom: 12 },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  tipDot: { width: 8, height: 8, borderRadius: 4, marginTop: 6 },
  tipText: { fontSize: 14, color: '#4A5568', flex: 1, lineHeight: 21 },

  breakdownCard: { marginHorizontal: 20, marginBottom: 12 },
  barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
  barLabel: { fontSize: 13, color: '#4A5568', width: 74, fontWeight: '600' },
  barTrack: {
    flex: 1,
    height: 10,
    backgroundColor: '#EDF2F7',
    borderRadius: 999,
    overflow: 'hidden',
  },
  barFill: { height: 10, borderRadius: 999 },
  barPct: { fontSize: 12, fontWeight: '800', width: 36, textAlign: 'right' },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: BG,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  joinBtn: {
    borderRadius: 18,
    paddingVertical: 17,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 5,
  },
  joinBtnText: { color: '#FFF', fontSize: 17, fontWeight: '800', letterSpacing: 0.2 },
});
