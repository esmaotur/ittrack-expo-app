export interface WeeklyStats {
  week: string;
  totalCalories: number;
  totalDistance: number;
  totalDuration: number;
  activeDays: number;
  dailyCalories: { day: string; calories: number }[];
}

export const weeklyStats: WeeklyStats = {
  week: '10 Şub – 16 Şub 2026',
  totalCalories: 2840,
  totalDistance: 32.6,
  totalDuration: 275,
  activeDays: 5,
  dailyCalories: [
    { day: 'Pzt', calories: 420 },
    { day: 'Sal', calories: 580 },
    { day: 'Çar', calories: 0 },
    { day: 'Per', calories: 650 },
    { day: 'Cum', calories: 380 },
    { day: 'Cmt', calories: 500 },
    { day: 'Paz', calories: 310 },
  ],
};

export const allTimeStats = {
  totalWorkouts: 148,
  totalCalories: 62400,
  totalDistance: 712,
  longestStreak: 14,
  currentStreak: 5,
};
