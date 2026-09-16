export const KNOWLEDGE_TOPICS = {
  body: ["Strength & Training", "Nutrition", "Recovery", "Body Confidence"],
  mind: ["Confidence", "Discipline", "Psychology", "Communication"],
  style: ["Hair & Skincare", "Personal Style", "Grooming", "Presence"],
} as const;

export type KnowledgePillar = keyof typeof KNOWLEDGE_TOPICS;

export function isKnowledgePillar(value: unknown): value is KnowledgePillar {
  return typeof value === "string" && value in KNOWLEDGE_TOPICS;
}

export function isKnowledgeTopic(pillar: unknown, topic: unknown) {
  return (
    isKnowledgePillar(pillar) &&
    typeof topic === "string" &&
    (KNOWLEDGE_TOPICS[pillar] as readonly string[]).includes(topic)
  );
}
