import { SkillCategory } from 'cv-graphql';

export const sortSkillCategoriesByOrder = (categories: SkillCategory[]): SkillCategory[] =>
  [...categories].sort((a, b) => a.order - b.order);
