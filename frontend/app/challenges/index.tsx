import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/Card';
import { challenges, Challenge } from '@/data/challenges';

const BG = '#F0F2F8';
const ACCENT = '#A29BFE';

const FILTERS = ['Tümü', 'Başlangıç', 'Orta', 'İleri'];

export default function ChallengesScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('Tümü');

  const filtered =
    filter === 'Tümü' ? challenges : challenges.filter((c) => c.difficulty === filter);

  const renderItem = ({ item }: { item: Challenge }) => (
    <Card
      style={styles.challengeCard}
      onPress={() => router.push(`/challenges/${item.id}` as any)}>
      <View style={styles.cardTop}>
        <View style={[styles.iconWrap, { backgroundColor: item.color + '20' }]}>
          <Text style={styles.emoji}>{item.emoji}</Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.challengeTitle}>{item.title}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaChip}>
              <Text style={styles.metaChipText}>⏳ {item.duration}</Text>
            </View>
            <View style={[styles.diffBadge, difficultyStyle(item.difficulty)]}>
              <Text style={[styles.diffText, difficultyTextStyle(item.difficulty)]}>
                {item.difficulty}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.challengeDesc} numberOfLines={2}>{item.description}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.participantText}>
          👥 {item.participants.toLocaleString('tr-TR')} katılımcı
        </Text>
        <View style={[styles.viewBtn, { backgroundColor: item.color }]}>
          <Text style={styles.viewBtnText}>İncele →</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meydan Okumalar</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <View>
          <Text style={styles.bannerTitle}>🏆 Sınırlarını Zorla</Text>
          <Text style={styles.bannerSub}>{challenges.length} meydan okuma seni bekliyor</Text>
        </View>
        <View style={styles.bannerBadge}>
          <Text style={styles.bannerBadgeText}>{challenges.length}</Text>
          <Text style={styles.bannerBadgeLabel}>aktif</Text>
        </View>
      </View>

      {/* Filter Chips */}
      <FlatList
        horizontal
        data={FILTERS}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterChip,
              filter === item && { backgroundColor: ACCENT, borderColor: ACCENT },
            ]}
            onPress={() => setFilter(item)}>
            <Text style={[styles.filterText, filter === item && { color: '#FFF' }]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Challenges List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🏅</Text>
            <Text style={styles.emptyTitle}>Meydan okuma bulunamadı</Text>
            <Text style={styles.emptySubtitle}>Farklı bir zorluk seviyesi dene</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

function difficultyStyle(d: string) {
  if (d === 'Başlangıç') return { backgroundColor: '#E6FFFA' };
  if (d === 'İleri') return { backgroundColor: '#FFF0F0' };
  return { backgroundColor: '#EBF4FF' };
}
function difficultyTextStyle(d: string) {
  if (d === 'Başlangıç') return { color: '#38B2AC' };
  if (d === 'İleri') return { color: '#E53E3E' };
  return { color: '#3182CE' };
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },

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

  banner: {
    backgroundColor: '#1A202C',
    marginHorizontal: 20,
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerTitle: { fontSize: 18, fontWeight: '900', color: '#FFF', marginBottom: 4 },
  bannerSub: { fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: '500' },
  bannerBadge: {
    backgroundColor: '#2D3748',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  bannerBadgeText: { fontSize: 24, fontWeight: '900', color: ACCENT },
  bannerBadgeLabel: { fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: '600' },

  filterList: { paddingHorizontal: 20, paddingVertical: 14, gap: 8 },
  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  filterText: { fontSize: 13, fontWeight: '700', color: '#4A5568' },

  list: { paddingHorizontal: 20, paddingBottom: 48, gap: 12 },
  challengeCard: { padding: 16 },
  cardTop: { flexDirection: 'row', gap: 12, marginBottom: 10 },
  iconWrap: { width: 54, height: 54, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 26 },
  cardInfo: { flex: 1, justifyContent: 'center' },
  challengeTitle: { fontSize: 16, fontWeight: '800', color: '#1A202C', marginBottom: 6, letterSpacing: -0.2 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: '#F0F2F8',
  },
  metaChipText: { fontSize: 12, color: '#4A5568', fontWeight: '600' },
  diffBadge: { paddingHorizontal: 9, paddingVertical: 3, borderRadius: 8 },
  diffText: { fontSize: 11, fontWeight: '700' },
  challengeDesc: { fontSize: 13, color: '#4A5568', lineHeight: 19, marginBottom: 14 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  participantText: { fontSize: 12, color: '#8E9AAF', fontWeight: '500' },
  viewBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 11 },
  viewBtnText: { color: '#FFF', fontSize: 13, fontWeight: '800' },

  emptyState: { alignItems: 'center', paddingTop: 70, gap: 10 },
  emptyEmoji: { fontSize: 52 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: '#1A202C' },
  emptySubtitle: { fontSize: 14, color: '#8E9AAF' },
});
