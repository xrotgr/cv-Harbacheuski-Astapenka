import { gql } from '@apollo/client';
export const GET_PROFILE = gql`
  query GetProfile($userId: ID!) {
    profile(userId: $userId) {
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
