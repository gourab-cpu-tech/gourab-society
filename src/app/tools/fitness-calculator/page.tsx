import type { Metadata } from "next";
import { FitnessCalculator } from "@/components/FitnessCalculator";

export const metadata: Metadata = {
  title: "Fitness Calculator | Calories, BMI & Protein",
  description:
    "Calculate BMI, BMR, TDEE, calorie targets, and daily protein goals with the Gourab Society fitness calculator.",
};

export default function Page() {
  return <FitnessCalculator />;
}
