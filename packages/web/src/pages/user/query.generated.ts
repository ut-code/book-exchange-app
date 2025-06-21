import * as Types from '../../graphqlTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename: 'Query', user: { __typename: 'User', id: string, username: string, trustScore: number } };

export type MyProfileQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyProfileQuery = { __typename: 'Query', user: { __typename: 'User', id: string, username: string, trustScore: number, books: Array<{ __typename: 'Book', id: string, title: string, description: string, condition: Types.BookCondition, isAvailable: boolean }>, receivedTrustReviews: Array<{ __typename: 'TrustReview', id: string, rating: number, comment: string | null, reviewType: Types.TrustReviewType, reviewerUser: { __typename: 'User', id: string, username: string } }> } };

export type UsersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename: 'Query', users: Array<{ __typename: 'User', id: string, username: string }> };

export type BooksByUserIdQueryVariables = Types.Exact<{
  userId: Types.Scalars['String'];
}>;


export type BooksByUserIdQuery = { __typename: 'Query', booksByUserId: Array<{ __typename: 'Book', id: string, title: string, description: string, user: { __typename: 'User', id: string, username: string, trustScore: number } }> };

export type SignupUserMutationVariables = Types.Exact<{
  createUserInput: Types.CreateUserInput;
}>;


export type SignupUserMutation = { __typename: 'Mutation', createUser: { __typename: 'User', id: string, username: string } };

export type SigninUserMutationVariables = Types.Exact<{
  signinUserInput: Types.SigninUserInput;
}>;


export type SigninUserMutation = { __typename: 'Mutation', signinUser: { __typename: 'AuthResponse', accessToken: string } };

export type DeleteUserMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = { __typename: 'Mutation', deleteUser: { __typename: 'User', id: string } };

export type GetUserTrustReviewsQueryVariables = Types.Exact<{
  userId: Types.Scalars['String'];
}>;


export type GetUserTrustReviewsQuery = { __typename: 'Query', getUserTrustReviews: Array<{ __typename: 'TrustReview', id: string, rating: number, comment: string | null, reviewType: Types.TrustReviewType, createdAt: any, reviewerUser: { __typename: 'User', id: string, username: string } }> };

export type GetUserTrustScoreHistoryQueryVariables = Types.Exact<{
  userId: Types.Scalars['String'];
}>;


export type GetUserTrustScoreHistoryQuery = { __typename: 'Query', getUserTrustScoreHistory: Array<{ __typename: 'TrustScoreHistory', id: string, oldScore: number, newScore: number, reason: string, createdAt: any }> };

export type CreateTrustReviewMutationVariables = Types.Exact<{
  createTrustReviewInput: Types.CreateTrustReviewInput;
}>;


export type CreateTrustReviewMutation = { __typename: 'Mutation', createTrustReview: { __typename: 'TrustReview', id: string, rating: number, comment: string | null, reviewType: Types.TrustReviewType, createdAt: any, targetUser: { __typename: 'User', id: string, username: string } } };


export const UserDocument = gql`
    query User {
  user {
    id
    username
    trustScore
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const MyProfileDocument = gql`
    query MyProfile {
  user {
    id
    username
    trustScore
    books {
      id
      title
      description
      condition
      isAvailable
    }
    receivedTrustReviews {
      id
      rating
      comment
      reviewType
      reviewerUser {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useMyProfileQuery__
 *
 * To run a query within a React component, call `useMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProfileQuery(baseOptions?: Apollo.QueryHookOptions<MyProfileQuery, MyProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, options);
      }
export function useMyProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyProfileQuery, MyProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, options);
        }
export type MyProfileQueryHookResult = ReturnType<typeof useMyProfileQuery>;
export type MyProfileLazyQueryHookResult = ReturnType<typeof useMyProfileLazyQuery>;
export type MyProfileQueryResult = Apollo.QueryResult<MyProfileQuery, MyProfileQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    username
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const BooksByUserIdDocument = gql`
    query BooksByUserId($userId: String!) {
  booksByUserId(userId: $userId) {
    id
    title
    description
    user {
      id
      username
      trustScore
    }
  }
}
    `;

/**
 * __useBooksByUserIdQuery__
 *
 * To run a query within a React component, call `useBooksByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useBooksByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBooksByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useBooksByUserIdQuery(baseOptions: Apollo.QueryHookOptions<BooksByUserIdQuery, BooksByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BooksByUserIdQuery, BooksByUserIdQueryVariables>(BooksByUserIdDocument, options);
      }
export function useBooksByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BooksByUserIdQuery, BooksByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BooksByUserIdQuery, BooksByUserIdQueryVariables>(BooksByUserIdDocument, options);
        }
export type BooksByUserIdQueryHookResult = ReturnType<typeof useBooksByUserIdQuery>;
export type BooksByUserIdLazyQueryHookResult = ReturnType<typeof useBooksByUserIdLazyQuery>;
export type BooksByUserIdQueryResult = Apollo.QueryResult<BooksByUserIdQuery, BooksByUserIdQueryVariables>;
export const SignupUserDocument = gql`
    mutation SignupUser($createUserInput: CreateUserInput!) {
  createUser(input: $createUserInput) {
    id
    username
  }
}
    `;
export type SignupUserMutationFn = Apollo.MutationFunction<SignupUserMutation, SignupUserMutationVariables>;

/**
 * __useSignupUserMutation__
 *
 * To run a mutation, you first call `useSignupUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupUserMutation, { data, loading, error }] = useSignupUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useSignupUserMutation(baseOptions?: Apollo.MutationHookOptions<SignupUserMutation, SignupUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupUserMutation, SignupUserMutationVariables>(SignupUserDocument, options);
      }
export type SignupUserMutationHookResult = ReturnType<typeof useSignupUserMutation>;
export type SignupUserMutationResult = Apollo.MutationResult<SignupUserMutation>;
export type SignupUserMutationOptions = Apollo.BaseMutationOptions<SignupUserMutation, SignupUserMutationVariables>;
export const SigninUserDocument = gql`
    mutation SigninUser($signinUserInput: SigninUserInput!) {
  signinUser(input: $signinUserInput) {
    accessToken
  }
}
    `;
export type SigninUserMutationFn = Apollo.MutationFunction<SigninUserMutation, SigninUserMutationVariables>;

/**
 * __useSigninUserMutation__
 *
 * To run a mutation, you first call `useSigninUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinUserMutation, { data, loading, error }] = useSigninUserMutation({
 *   variables: {
 *      signinUserInput: // value for 'signinUserInput'
 *   },
 * });
 */
export function useSigninUserMutation(baseOptions?: Apollo.MutationHookOptions<SigninUserMutation, SigninUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SigninUserMutation, SigninUserMutationVariables>(SigninUserDocument, options);
      }
export type SigninUserMutationHookResult = ReturnType<typeof useSigninUserMutation>;
export type SigninUserMutationResult = Apollo.MutationResult<SigninUserMutation>;
export type SigninUserMutationOptions = Apollo.BaseMutationOptions<SigninUserMutation, SigninUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser {
  deleteUser {
    id
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const GetUserTrustReviewsDocument = gql`
    query GetUserTrustReviews($userId: String!) {
  getUserTrustReviews(userId: $userId) {
    id
    rating
    comment
    reviewType
    createdAt
    reviewerUser {
      id
      username
    }
  }
}
    `;

/**
 * __useGetUserTrustReviewsQuery__
 *
 * To run a query within a React component, call `useGetUserTrustReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTrustReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTrustReviewsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserTrustReviewsQuery(baseOptions: Apollo.QueryHookOptions<GetUserTrustReviewsQuery, GetUserTrustReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserTrustReviewsQuery, GetUserTrustReviewsQueryVariables>(GetUserTrustReviewsDocument, options);
      }
export function useGetUserTrustReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserTrustReviewsQuery, GetUserTrustReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserTrustReviewsQuery, GetUserTrustReviewsQueryVariables>(GetUserTrustReviewsDocument, options);
        }
export type GetUserTrustReviewsQueryHookResult = ReturnType<typeof useGetUserTrustReviewsQuery>;
export type GetUserTrustReviewsLazyQueryHookResult = ReturnType<typeof useGetUserTrustReviewsLazyQuery>;
export type GetUserTrustReviewsQueryResult = Apollo.QueryResult<GetUserTrustReviewsQuery, GetUserTrustReviewsQueryVariables>;
export const GetUserTrustScoreHistoryDocument = gql`
    query GetUserTrustScoreHistory($userId: String!) {
  getUserTrustScoreHistory(userId: $userId) {
    id
    oldScore
    newScore
    reason
    createdAt
  }
}
    `;

/**
 * __useGetUserTrustScoreHistoryQuery__
 *
 * To run a query within a React component, call `useGetUserTrustScoreHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTrustScoreHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTrustScoreHistoryQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserTrustScoreHistoryQuery(baseOptions: Apollo.QueryHookOptions<GetUserTrustScoreHistoryQuery, GetUserTrustScoreHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserTrustScoreHistoryQuery, GetUserTrustScoreHistoryQueryVariables>(GetUserTrustScoreHistoryDocument, options);
      }
export function useGetUserTrustScoreHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserTrustScoreHistoryQuery, GetUserTrustScoreHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserTrustScoreHistoryQuery, GetUserTrustScoreHistoryQueryVariables>(GetUserTrustScoreHistoryDocument, options);
        }
export type GetUserTrustScoreHistoryQueryHookResult = ReturnType<typeof useGetUserTrustScoreHistoryQuery>;
export type GetUserTrustScoreHistoryLazyQueryHookResult = ReturnType<typeof useGetUserTrustScoreHistoryLazyQuery>;
export type GetUserTrustScoreHistoryQueryResult = Apollo.QueryResult<GetUserTrustScoreHistoryQuery, GetUserTrustScoreHistoryQueryVariables>;
export const CreateTrustReviewDocument = gql`
    mutation CreateTrustReview($createTrustReviewInput: CreateTrustReviewInput!) {
  createTrustReview(createTrustReviewInput: $createTrustReviewInput) {
    id
    rating
    comment
    reviewType
    createdAt
    targetUser {
      id
      username
    }
  }
}
    `;
export type CreateTrustReviewMutationFn = Apollo.MutationFunction<CreateTrustReviewMutation, CreateTrustReviewMutationVariables>;

/**
 * __useCreateTrustReviewMutation__
 *
 * To run a mutation, you first call `useCreateTrustReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTrustReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTrustReviewMutation, { data, loading, error }] = useCreateTrustReviewMutation({
 *   variables: {
 *      createTrustReviewInput: // value for 'createTrustReviewInput'
 *   },
 * });
 */
export function useCreateTrustReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateTrustReviewMutation, CreateTrustReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTrustReviewMutation, CreateTrustReviewMutationVariables>(CreateTrustReviewDocument, options);
      }
export type CreateTrustReviewMutationHookResult = ReturnType<typeof useCreateTrustReviewMutation>;
export type CreateTrustReviewMutationResult = Apollo.MutationResult<CreateTrustReviewMutation>;
export type CreateTrustReviewMutationOptions = Apollo.BaseMutationOptions<CreateTrustReviewMutation, CreateTrustReviewMutationVariables>;