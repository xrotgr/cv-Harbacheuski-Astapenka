import { SkillCategory, SkillMastery } from 'cv-graphql';

import { groupItemsByCategoryId } from './groupItemsByCategoryId';
import { sortSkillCategoriesByOrder } from './sortSkillCategoriesByOrder';

export type ProfileSkillSection = {
  id: string;
  title: string;
  order: number;
  skills: SkillMastery[];
};

export const groupProfileSkillsByCategory = (
  skills: SkillMastery[],
  categories: SkillCategory[]
): ProfileSkillSection[] => {
  const sortedCategories = sortSkillCategoriesByOrder(categories);
  const knownIds = new Set(sortedCategories.map((c) => c.id));

  const uncategorized = skills.filter((s) => {
    const cid = s.categoryId ?? '';
    return !cid || !knownIds.has(cid);
  });

  const catalogSkills = skills.filter((s) => {
    const cid = s.categoryId ?? '';
    return Boolean(cid) && knownIds.has(cid);
  });

  const grouped = groupItemsByCategoryId(
    catalogSkills,
    (s) => s.categoryId ?? '',
    (a, b) => a.name.localeCompare(b.name)
  );
  const skillsByCategoryId = new Map(grouped.map((g) => [g.categoryId, g.items]));

  const sections: ProfileSkillSection[] = [];

  for (const category of sortedCategories) {
    const categorySkills = skillsByCategoryId.get(category.id);
    if (!categorySkills?.length) {
      continue;
    }
    sections.push({
      id: category.id,
      title: category.name,
      order: category.order,
      skills: categorySkills,
    });
  }

  if (uncategorized.length > 0) {
    sections.push({
      id: '__uncategorized__',
      title: '',
      order: Number.MAX_SAFE_INTEGER,
      skills: [...uncategorized].sort((a, b) => a.name.localeCompare(b.name)),
    });
  }

  return sections;
};
