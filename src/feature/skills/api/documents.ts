import { gql } from '@apollo/client';

export const GET_SKILLS_AND_CATEGORIES = gql`
  query GetSkillsAndCategories {
    skills {
      id
      name
      category {
        id
        name
        order
      }
    }
    skillCategories {
      id
      name
      order
      parent {
        id
        name
        order
      }
      children {
        id
        name
        order
      }
    }
  }
`;

export const GET_USER_PROFILE_SKILLS = gql`
  query GetUserProfileSkills($userId: ID!) {
    user(userId: $userId) {
      id
      profile {
        skills {
          name
          categoryId
          mastery
        }
      }
    }
    skillCategories {
      id
      name
      order
    }
  }
`;

export const ADD_PROFILE_SKILL = gql`
  mutation AddProfileSkill($skill: AddProfileSkillInput!) {
    addProfileSkill(skill: $skill) {
      id
    }
  }
`;

export const DELETE_PROFILE_SKILLS = gql`
  mutation DeleteProfileSkills($skill: DeleteProfileSkillInput!) {
    deleteProfileSkill(skill: $skill) {
      id
    }
  }
`;
