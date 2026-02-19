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
import { challenges } from '@/data/challenges';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';

const BG = '#F0F2F8';

export default function ChallengeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [joined, setJoined] = useState(false);

  const challenge = challenges.find((c) => c.id === id);

  if (!challenge) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundEmoji}>🤷</Text>
          <Text style={styles.notFoundText}>Meydan okuma bulunamadı</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backLinkText}>Geri dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: challenge.color }]}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.heroContent}>
            <Text style={styles.heroEmoji}>{challenge.emoji}</Text>
            <Text style={styles.heroTitle}>{challenge.title}</Text>
            <View style={styles.heroMeta}>
              <View style={styles.metaPill}>
                <Text style={styles.metaPillText}>⏳ {challenge.duration}</Text>
              </View>
              <View style={styles.metaPill}>
                <Text style={styles.metaPillText}>{challenge.difficulty}</Text>
              </View>
              <View style={styles.metaPill}>
                <Text style={styles.metaPillText}>
                  👥 {challenge.participants.toLocaleString('tr-TR')}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Description */}
        <Card style={styles.descCard}>
          <Text style={styles.sectionTitle}>Bu Meydan Okuma Hakkında</Text>
          <Text style={styles.description}>{challenge.longDescription}</Text>
        </Card>

        {/* Steps */}
        <Card style={styles.stepsCard}>
          <Text style={styles.sectionTitle}>Nasıl Tamamlanır?</Text>
          {challenge.steps.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={[styles.stepNum, { backgroundColor: challenge.color }]}>
                <Text style={styles.stepNumText}>{i + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </Card>

        {/* Comparison */}
        <Card style={styles.compCard}>
          <Text style={styles.sectionTitle}>Sen vs. Ortalama</Text>
          <Text style={styles.compSubtitle}>Son katılımcılara göre</Text>
          {challenge.comparison.map((row) => (
            <View key={row.label} style={styles.compRow}>
              <Text style={styles.compLabel}>{row.label}</Text>
              <View style={styles.compBars}>
                <View style={styles.compBarRow}>
                  <Text style={styles.compBarLabel}>Sen</Text>
                  <View style={styles.compBarWrap}>
                    <ProgressBar
                      progress={row.you / Math.max(row.you, row.average)}
                      color={challenge.color}
                      height={8}
                    />
                  </View>
                  <Text style={[styles.compVal, { color: challenge.color }]}>
                    {row.you} {row.unit}
                  </Text>
                </View>
                <View style={styles.compBarRow}>
                  <Text style={styles.compBarLabel}>Ort</Text>
                  <View style={styles.compBarWrap}>
                    <ProgressBar
                      progress={row.average / Math.max(row.you, row.average)}
                      color="#CBD5E0"
                      height={8}
                    />
                  </View>
                  <Text style={styles.compValAvg}>
                    {row.average} {row.unit}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </Card>

        {/* Reward */}
        <View style={[styles.rewardCard, { borderColor: challenge.color + '40' }]}>
          <Text style={styles.rewardEmoji}>🏅</Text>
          <View style={styles.rewardInfo}>
            <Text style={styles.rewardTitle}>Tamamla ve Kazan</Text>
            <Text style={styles.rewardSub}>
              Bu meydan okumayı bitirerek özel{' '}
              <Text style={{ color: challenge.color, fontWeight: '800' }}>
                {challenge.title}
              </Text>{' '}
              rozetini kazan
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* CTA Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.joinBtn, { backgroundColor: joined ? '#48BB78' : challenge.color }]}
          onPress={() => setJoined(!joined)}
          activeOpacity={0.85}>
          <Text style={styles.joinBtnText}>
            {joined ? '✓ Meydan Okuma Kabul Edildi!' : 'Meydan Okumaya Katıl'}
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
  backLinkText: { color: '#A29BFE', fontWeight: '700', fontSize: 15 },

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
  heroEmoji: { fontSize: 64, marginBottom: 10 },
  heroTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  heroMeta: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  metaPill: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 6,
  },
  metaPillText: { color: '#FFF', fontSize: 12, fontWeight: '700' },

  descCard: { margin: 20, marginBottom: 12 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A202C',
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  description: { fontSize: 14, lineHeight: 23, color: '#4A5568' },

  stepsCard: { marginHorizontal: 20, marginBottom: 12 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepNumText: { color: '#FFF', fontWeight: '900', fontSize: 13 },
  stepText: { flex: 1, fontSize: 14, color: '#4A5568', lineHeight: 21 },

  compCard: { marginHorizontal: 20, marginBottom: 12 },
  compSubtitle: { fontSize: 12, color: '#8E9AAF', marginBottom: 16, marginTop: -8, fontWeight: '500' },
  compRow: { marginBottom: 16 },
  compLabel: { fontSize: 13, fontWeight: '700', color: '#4A5568', marginBottom: 8 },
  compBars: { gap: 6 },
  compBarRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  compBarLabel: { fontSize: 11, color: '#8E9AAF', width: 26, fontWeight: '600' },
  compBarWrap: { flex: 1 },
  compVal: { fontSize: 12, fontWeight: '800', width: 64, textAlign: 'right' },
  compValAvg: { fontSize: 12, color: '#8E9AAF', width: 64, textAlign: 'right', fontWeight: '600' },

  rewardCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: '#FFFBF0',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1.5,
  },
  rewardEmoji: { fontSize: 42 },
  rewardInfo: { flex: 1 },
  rewardTitle: { fontSize: 15, fontWeight: '800', color: '#1A202C', marginBottom: 5 },
  rewardSub: { fontSize: 13, color: '#4A5568', lineHeight: 19 },

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
