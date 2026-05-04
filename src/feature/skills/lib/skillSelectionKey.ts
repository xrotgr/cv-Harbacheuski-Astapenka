import { Skill, SkillMastery } from 'cv-graphql';

export type SkillSelectionPayload = {
  name: string;
  categoryId: string | null;
};

export const skillToSelectionKey = (skill: Pick<SkillMastery, 'name' | 'categoryId'>): string =>
  JSON.stringify({
    name: skill.name,
    categoryId: skill.categoryId ?? null,
  } satisfies SkillSelectionPayload);

export const catalogSkillToSelectionKey = (skill: Skill): string =>
  skillToSelectionKey({
    name: skill.name,
    categoryId: skill.category?.id ?? null,
  });

export const selectionKeysToUniqueNames = (keys: Set<string>): string[] => {
  const names = new Set<string>();
  for (const key of keys) {
    const parsed = JSON.parse(key) as SkillSelectionPayload;
    if (parsed?.name) {
      names.add(parsed.name);
    }
  }
  return [...names];
};
