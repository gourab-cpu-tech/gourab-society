"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  GOAL_LABELS,
  calculateFitnessResults,
  type ActivityLevel,
  type CalculationResult,
  type FitnessForm,
  type Goal,
} from "@/lib/fitnessCalculator";

const initialForm: FitnessForm = {
  unit: "metric",
  age: "",
  sex: "",
  height: "",
  weight: "",
  activity: "moderate",
  goal: "maintain",
  bodyFat: "",
  trainingFrequency: "",
};

type FormErrors = Partial<Record<keyof FitnessForm, string>>;

const activityOptions: { value: ActivityLevel; label: string; description: string }[] = [
  { value: "sedentary", label: "Sedentary", description: "Mostly sitting" },
  { value: "light", label: "Light", description: "1–3 workouts / week" },
  { value: "moderate", label: "Moderate", description: "3–5 workouts / week" },
  { value: "high", label: "High", description: "6 workouts / week" },
  { value: "very-high", label: "Very High", description: "Heavy training + manual work" },
];

const goalOptions: { value: Goal; label: string }[] = [
  { value: "maintain", label: "Maintain Weight" },
  { value: "build", label: "Build Muscle" },
  { value: "lose", label: "Lose Fat" },
  { value: "fitness", label: "Improve General Fitness" },
];

function validateForm(nextForm: FitnessForm) {
  const errors: FormErrors = {};

  const age = Number(nextForm.age);
  if (nextForm.age.trim() === "" || Number.isNaN(age) || age < 18 || age > 100) {
    errors.age = "Please enter an adult age between 18 and 100.";
  }

  if (!nextForm.sex) {
    errors.sex = "Please select your sex to use the Mifflin-St Jeor equation.";
  }

  const height = Number(nextForm.height);
  if (nextForm.height.trim() === "" || Number.isNaN(height) || height <= 0) {
    errors.height = "Height is required.";
  }

  const weight = Number(nextForm.weight);
  if (nextForm.weight.trim() === "" || Number.isNaN(weight) || weight <= 0) {
    errors.weight = "Weight is required.";
  }

  if (nextForm.bodyFat.trim() !== "") {
    const bodyFat = Number(nextForm.bodyFat);
    if (Number.isNaN(bodyFat) || bodyFat < 0 || bodyFat >= 100) {
      errors.bodyFat = "Body-fat percentage should be between 0 and 100.";
    }
  }

  if (nextForm.trainingFrequency.trim() !== "") {
    const trainingFrequency = Number(nextForm.trainingFrequency);
    if (Number.isNaN(trainingFrequency) || trainingFrequency < 0 || trainingFrequency > 7) {
      errors.trainingFrequency = "Training frequency should be between 0 and 7 days per week.";
    }
  }

  return errors;
}

function formatNumber(value: number | null, digits = 0) {
  if (value === null || Number.isNaN(value)) {
    return "—";
  }

  return value.toLocaleString(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
}

export function FitnessCalculator() {
  const [form, setForm] = useState<FitnessForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [result, setResult] = useState<CalculationResult | null>(null);

  const hasBodyFatValue = form.bodyFat.trim() !== "" && !Number.isNaN(Number(form.bodyFat));

  const selectedGoalText = useMemo(() => GOAL_LABELS[form.goal], [form.goal]);

  const handleFieldChange = (field: keyof FitnessForm, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setResult(null);
      return;
    }

    setResult(calculateFitnessResults(form));
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setResult(null);
  };

  const currentWeightUnit = form.unit === "metric" ? "kg" : "lb";
  const currentHeightUnit = form.unit === "metric" ? "cm" : "in";

  return (
    <main className="fitness-page">
      <header className="fitness-header">
        <nav className="fitness-navbar" aria-label="Main navigation">
          <Link className="brand" href="/" aria-label="Gourab Society home">
            <span className="brand-mark">GS</span>
            <span className="brand-name">Gourab Society</span>
          </Link>

          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/knowledge">Knowledge Hub</Link>
            <Link href="/tools/fitness-calculator" aria-current="page" className="is-active">
              Fitness Tools
            </Link>
            <Link href="/store">Store</Link>
            <Link href="/about">About</Link>
          </div>

          <Link className="nav-cta" href="#calculator-form">
            Enter the Society
          </Link>
        </nav>
      </header>

      <section className="fitness-hero">
        <div className="fitness-hero-inner">
          <p className="eyebrow">
            <span />
            Fitness tools
          </p>

          <h1>Your Body. Your Numbers.</h1>

          <p className="fitness-hero-copy">
            Understand your calorie needs, daily protein target, and fitness metrics with one simple calculator.
          </p>
        </div>
      </section>

      <section className="fitness-shell" id="calculator-form">
        <div className="fitness-layout">
          <form className="fitness-card fitness-form" onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label className="field-label">Unit system</label>
              <div className="segmented-control" role="radiogroup" aria-label="Unit system selection">
                <button
                  type="button"
                  className={form.unit === "metric" ? "segment is-selected" : "segment"}
                  aria-pressed={form.unit === "metric"}
                  onClick={() => handleFieldChange("unit", "metric")}
                >
                  Metric
                </button>
                <button
                  type="button"
                  className={form.unit === "imperial" ? "segment is-selected" : "segment"}
                  aria-pressed={form.unit === "imperial"}
                  onClick={() => handleFieldChange("unit", "imperial")}
                >
                  Imperial
                </button>
              </div>
            </div>

            <div className="field-grid">
              <label className="field">
                <span>Age</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={18}
                  max={100}
                  value={form.age}
                  onChange={(event) => handleFieldChange("age", event.target.value)}
                  aria-invalid={Boolean(errors.age)}
                  aria-describedby={errors.age ? "age-error" : undefined}
                  placeholder="28"
                />
                {errors.age ? <small id="age-error">{errors.age}</small> : null}
              </label>

              <label className="field">
                <span>Sex</span>
                <select
                  value={form.sex}
                  onChange={(event) => handleFieldChange("sex", event.target.value)}
                  aria-invalid={Boolean(errors.sex)}
                  aria-describedby={errors.sex ? "sex-error" : undefined}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <small className="field-note">The Mifflin-St Jeor formula uses sex-specific coefficients.</small>
                {errors.sex ? <small id="sex-error">{errors.sex}</small> : null}
              </label>
            </div>

            <div className="field-grid">
              <label className="field">
                <span>Height ({currentHeightUnit})</span>
                <input
                  type="number"
                  min={0}
                  step="0.1"
                  value={form.height}
                  onChange={(event) => handleFieldChange("height", event.target.value)}
                  aria-invalid={Boolean(errors.height)}
                  aria-describedby={errors.height ? "height-error" : undefined}
                  placeholder={form.unit === "metric" ? "178" : "70"}
                />
                {errors.height ? <small id="height-error">{errors.height}</small> : null}
              </label>

              <label className="field">
                <span>Weight ({currentWeightUnit})</span>
                <input
                  type="number"
                  min={0}
                  step="0.1"
                  value={form.weight}
                  onChange={(event) => handleFieldChange("weight", event.target.value)}
                  aria-invalid={Boolean(errors.weight)}
                  aria-describedby={errors.weight ? "weight-error" : undefined}
                  placeholder={form.unit === "metric" ? "78" : "172"}
                />
                {errors.weight ? <small id="weight-error">{errors.weight}</small> : null}
              </label>
            </div>

            <div className="field-group">
              <label className="field-label">Activity level</label>
              <div className="radio-grid">
                {activityOptions.map((option) => (
                  <label
                    className={form.activity === option.value ? "choice is-selected" : "choice"}
                    key={option.value}
                  >
                    <input
                      type="radio"
                      name="activity"
                      value={option.value}
                      checked={form.activity === option.value}
                      onChange={(event) => handleFieldChange("activity", event.target.value)}
                    />
                    <span>{option.label}</span>
                    <small>{option.description}</small>
                  </label>
                ))}
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Goal</label>
              <div className="option-grid">
                {goalOptions.map((option) => (
                  <label
                    className={form.goal === option.value ? "goal-pill is-selected" : "goal-pill"}
                    key={option.value}
                  >
                    <input
                      type="radio"
                      name="goal"
                      value={option.value}
                      checked={form.goal === option.value}
                      onChange={(event) => handleFieldChange("goal", event.target.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="field-grid">
              <label className="field">
                <span>Body-fat % (optional)</span>
                <input
                  type="number"
                  min={0}
                  max={100}
                  step="0.1"
                  value={form.bodyFat}
                  onChange={(event) => handleFieldChange("bodyFat", event.target.value)}
                  aria-invalid={Boolean(errors.bodyFat)}
                  aria-describedby={errors.bodyFat ? "bodyfat-error" : undefined}
                  placeholder="15"
                />
                <small className="field-note">This unlocks alternative lean-body-mass calculations.</small>
                {errors.bodyFat ? <small id="bodyfat-error">{errors.bodyFat}</small> : null}
              </label>

              <label className="field">
                <span>Training frequency (optional)</span>
                <input
                  type="number"
                  min={0}
                  max={7}
                  step="1"
                  value={form.trainingFrequency}
                  onChange={(event) => handleFieldChange("trainingFrequency", event.target.value)}
                  aria-invalid={Boolean(errors.trainingFrequency)}
                  aria-describedby={errors.trainingFrequency ? "training-error" : undefined}
                  placeholder="4"
                />
                <small className="field-note">Sessions per week.</small>
                {errors.trainingFrequency ? <small id="training-error">{errors.trainingFrequency}</small> : null}
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="button button-primary">
                Calculate My Results
                <span aria-hidden="true">↗</span>
              </button>

              <button type="button" className="button button-secondary" onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>

          <aside className="fitness-card fitness-results" aria-live="polite">
            <div className="results-header">
              <p className="eyebrow">
                <span />
                Your results
              </p>
              <h2>Estimated targets</h2>
            </div>

            {result ? (
              <>
                <div className="result-grid">
                  <div className="kpi">
                    <span>BMI</span>
                    <strong>{formatNumber(result.bmi, 1)}</strong>
                  </div>
                  <div className="kpi">
                    <span>BMR</span>
                    <strong>{formatNumber(result.bmr, 0)} kcal</strong>
                  </div>
                  <div className="kpi">
                    <span>TDEE</span>
                    <strong>{formatNumber(result.tdee, 0)} kcal</strong>
                  </div>
                  <div className="kpi">
                    <span>{selectedGoalText}</span>
                    <strong>{formatNumber(result.targetCalories, 0)} kcal</strong>
                  </div>
                </div>

                <div className="summary-box">
                  <p>
                    <strong>Starting calorie target:</strong> {formatNumber(result.targetCalories, 0)} kcal/day
                  </p>
                  <p>
                    <strong>Protein target:</strong> {formatNumber(result.proteinMin, 0)}–{formatNumber(result.proteinMax, 0)} g/day
                  </p>
                </div>

                {result.warning ? (
                  <div className="warning-box" role="alert">
                    <strong>Safety note:</strong> {result.warning}
                  </div>
                ) : null}

                {hasBodyFatValue && result.leanBodyMass !== null && result.katchBmr !== null ? (
                  <div className="summary-box">
                    <p>
                      <strong>Lean body mass:</strong> {formatNumber(result.leanBodyMass, 1)} kg
                    </p>
                    <p>
                      <strong>Katch-McArdle BMR:</strong> {formatNumber(result.katchBmr, 0)} kcal/day
                    </p>
                  </div>
                ) : null}

                <div className="coach-note">
                  <p>
                    These values are estimates for planning, not medical prescriptions. Use them as a starting point, then adjust based on your training, hunger, recovery, and body changes over a few weeks.
                  </p>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <p>Enter your details and calculate your results to see a personalised calorie, protein, and body-composition estimate.</p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
