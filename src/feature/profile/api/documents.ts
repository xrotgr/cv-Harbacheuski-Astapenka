import { gql } from '@apollo/client';
export const GET_PROFILE = gql`
  query GetProfile($userId: ID!) {
    user(userId: $userId) {
      id
      email
      created_at
      department_name
      position_name
      profile {
        id
        created_at
        first_name
        last_name
        full_name
        avatar
        skills {
          mastery
        }
        languages {
          proficiency
        }
      }
    }
  }
`;

export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    departments {
      id
      name
    }
  }
`;

export const GET_POSITIONS = gql`
  query GetPositions {
    positions {
      id
      name
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
      id
      created_at
      first_name
      last_name
      full_name
      avatar
    }
  }
`;
