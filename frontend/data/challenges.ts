export interface Challenge {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  duration: string;
  difficulty: 'Başlangıç' | 'Orta' | 'İleri';
  participants: number;
  emoji: string;
  color: string;
  steps: string[];
  comparison: {
    label: string;
    you: number;
    average: number;
    unit: string;
  }[];
}

export const challenges: Challenge[] = [
  {
    id: '1',
    title: '30 Günlük Koşu Serisi',
    description: '30 gün boyunca her gün en az 1 mil koş.',
    longDescription:
      '30 Günlük Koşu Serisi ile kırılmaz bir koşu alışkanlığı oluştur. Her gün 1 mil mi yoksa maraton mu koştuğun önemli değil — önemli olan tutarlılık. İlerlemenizi takip et ve her gösterdiğin performansı kutla.',
    duration: '30 Gün',
    difficulty: 'Orta',
    participants: 2847,
    emoji: '🏃',
    color: '#FF6B6B',
    steps: [
      'Meydan okumaya kaydol ve başlangıç tarihini belirle',
      'Her gün minimum 1,6 km (1 mil) koş',
      'Koşunu 24 saat içinde uygulamaya kaydet',
      'Dinlenme günleri YOK — tutarlılık anahtardır',
      'Rozetini kazanmak için 30 günü tamamla',
    ],
    comparison: [
      { label: 'Ortalama Günlük Mesafe', you: 3.2, average: 2.1, unit: 'km' },
      { label: 'Yakılan Kalori', you: 280, average: 190, unit: 'kcal' },
      { label: 'Hız', you: 5.4, average: 6.2, unit: 'dak/km' },
    ],
  },
  {
    id: '2',
    title: 'Günlük 10.000 Adım',
    description: 'İki hafta boyunca her gün 10.000 adım at.',
    longDescription:
      'Klasik 10.000 adım meydan okuması. 14 art arda gün boyunca günlük hareketin altın standardına ulaş. Adımlarını saymak için telefon veya fitness takipçisi kullan ve sürdürülebilir aktif bir yaşam tarzı oluştur.',
    duration: '14 Gün',
    difficulty: 'Başlangıç',
    participants: 5912,
    emoji: '👟',
    color: '#4ECDC4',
    steps: [
      'Cihazında veya fitness uygulamasında adım takibini etkinleştir',
      'Her gün 10.000 adım hedefle',
      'Merdivenleri kullan, öğle aralarında yürü veya akşam yürüyüşleri ekle',
      'Günlük adım sayını uygulamaya kaydet',
      'Rozetini kazanmak için 14 günü tamamla',
    ],
    comparison: [
      { label: 'Ort. Günlük Adım', you: 10800, average: 9200, unit: 'adım' },
      { label: 'Katedilen Mesafe', you: 7.6, average: 6.4, unit: 'km' },
      { label: 'Aktif Dakika', you: 85, average: 70, unit: 'dak' },
    ],
  },
  {
    id: '3',
    title: 'HIIT Canavar Modu',
    description: '30 günde 20 HIIT seansı — sınırlarını zorla.',
    longDescription:
      'Kalori yakımını maksimuma çıkarmak ve patlayıcı form geliştirmek isteyenler için tasarlandı. 30 günde 20 HIIT seansı tamamla — haftada yaklaşık 5 seans. Her seans en az 20 dakika yüksek yoğunluklu interval olmalı.',
    duration: '30 Gün',
    difficulty: 'İleri',
    participants: 1234,
    emoji: '💪',
    color: '#FD79A8',
    steps: [
      'Her seans öncesi 5 dakika ısın',
      'Seans başına en az 20 dakika HIIT yap',
      '30 gün içinde 20 seansı hedefle',
      'Her antrenman için kalp hızı verilerini kaydet',
      'Her seans sonrası soğuma ve esnetme yap',
    ],
    comparison: [
      { label: 'Seans Başına Kalori', you: 520, average: 430, unit: 'kcal' },
      { label: 'Ort. Kalp Hızı', you: 162, average: 155, unit: 'bpm' },
      { label: 'Tamamlanan Seans', you: 18, average: 14, unit: 'seans' },
    ],
  },
  {
    id: '4',
    title: 'Esneklik ve Denge',
    description: '21 gün boyunca günlük yoga ve germe.',
    longDescription:
      '21 günlük günlük yoga ve germe ile esnekliğini, dengeyi ve zihinsel refahını geliştir. Her seans 15 ila 45 dakika arasında değişir ve temel pozisyonlardan ileri düzeye ilerler.',
    duration: '21 Gün',
    difficulty: 'Başlangıç',
    participants: 3401,
    emoji: '🧘',
    color: '#A29BFE',
    steps: [
      'Her sabah veya akşam 15–45 dakika ayır',
      'Uygulamadaki günlük yoga rutinini takip et',
      'Esneklikten önce nefes almaya ve doğru forma odaklan',
      'İlerleme fotoğraflarını 1., 7., 14. ve 21. günlerde çek',
      'Rozetini açmak için 21 günün tamamını bitir',
    ],
    comparison: [
      { label: 'Esneklik Puanı', you: 72, average: 58, unit: 'puan' },
      { label: 'Kayıtlı Seans', you: 19, average: 16, unit: 'seans' },
      { label: 'Ort. Süre', you: 35, average: 28, unit: 'dak' },
    ],
  },
  {
    id: '5',
    title: 'Bisiklet Yüzyılı',
    description: 'Bir haftada toplamda 100 km pedal çevir.',
    longDescription:
      'Bisikletinle sadece 7 günde 100 kilometre kat et. Açık hava sürüşleri veya sabit bisiklet fark etmez, her kilometre önemli. Sürüşlerini takip et, çabayı yönet ve 100 km bitiş çizgisini geç.',
    duration: '7 Gün',
    difficulty: 'İleri',
    participants: 879,
    emoji: '🚴',
    color: '#00CEC9',
    steps: [
      'Haftalık sürüşlerini 100 km\'ye ulaşacak şekilde planla',
      'Her sürüşü tamamladıktan hemen sonra kaydet',
      'Kısa günlük sürüşleri uzun hafta sonu sürüşleriyle karıştır',
      'Hidrasyona dikkat et ve beslenmeni düzenli tut',
      'Rozetini kazanmak için 7 gün içinde 100 km\'yi tamamla',
    ],
    comparison: [
      { label: 'Katedilen Mesafe', you: 88, average: 72, unit: 'km' },
      { label: 'Ort. Hız', you: 24, average: 20, unit: 'km/s' },
      { label: 'Yakılan Kalori', you: 2800, average: 2300, unit: 'kcal' },
    ],
  },
];
