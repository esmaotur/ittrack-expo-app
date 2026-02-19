export interface Activity {
  id: string;
  title: string;
  category: string;
  calories: number;
  duration: number; // dakika
  distance: number; // km
  difficulty: 'Başlangıç' | 'Orta' | 'İleri';
  description: string;
  emoji: string;
  color: string;
}

export const activities: Activity[] = [
  {
    id: '1',
    title: 'Sabah Koşusu',
    category: 'Kardiyo',
    calories: 420,
    duration: 35,
    distance: 5.2,
    difficulty: 'Orta',
    description:
      'Güne enerjik bir sabah koşusuyla başla. Kardiyovasküler dayanıklılığını artırır ve metabolizmanı tüm gün boyunca hızlandırır.',
    emoji: '🏃',
    color: '#FF6B6B',
  },
  {
    id: '2',
    title: 'Bisiklet Sprinteri',
    category: 'Kardiyo',
    calories: 580,
    duration: 45,
    distance: 18.4,
    difficulty: 'İleri',
    description:
      'Sınırlarını zorlamak için tasarlanmış yüksek yoğunluklu bisiklet sprint antrenmanı. Interval tekniğiyle hız ve bacak gücünü geliştir.',
    emoji: '🚴',
    color: '#4ECDC4',
  },
  {
    id: '3',
    title: 'Yoga Akışı',
    category: 'Esneklik',
    calories: 180,
    duration: 50,
    distance: 0,
    difficulty: 'Başlangıç',
    description:
      'Esnekliği, duruşu ve zihinsel netliği artırmak için sakinleştirici bir yoga akışı. İyileşme günleri veya sabah ritüeli olarak idealdir.',
    emoji: '🧘',
    color: '#A29BFE',
  },
  {
    id: '4',
    title: 'HIIT Antrenmanı',
    category: 'Güç',
    calories: 650,
    duration: 30,
    distance: 0,
    difficulty: 'İleri',
    description:
      'Güç ve kardiyo egzersizlerini birleştiren yüksek yoğunluklu interval antrenmanı. Minimum sürede maksimum kalori yakar.',
    emoji: '💪',
    color: '#FD79A8',
  },
  {
    id: '5',
    title: 'Yüzme Turları',
    category: 'Kardiyo',
    calories: 500,
    duration: 40,
    distance: 1.5,
    difficulty: 'Orta',
    description:
      'Birden fazla yüzme tekniğini kapsayan tam vücut antrenmanı. Tüm kas gruplarını çalıştıran düşük darbeli mükemmel kardiyo.',
    emoji: '🏊',
    color: '#00CEC9',
  },
  {
    id: '6',
    title: 'Ağırlık Antrenmanı',
    category: 'Güç',
    calories: 380,
    duration: 55,
    distance: 0,
    difficulty: 'Orta',
    description:
      'Tüm ana kas gruplarını hedef alan kapsamlı güç antrenmanı. Maksimum kas katılımı için bileşik hareketlere odaklanır.',
    emoji: '🏋️',
    color: '#E17055',
  },
  {
    id: '7',
    title: 'Doğa Yürüyüşü',
    category: 'Açık Hava',
    calories: 340,
    duration: 90,
    distance: 8.0,
    difficulty: 'Başlangıç',
    description:
      'Doğa patikalarında manzaralı yürüyüş. Dayanıklılık oluşturmak ve dışarının tadını çıkarmak için harika düşük yoğunluklu aktivite.',
    emoji: '🥾',
    color: '#55EFC4',
  },
  {
    id: '8',
    title: 'Atlama İpi',
    category: 'Kardiyo',
    calories: 450,
    duration: 25,
    distance: 0,
    difficulty: 'Orta',
    description:
      'Koordinasyon, çeviklik ve kardiyovasküler sağlığı geliştiren yüksek enerjili atlama ipi seansı. Her yerde yapılabilecek kompakt antrenman.',
    emoji: '🤸',
    color: '#FDCB6E',
  },
];
