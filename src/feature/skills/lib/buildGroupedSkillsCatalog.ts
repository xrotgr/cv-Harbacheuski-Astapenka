import { Skill, SkillCategory } from 'cv-graphql';

import { groupItemsByCategoryId } from './groupItemsByCategoryId';
import { sortSkillCategoriesByOrder } from './sortSkillCategoriesByOrder';

export type SkillsCatalogData = {
  skills: Skill[];
  skillCategories: SkillCategory[];
};

export const buildGroupedSkillsCatalog = (
  data: SkillsCatalogData | null | undefined
): SkillsCatalogData => {
  if (!data) {
    return {
      skills: [],
      skillCategories: [],
    };
  }

  const sortedCategories = sortSkillCategoriesByOrder(data.skillCategories);
  const groupedByCategoryId = groupItemsByCategoryId(
    data.skills,
    (skill) => skill.category?.id ?? '',
    (a, b) => a.name.localeCompare(b.name)
  );
  const skillsByCategoryId = new Map(
    groupedByCategoryId.map((group) => [group.categoryId, group.items])
  );
  const groupedSkills: Skill[] = [];

  for (const category of sortedCategories) {
    const categorySkills = skillsByCategoryId.get(category.id) ?? [];
    groupedSkills.push(...categorySkills);
    skillsByCategoryId.delete(category.id);
  }

  const restSkills = [...skillsByCategoryId.values()].flat();

  return {
    ...data,
    skillCategories: sortedCategories,
    skills: [...groupedSkills, ...restSkills],
  };
};
