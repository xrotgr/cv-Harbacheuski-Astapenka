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

export const GET_PROFILE_OPTIONS = gql`
  query GetProfileOptions {
    departments {
      id
      name
    }
    positions {
      id
      name
    }
  }
`;

export const UPDATE_PROFILE_AND_USER = gql`
  mutation UpdateProfileAndUser($profile: UpdateProfileInput!, $user: UpdateUserInput!) {
    updateProfile(profile: $profile) {
      id
      created_at
      first_name
      last_name
      full_name
      avatar
    }
    updateUser(user: $user) {
      id
      department_name
      position_name
      profile {
        id
        first_name
        last_name
        full_name
        avatar
      }
    }
  }
`;

export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($avatar: UploadAvatarInput!) {
    uploadAvatar(avatar: $avatar)
  }
`;

export const DELETE_AVATAR = gql`
  mutation DeleteAvatar($avatar: DeleteAvatarInput!) {
    deleteAvatar(avatar: $avatar)
  }
`;
