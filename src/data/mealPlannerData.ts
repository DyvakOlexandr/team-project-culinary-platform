export interface Meal {
  id: string;
  title: string;
  image: string;
}

export interface DayPlan {
  day: string;
  meals: Meal[];
}

export const daysOfWeek = [
  "Понеділок",
  "Вівторок",
  "Середа",
  "Четвер",
  "П’ятниця",
  "Субота",
  "Неділя",
];
