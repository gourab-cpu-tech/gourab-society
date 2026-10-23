export type UnitSystem = "metric" | "imperial";
export type Sex = "male" | "female";
export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "high"
  | "very-high";
export type Goal = "maintain" | "build" | "lose" | "fitness";

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  high: 1.725,
  "very-high": 1.9,
};

export const GOAL_LABELS: Record<Goal, string> = {
  maintain: "Maintain Weight",
  build: "Build Muscle",
  lose: "Lose Fat",
  fitness: "Improve General Fitness",
};

export type FitnessForm = {
  unit: UnitSystem;
  age: string;
  sex: Sex | "";
  height: string;
  weight: string;
  activity: ActivityLevel;
  goal: Goal;
  bodyFat: string;
  trainingFrequency: string;
};

export type CalculationResult = {
  bmi: number;
  bmr: number;
  tdee: number;
  targetCalories: number;
  proteinMin: number;
  proteinMax: number;
  leanBodyMass: number | null;
  katchBmr: number | null;
  warning: string | null;
};

export function normalizeWeightKg(weight: number, unit: UnitSystem) {
  return unit === "metric" ? weight : weight * 0.45359237;
}

export function normalizeHeightCm(height: number, unit: UnitSystem) {
  return unit === "metric" ? height : height * 2.54;
}

export function calculateBmi(weightKg: number, heightCm: number) {
  const heightM = heightCm / 100;
  return heightM > 0 ? weightKg / (heightM * heightM) : 0;
}

export function calculateBmrMifflinStJeor(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: Sex,
) {
  if (sex === "male") {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  }

  return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
}

export function calculateTdee(bmr: number, activityLevel: ActivityLevel) {
  return bmr * ACTIVITY_MULTIPLIERS[activityLevel];
}

export function calculateGoalCalories(tdee: number, goal: Goal) {
  switch (goal) {
    case "maintain":
      return tdee;
    case "build":
      return tdee + 200;
    case "lose":
      return Math.max(tdee - 500, 1200);
    case "fitness":
      return tdee + 100;
    default:
      return tdee;
  }
}

export function calculateProteinRange(weightKg: number, goal: Goal) {
  const targets: Record<Goal, [number, number]> = {
    maintain: [1.6, 2.2],
    build: [1.8, 2.4],
    lose: [1.8, 2.4],
    fitness: [1.6, 2.1],
  };

  const [minFactor, maxFactor] = targets[goal];

  return {
    min: weightKg * minFactor,
    max: weightKg * maxFactor,
  };
}

export function calculateLeanBodyMass(weightKg: number, bodyFat: number) {
  if (bodyFat <= 0 || bodyFat >= 100) {
    return null;
  }

  return weightKg * (1 - bodyFat / 100);
}

export function calculateKatchMcArdleBmr(weightKg: number, bodyFat: number) {
  const leanMass = calculateLeanBodyMass(weightKg, bodyFat);

  if (!leanMass) {
    return null;
  }

  return 370 + 21.6 * leanMass;
}

export function getGoalWarning(targetCalories: number, weightKg: number) {
  if (targetCalories < 1800) {
    return "This target is very low for many adults and may not be sustainable. Consider a higher intake and check with a qualified professional if you feel weak, dizzy, or unusually fatigued.";
  }

  if (targetCalories < 2200 && weightKg > 90) {
    return "This plan is relatively low for your body size. A small increase may better support performance and recovery.";
  }

  return null;
}

export function roundValue(value: number, digits = 1) {
  return Number(value.toFixed(digits));
}

export function calculateFitnessResults(form: FitnessForm): CalculationResult {
  const age = Number(form.age);
  const height = Number(form.height);
  const weight = Number(form.weight);
  const bodyFat = form.bodyFat.trim() === "" ? null : Number(form.bodyFat);
  const normalizedWeight = normalizeWeightKg(weight, form.unit);
  const normalizedHeight = normalizeHeightCm(height, form.unit);

  const bmi = calculateBmi(normalizedWeight, normalizedHeight);
  const bmr = calculateBmrMifflinStJeor(
    normalizedWeight,
    normalizedHeight,
    age,
    form.sex as Sex,
  );
  const tdee = calculateTdee(bmr, form.activity);
  const targetCalories = calculateGoalCalories(tdee, form.goal);
  const protein = calculateProteinRange(normalizedWeight, form.goal);
  const leanBodyMass = bodyFat !== null ? calculateLeanBodyMass(normalizedWeight, bodyFat) : null;
  const katchBmr = bodyFat !== null ? calculateKatchMcArdleBmr(normalizedWeight, bodyFat) : null;

  return {
    bmi: roundValue(bmi, 1),
    bmr: roundValue(bmr, 0),
    tdee: roundValue(tdee, 0),
    targetCalories: roundValue(targetCalories, 0),
    proteinMin: roundValue(protein.min, 0),
    proteinMax: roundValue(protein.max, 0),
    leanBodyMass: leanBodyMass !== null ? roundValue(leanBodyMass, 1) : null,
    katchBmr: katchBmr !== null ? roundValue(katchBmr, 0) : null,
    warning: getGoalWarning(targetCalories, normalizedWeight),
  };
}
