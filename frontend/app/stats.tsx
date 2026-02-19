import React from 'react';
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
import { ProgressBar } from '@/components/ProgressBar';
import { weeklyStats, allTimeStats } from '@/data/stats';

const BG = '#F0F2F8';
const ACCENT = '#4ECDC4';

const MAX_CAL = Math.max(...weeklyStats.dailyCalories.map((d) => d.calories), 1);

export default function StatsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>İstatistiklerim</Text>
          <View style={{ width: 38 }} />
        </View>

        {/* Weekly Hero Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.heroWeek}>📅 {weeklyStats.week}</Text>
              <Text style={styles.heroHeading}>Haftalık Özet</Text>
            </View>
            <View style={styles.heroStreakBadge}>
              <Text style={styles.heroStreakEmoji}>🔥</Text>
              <Text style={styles.heroStreakVal}>{allTimeStats.currentStreak}</Text>
              <Text style={styles.heroStreakLabel}>günlük seri</Text>
            </View>
          </View>
          <View style={styles.heroRow}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatVal}>
                {weeklyStats.totalCalories.toLocaleString('tr-TR')}
              </Text>
              <Text style={styles.heroStatLabel}>Kalori</Text>
            </View>
            <View style={styles.heroDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatVal}>{weeklyStats.totalDistance}</Text>
              <Text style={styles.heroStatLabel}>km Mesafe</Text>
            </View>
            <View style={styles.heroDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatVal}>{weeklyStats.totalDuration}</Text>
              <Text style={styles.heroStatLabel}>dak Aktif</Text>
            </View>
          </View>
        </View>

        {/* Daily Calories Chart */}
        <Card style={styles.chartCard}>
          <Text style={styles.cardTitle}>Günlük Yakılan Kalori</Text>
          <View style={styles.barChart}>
            {weeklyStats.dailyCalories.map((d) => {
              const heightPct = d.calories > 0 ? d.calories / MAX_CAL : 0;
              const isActive = d.calories > 0;
              return (
                <View key={d.day} style={styles.barCol}>
                  <Text style={[styles.barCalText, isActive && { color: ACCENT }]}>
                    {d.calories > 0 ? d.calories : ''}
                  </Text>
                  <View style={styles.barContainer}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: Math.max(Math.round(heightPct * 100), isActive ? 6 : 4),
                          backgroundColor: isActive ? ACCENT : '#E2E8F0',
                        },
                      ]}
                    />
                  </View>
                  <Text style={[styles.barDay, isActive && styles.barDayActive]}>{d.day}</Text>
                </View>
              );
            })}
          </View>
        </Card>

        {/* Weekly Goals */}
        <Card style={styles.goalsCard}>
          <Text style={styles.cardTitle}>Haftalık Hedefler</Text>
          <ProgressBar
            label="Kalori Yakıldı"
            progress={weeklyStats.totalCalories / 3500}
            color={ACCENT}
            showPercent
            height={12}
          />
          <View style={styles.goalGap} />
          <ProgressBar
            label="Mesafe"
            progress={weeklyStats.totalDistance / 50}
            color="#FF6B6B"
            showPercent
            height={12}
          />
          <View style={styles.goalGap} />
          <ProgressBar
            label="Aktif Günler"
            progress={weeklyStats.activeDays / 7}
            color="#A29BFE"
            showPercent
            height={12}
          />
          <View style={styles.goalGap} />
          <ProgressBar
            label="Antrenman Süresi"
            progress={weeklyStats.totalDuration / 300}
            color="#FDCB6E"
            showPercent
            height={12}
          />
        </Card>

        {/* All-Time Records */}
        <Card style={styles.allTimeCard}>
          <Text style={styles.cardTitle}>Tüm Zamanlar Rekoru</Text>
          <View style={styles.allTimeGrid}>
            {[
              { emoji: '🏋️', label: 'Toplam Antrenman', value: allTimeStats.totalWorkouts.toLocaleString('tr-TR') },
              { emoji: '🔥', label: 'Toplam Kalori', value: `${(allTimeStats.totalCalories / 1000).toFixed(1)}k` },
              { emoji: '📍', label: 'Toplam Mesafe', value: `${allTimeStats.totalDistance} km` },
              { emoji: '⚡', label: 'En Uzun Seri', value: `${allTimeStats.longestStreak} gün` },
            ].map((item) => (
              <View key={item.label} style={styles.allTimeItem}>
                <Text style={styles.allTimeEmoji}>{item.emoji}</Text>
                <Text style={styles.allTimeVal}>{item.value}</Text>
                <Text style={styles.allTimeLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Streak Card */}
        <View style={styles.streakCard}>
          <View style={styles.streakLeft}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <View>
              <Text style={styles.streakTitle}>Mevcut Seriniz</Text>
              <Text style={styles.streakSub}>Momentumu koruyun!</Text>
            </View>
          </View>
          <View style={styles.streakRight}>
            <Text style={styles.streakCount}>{allTimeStats.currentStreak}</Text>
            <Text style={styles.streakUnit}>gün</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  content: { paddingBottom: 48 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  backArrow: { fontSize: 20, color: '#1A202C' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1A202C', letterSpacing: -0.3 },

  heroBanner: {
    backgroundColor: '#1A202C',
    marginHorizontal: 20,
    borderRadius: 26,
    padding: 22,
    marginBottom: 16,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  heroWeek: { fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: '600', marginBottom: 4 },
  heroHeading: { fontSize: 22, fontWeight: '900', color: '#FFF', letterSpacing: -0.5 },
  heroStreakBadge: {
    backgroundColor: '#2D3748',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  heroStreakEmoji: { fontSize: 18 },
  heroStreakVal: { fontSize: 20, fontWeight: '800', color: '#FD9A3E' },
  heroStreakLabel: { fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: '600' },

  heroRow: {
    flexDirection: 'row',
    backgroundColor: '#2D3748',
    borderRadius: 18,
    paddingVertical: 14,
  },
  heroStat: { flex: 1, alignItems: 'center' },
  heroStatVal: { fontSize: 22, fontWeight: '800', color: '#FFF' },
  heroStatLabel: { fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4, fontWeight: '500' },
  heroDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.1)' },

  chartCard: { marginHorizontal: 20, marginBottom: 12 },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A202C',
    marginBottom: 18,
    letterSpacing: -0.2,
  },
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 134,
  },
  barCol: { alignItems: 'center', flex: 1, gap: 4 },
  barCalText: { fontSize: 9, color: '#CBD5E0', fontWeight: '700' },
  barContainer: { height: 100, justifyContent: 'flex-end' },
  bar: { width: 26, borderRadius: 8, minHeight: 4 },
  barDay: { fontSize: 11, color: '#A0AEC0', fontWeight: '600' },
  barDayActive: { color: '#4A5568' },

  goalsCard: { marginHorizontal: 20, marginBottom: 12 },
  goalGap: { height: 14 },

  allTimeCard: { marginHorizontal: 20, marginBottom: 12 },
  allTimeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  allTimeItem: {
    width: '47%',
    backgroundColor: BG,
    borderRadius: 16,
    padding: 14,
  },
  allTimeEmoji: { fontSize: 26, marginBottom: 8 },
  allTimeVal: { fontSize: 22, fontWeight: '900', color: '#1A202C', letterSpacing: -0.5 },
  allTimeLabel: { fontSize: 12, color: '#8E9AAF', marginTop: 3, fontWeight: '500' },

  streakCard: {
    marginHorizontal: 20,
    backgroundColor: '#FFF8EC',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#FED7AA',
  },
  streakLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  streakEmoji: { fontSize: 36 },
  streakTitle: { fontSize: 15, fontWeight: '800', color: '#1A202C' },
  streakSub: { fontSize: 12, color: '#8E9AAF', marginTop: 2 },
  streakRight: { alignItems: 'center' },
  streakCount: { fontSize: 32, fontWeight: '900', color: '#E8712A', lineHeight: 36 },
  streakUnit: { fontSize: 12, color: '#E8712A', fontWeight: '700' },
});
