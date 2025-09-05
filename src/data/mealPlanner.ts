export interface Meal {
  id: string;
  title: string;
  image?: string;
}

export interface DayPlan {
  date: Date;
  meals: Meal[];
}
