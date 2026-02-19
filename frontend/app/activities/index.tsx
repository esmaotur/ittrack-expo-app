import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/Card';
import { activities, Activity } from '@/data/activities';

const ACCENT = '#FF6B6B';
const BG = '#F0F2F8';

const CATEGORIES = ['Tümü', 'Kardiyo', 'Güç', 'Esneklik', 'Açık Hava'];

export default function ActivitiesScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [search, setSearch] = useState('');

  const filtered = activities.filter((a) => {
    const matchesCat = selectedCategory === 'Tümü' || a.category === selectedCategory;
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const renderItem = ({ item }: { item: Activity }) => (
    <Card
      style={styles.activityCard}
      onPress={() => router.push(`/activities/${item.id}` as any)}>
      <View style={styles.cardRow}>
        <View style={[styles.iconWrap, { backgroundColor: item.color + '20' }]}>
          <Text style={styles.emoji}>{item.emoji}</Text>
        </View>
        <View style={styles.info}>
          <View style={styles.topRow}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <View style={[styles.diffBadge, difficultyStyle(item.difficulty)]}>
              <Text style={[styles.diffText, difficultyTextStyle(item.difficulty)]}>
                {item.difficulty}
              </Text>
            </View>
          </View>
          <Text style={styles.category}>{item.category}</Text>
          <View style={styles.statsRow}>
            <View style={[styles.statPill, { backgroundColor: item.color + '15' }]}>
              <Text style={[styles.statPillText, { color: item.color }]}>
                🔥 {item.calories} kcal
              </Text>
            </View>
            <View style={styles.statPill}>
              <Text style={styles.statPillText}>⏱ {item.duration} dak</Text>
            </View>
            {item.distance > 0 && (
              <View style={styles.statPill}>
                <Text style={styles.statPillText}>📍 {item.distance} km</Text>
              </View>
            )}
          </View>
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
        <Text style={styles.headerTitle}>Aktiviteler</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Aktivite ara..."
          placeholderTextColor="#A0AEC0"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filter */}
      <FlatList
        horizontal
        data={CATEGORIES}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterChip,
              selectedCategory === item && { backgroundColor: ACCENT, borderColor: ACCENT },
            ]}
            onPress={() => setSelectedCategory(item)}>
            <Text
              style={[
                styles.filterText,
                selectedCategory === item && { color: '#FFF' },
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Count */}
      <Text style={styles.resultCount}>{filtered.length} aktivite bulundu</Text>

      {/* Activity List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🏋️</Text>
            <Text style={styles.emptyTitle}>Aktivite bulunamadı</Text>
            <Text style={styles.emptySubtitle}>
              Farklı bir kategori veya arama terimi dene
            </Text>
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

  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 4,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, height: 46, fontSize: 15, color: '#1A202C' },
  clearBtn: { fontSize: 14, color: '#A0AEC0', paddingLeft: 8 },

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

  resultCount: {
    fontSize: 12,
    color: '#A0AEC0',
    fontWeight: '600',
    paddingHorizontal: 22,
    marginBottom: 10,
  },

  list: { paddingHorizontal: 20, paddingBottom: 48, gap: 10 },
  activityCard: { padding: 14 },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  iconWrap: { width: 58, height: 58, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 28 },
  info: { flex: 1 },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  title: { fontSize: 15, fontWeight: '700', color: '#1A202C', flex: 1 },
  diffBadge: { paddingHorizontal: 9, paddingVertical: 3, borderRadius: 8, marginLeft: 8 },
  diffText: { fontSize: 11, fontWeight: '700' },
  category: { fontSize: 12, color: '#8E9AAF', marginBottom: 8, fontWeight: '500' },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  statPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: '#F0F2F8',
  },
  statPillText: { fontSize: 11, color: '#4A5568', fontWeight: '600' },

  emptyState: { alignItems: 'center', paddingTop: 70, gap: 10 },
  emptyEmoji: { fontSize: 52 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: '#1A202C' },
  emptySubtitle: { fontSize: 14, color: '#8E9AAF', textAlign: 'center' },
});
