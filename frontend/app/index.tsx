import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/Card';
import { activities } from '@/data/activities';
import { weeklyStats } from '@/data/stats';
import { challenges } from '@/data/challenges';

const ACCENT = '#FF6B6B';
const BG = '#F0F2F8';

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingEmoji}>🏋️</Text>
          <Text style={styles.loadingTitle}>FitTrack</Text>
          <Text style={styles.loadingText}>Veriler yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const navItems = [
    {
      title: 'Aktiviteler',
      subtitle: `${activities.length} antrenman`,
      emoji: '🏃',
      color: '#FF6B6B',
      bg: '#FFF0F0',
      route: '/activities',
    },
    {
      title: 'İstatistikler',
      subtitle: `${weeklyStats.totalCalories} kcal`,
      emoji: '📊',
      color: '#4ECDC4',
      bg: '#F0FFFE',
      route: '/stats',
    },
    {
      title: 'Meydan Okumalar',
      subtitle: `${challenges.length} aktif`,
      emoji: '🏆',
      color: '#A29BFE',
      bg: '#F5F3FF',
      route: '/challenges',
    },
    {
      title: 'İlerleme',
      subtitle: `${weeklyStats.activeDays}/7 aktif gün`,
      emoji: '🔥',
      color: '#FD79A8',
      bg: '#FFF0F6',
      route: '/stats',
    },
  ];

  const topActivities = activities.slice(0, 3);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={styles.headerBlock}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Günaydın 👋</Text>
              <Text style={styles.heroName}>Bugünün hedeflerini ezebilirsin!</Text>
            </View>
            <View style={styles.streakBadge}>
              <Text style={styles.streakEmoji}>🔥</Text>
              <Text style={styles.streakNumber}>{weeklyStats.activeDays}</Text>
              <Text style={styles.streakLabel}>seri</Text>
            </View>
          </View>

          {/* Haftalık Özet */}
          <View style={styles.snapshotRow}>
            <View style={styles.snapshotItem}>
              <Text style={[styles.snapshotValue, { color: '#FF6B6B' }]}>
                {weeklyStats.totalCalories.toLocaleString('tr-TR')}
              </Text>
              <Text style={styles.snapshotMeta}>Kalori</Text>
            </View>
            <View style={styles.snapshotDivider} />
            <View style={styles.snapshotItem}>
              <Text style={[styles.snapshotValue, { color: '#4ECDC4' }]}>
                {weeklyStats.totalDistance} km
              </Text>
              <Text style={styles.snapshotMeta}>Mesafe</Text>
            </View>
            <View style={styles.snapshotDivider} />
            <View style={styles.snapshotItem}>
              <Text style={[styles.snapshotValue, { color: '#A29BFE' }]}>
                {weeklyStats.activeDays}/7
              </Text>
              <Text style={styles.snapshotMeta}>Aktif Gün</Text>
            </View>
          </View>
        </View>

        {/* ── Keşfet Grid ── */}
        <Text style={styles.sectionTitle}>Keşfet</Text>
        <View style={styles.grid}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.title}
              style={[styles.gridCard, { backgroundColor: item.bg }]}
              onPress={() => router.push(item.route as any)}
              activeOpacity={0.75}>
              <View style={[styles.gridIconWrap, { backgroundColor: item.color + '25' }]}>
                <Text style={styles.gridEmoji}>{item.emoji}</Text>
              </View>
              <Text style={[styles.gridTitle, { color: item.color }]}>{item.title}</Text>
              <Text style={styles.gridSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Son Aktiviteler ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Son Aktiviteler</Text>
          <TouchableOpacity onPress={() => router.push('/activities')}>
            <Text style={[styles.seeAll, { color: ACCENT }]}>Tümünü gör →</Text>
          </TouchableOpacity>
        </View>

        {topActivities.map((activity) => (
          <Card
            key={activity.id}
            style={styles.activityCard}
            onPress={() => router.push(`/activities/${activity.id}` as any)}>
            <View style={styles.activityRow}>
              <View style={[styles.activityIcon, { backgroundColor: activity.color + '20' }]}>
                <Text style={styles.activityEmoji}>{activity.emoji}</Text>
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityMeta}>{activity.category}</Text>
              </View>
              <View style={styles.activityStats}>
                <View style={[styles.calBadge, { backgroundColor: activity.color + '18' }]}>
                  <Text style={[styles.activityCal, { color: activity.color }]}>
                    {activity.calories} kcal
                  </Text>
                </View>
                <Text style={styles.activityDur}>{activity.duration} dak</Text>
              </View>
            </View>
          </Card>
        ))}

        {/* ── CTA Banner ── */}
        <TouchableOpacity
          style={styles.ctaBanner}
          onPress={() => router.push('/challenges')}
          activeOpacity={0.85}>
          <View>
            <Text style={styles.ctaText}>🏆 Meydan Okumaya Katıl</Text>
            <Text style={styles.ctaSub}>
              Seni bekleyen {challenges.length} meydan okuma var →
            </Text>
          </View>
          <View style={styles.ctaArrow}>
            <Text style={styles.ctaArrowText}>›</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  scroll: { flex: 1 },
  content: { paddingBottom: 48 },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: BG,
  },
  loadingEmoji: { fontSize: 52 },
  loadingTitle: { fontSize: 28, fontWeight: '800', color: '#1A202C', letterSpacing: -0.5 },
  loadingText: { fontSize: 15, color: '#8E9AAF' },

  /* Header block */
  headerBlock: {
    backgroundColor: '#1A202C',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  greeting: { fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: '500', marginBottom: 4 },
  heroName: { fontSize: 20, fontWeight: '800', color: '#FFF', maxWidth: 220, lineHeight: 26 },

  streakBadge: {
    backgroundColor: '#2D3748',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
  },
  streakEmoji: { fontSize: 22 },
  streakNumber: { fontSize: 18, fontWeight: '800', color: '#FD9A3E', marginTop: 2 },
  streakLabel: { fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: '600', marginTop: 1 },

  snapshotRow: {
    flexDirection: 'row',
    backgroundColor: '#2D3748',
    borderRadius: 20,
    paddingVertical: 16,
  },
  snapshotItem: { flex: 1, alignItems: 'center' },
  snapshotValue: { fontSize: 22, fontWeight: '800' },
  snapshotMeta: { fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4, fontWeight: '500' },
  snapshotDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.1)' },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#1A202C',
    marginBottom: 14,
    paddingHorizontal: 20,
    letterSpacing: -0.3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 8,
    paddingHorizontal: 20,
  },
  seeAll: { fontSize: 14, fontWeight: '700' },

  /* Grid */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  gridCard: {
    width: '47%',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  gridIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  gridEmoji: { fontSize: 22 },
  gridTitle: { fontSize: 15, fontWeight: '800', marginBottom: 3 },
  gridSubtitle: { fontSize: 12, color: '#8E9AAF', fontWeight: '500' },

  /* Activity cards */
  activityCard: { marginBottom: 10, marginHorizontal: 20 },
  activityRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  activityIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityEmoji: { fontSize: 26 },
  activityInfo: { flex: 1 },
  activityTitle: { fontSize: 15, fontWeight: '700', color: '#1A202C', marginBottom: 3 },
  activityMeta: { fontSize: 12, color: '#8E9AAF', fontWeight: '500' },
  activityStats: { alignItems: 'flex-end', gap: 5 },
  calBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  activityCal: { fontSize: 13, fontWeight: '700' },
  activityDur: { fontSize: 12, color: '#8E9AAF', fontWeight: '500' },

  /* CTA */
  ctaBanner: {
    backgroundColor: '#1A202C',
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 22,
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ctaText: { fontSize: 17, fontWeight: '800', color: '#FFF', marginBottom: 4 },
  ctaSub: { fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  ctaArrow: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaArrowText: { fontSize: 24, color: '#FFF', lineHeight: 28 },
});
