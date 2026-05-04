import { Mastery } from 'cv-graphql';

export const masteryColorMap: Record<Mastery, string> = {
  [Mastery.Novice]: '#9e9e9e',
  [Mastery.Advanced]: '#42a5f5',
  [Mastery.Competent]: '#66bb6a',
  [Mastery.Proficient]: '#ffa726',
  [Mastery.Expert]: '#ef5350',
};

export const masteryProgressMap: Record<Mastery, number> = {
  [Mastery.Novice]: 20,
  [Mastery.Advanced]: 40,
  [Mastery.Competent]: 60,
  [Mastery.Proficient]: 80,
  [Mastery.Expert]: 100,
};
