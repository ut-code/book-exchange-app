import * as Types from '../../graphqlTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAdminStatsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAdminStatsQuery = { __typename: 'Query', getAdminStats: { __typename: 'AdminStats', totalUsers: number, totalBooks: number, totalBookTemplates: number, totalExchanges: number, totalReviews: number, totalTrustReviews: number, activeUsers: number, recentUsers: Array<{ __typename: 'AdminUserInfo', id: string, username: string, createdAt: any, updatedAt: any, trustScore: number, bookCount: number, reviewCount: number }>, recentBooks: Array<{ __typename: 'AdminBookInfo', id: string, title: string, description: string, condition: Types.BookCondition, isAvailable: boolean, createdAt: any, user: { __typename: 'AdminUserBasic', id: string, username: string } }>, recentBookTemplates: Array<{ __typename: 'AdminBookTemplateInfo', id: string, isbn: string, title: string, author: string | null, publisher: string | null, createdAt: any, bookCount: number }> } };

export type AdminDeleteBookMutationVariables = Types.Exact<{
  bookId: Types.Scalars['String'];
}>;


export type AdminDeleteBookMutation = { __typename: 'Mutation', adminDeleteBook: boolean };

export type AdminUpdateBookMutationVariables = Types.Exact<{
  bookId: Types.Scalars['String'];
  input: Types.CreateBookInput;
}>;


export type AdminUpdateBookMutation = { __typename: 'Mutation', adminUpdateBook: { __typename: 'Book', id: string, title: string, description: string, condition: Types.BookCondition, isAvailable: boolean, createdAt: any, user: { __typename: 'User', id: string, username: string } } };

export type AdminDeleteBookTemplateMutationVariables = Types.Exact<{
  bookTemplateId: Types.Scalars['String'];
}>;


export type AdminDeleteBookTemplateMutation = { __typename: 'Mutation', adminDeleteBookTemplate: boolean };

export type AdminUpdateBookTemplateMutationVariables = Types.Exact<{
  bookTemplateId: Types.Scalars['String'];
  input: Types.UpdateBookTemplateInput;
}>;


export type AdminUpdateBookTemplateMutation = { __typename: 'Mutation', adminUpdateBookTemplate: { __typename: 'BookTemplate', id: string, isbn: string, title: string, author: string | null, publisher: string | null, createdAt: any } };

export type AdminDeleteUserMutationVariables = Types.Exact<{
  userId: Types.Scalars['String'];
}>;


export type AdminDeleteUserMutation = { __typename: 'Mutation', adminDeleteUser: boolean };

export type AdminUpdateUserMutationVariables = Types.Exact<{
  userId: Types.Scalars['String'];
  input: Types.AdminUpdateUserInput;
}>;


export type AdminUpdateUserMutation = { __typename: 'Mutation', adminUpdateUser: { __typename: 'User', id: string, username: string, trustScore: number } };


export const GetAdminStatsDocument = gql`
    query GetAdminStats {
  getAdminStats {
    totalUsers
    totalBooks
    totalBookTemplates
    totalExchanges
    totalReviews
    totalTrustReviews
    activeUsers
    recentUsers {
      id
      username
      createdAt
      updatedAt
      trustScore
      bookCount
      reviewCount
    }
    recentBooks {
      id
      title
      description
      condition
      isAvailable
      createdAt
      user {
        id
        username
      }
    }
    recentBookTemplates {
      id
      isbn
      title
      author
      publisher
      createdAt
      bookCount
    }
  }
}
    `;

/**
 * __useGetAdminStatsQuery__
 *
 * To run a query within a React component, call `useGetAdminStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdminStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdminStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAdminStatsQuery(baseOptions?: Apollo.QueryHookOptions<GetAdminStatsQuery, GetAdminStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdminStatsQuery, GetAdminStatsQueryVariables>(GetAdminStatsDocument, options);
      }
export function useGetAdminStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdminStatsQuery, GetAdminStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdminStatsQuery, GetAdminStatsQueryVariables>(GetAdminStatsDocument, options);
        }
export type GetAdminStatsQueryHookResult = ReturnType<typeof useGetAdminStatsQuery>;
export type GetAdminStatsLazyQueryHookResult = ReturnType<typeof useGetAdminStatsLazyQuery>;
export type GetAdminStatsQueryResult = Apollo.QueryResult<GetAdminStatsQuery, GetAdminStatsQueryVariables>;
export const AdminDeleteBookDocument = gql`
    mutation AdminDeleteBook($bookId: String!) {
  adminDeleteBook(bookId: $bookId)
}
    `;
export type AdminDeleteBookMutationFn = Apollo.MutationFunction<AdminDeleteBookMutation, AdminDeleteBookMutationVariables>;

/**
 * __useAdminDeleteBookMutation__
 *
 * To run a mutation, you first call `useAdminDeleteBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteBookMutation, { data, loading, error }] = useAdminDeleteBookMutation({
 *   variables: {
 *      bookId: // value for 'bookId'
 *   },
 * });
 */
export function useAdminDeleteBookMutation(baseOptions?: Apollo.MutationHookOptions<AdminDeleteBookMutation, AdminDeleteBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminDeleteBookMutation, AdminDeleteBookMutationVariables>(AdminDeleteBookDocument, options);
      }
export type AdminDeleteBookMutationHookResult = ReturnType<typeof useAdminDeleteBookMutation>;
export type AdminDeleteBookMutationResult = Apollo.MutationResult<AdminDeleteBookMutation>;
export type AdminDeleteBookMutationOptions = Apollo.BaseMutationOptions<AdminDeleteBookMutation, AdminDeleteBookMutationVariables>;
export const AdminUpdateBookDocument = gql`
    mutation AdminUpdateBook($bookId: String!, $input: CreateBookInput!) {
  adminUpdateBook(bookId: $bookId, input: $input) {
    id
    title
    description
    condition
    isAvailable
    createdAt
    user {
      id
      username
    }
  }
}
    `;
export type AdminUpdateBookMutationFn = Apollo.MutationFunction<AdminUpdateBookMutation, AdminUpdateBookMutationVariables>;

/**
 * __useAdminUpdateBookMutation__
 *
 * To run a mutation, you first call `useAdminUpdateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateBookMutation, { data, loading, error }] = useAdminUpdateBookMutation({
 *   variables: {
 *      bookId: // value for 'bookId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminUpdateBookMutation(baseOptions?: Apollo.MutationHookOptions<AdminUpdateBookMutation, AdminUpdateBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminUpdateBookMutation, AdminUpdateBookMutationVariables>(AdminUpdateBookDocument, options);
      }
export type AdminUpdateBookMutationHookResult = ReturnType<typeof useAdminUpdateBookMutation>;
export type AdminUpdateBookMutationResult = Apollo.MutationResult<AdminUpdateBookMutation>;
export type AdminUpdateBookMutationOptions = Apollo.BaseMutationOptions<AdminUpdateBookMutation, AdminUpdateBookMutationVariables>;
export const AdminDeleteBookTemplateDocument = gql`
    mutation AdminDeleteBookTemplate($bookTemplateId: String!) {
  adminDeleteBookTemplate(bookTemplateId: $bookTemplateId)
}
    `;
export type AdminDeleteBookTemplateMutationFn = Apollo.MutationFunction<AdminDeleteBookTemplateMutation, AdminDeleteBookTemplateMutationVariables>;

/**
 * __useAdminDeleteBookTemplateMutation__
 *
 * To run a mutation, you first call `useAdminDeleteBookTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteBookTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteBookTemplateMutation, { data, loading, error }] = useAdminDeleteBookTemplateMutation({
 *   variables: {
 *      bookTemplateId: // value for 'bookTemplateId'
 *   },
 * });
 */
export function useAdminDeleteBookTemplateMutation(baseOptions?: Apollo.MutationHookOptions<AdminDeleteBookTemplateMutation, AdminDeleteBookTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminDeleteBookTemplateMutation, AdminDeleteBookTemplateMutationVariables>(AdminDeleteBookTemplateDocument, options);
      }
export type AdminDeleteBookTemplateMutationHookResult = ReturnType<typeof useAdminDeleteBookTemplateMutation>;
export type AdminDeleteBookTemplateMutationResult = Apollo.MutationResult<AdminDeleteBookTemplateMutation>;
export type AdminDeleteBookTemplateMutationOptions = Apollo.BaseMutationOptions<AdminDeleteBookTemplateMutation, AdminDeleteBookTemplateMutationVariables>;
export const AdminUpdateBookTemplateDocument = gql`
    mutation AdminUpdateBookTemplate($bookTemplateId: String!, $input: UpdateBookTemplateInput!) {
  adminUpdateBookTemplate(bookTemplateId: $bookTemplateId, input: $input) {
    id
    isbn
    title
    author
    publisher
    createdAt
  }
}
    `;
export type AdminUpdateBookTemplateMutationFn = Apollo.MutationFunction<AdminUpdateBookTemplateMutation, AdminUpdateBookTemplateMutationVariables>;

/**
 * __useAdminUpdateBookTemplateMutation__
 *
 * To run a mutation, you first call `useAdminUpdateBookTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateBookTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateBookTemplateMutation, { data, loading, error }] = useAdminUpdateBookTemplateMutation({
 *   variables: {
 *      bookTemplateId: // value for 'bookTemplateId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminUpdateBookTemplateMutation(baseOptions?: Apollo.MutationHookOptions<AdminUpdateBookTemplateMutation, AdminUpdateBookTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminUpdateBookTemplateMutation, AdminUpdateBookTemplateMutationVariables>(AdminUpdateBookTemplateDocument, options);
      }
export type AdminUpdateBookTemplateMutationHookResult = ReturnType<typeof useAdminUpdateBookTemplateMutation>;
export type AdminUpdateBookTemplateMutationResult = Apollo.MutationResult<AdminUpdateBookTemplateMutation>;
export type AdminUpdateBookTemplateMutationOptions = Apollo.BaseMutationOptions<AdminUpdateBookTemplateMutation, AdminUpdateBookTemplateMutationVariables>;
export const AdminDeleteUserDocument = gql`
    mutation AdminDeleteUser($userId: String!) {
  adminDeleteUser(userId: $userId)
}
    `;
export type AdminDeleteUserMutationFn = Apollo.MutationFunction<AdminDeleteUserMutation, AdminDeleteUserMutationVariables>;

/**
 * __useAdminDeleteUserMutation__
 *
 * To run a mutation, you first call `useAdminDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteUserMutation, { data, loading, error }] = useAdminDeleteUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAdminDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<AdminDeleteUserMutation, AdminDeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminDeleteUserMutation, AdminDeleteUserMutationVariables>(AdminDeleteUserDocument, options);
      }
export type AdminDeleteUserMutationHookResult = ReturnType<typeof useAdminDeleteUserMutation>;
export type AdminDeleteUserMutationResult = Apollo.MutationResult<AdminDeleteUserMutation>;
export type AdminDeleteUserMutationOptions = Apollo.BaseMutationOptions<AdminDeleteUserMutation, AdminDeleteUserMutationVariables>;
export const AdminUpdateUserDocument = gql`
    mutation AdminUpdateUser($userId: String!, $input: AdminUpdateUserInput!) {
  adminUpdateUser(userId: $userId, input: $input) {
    id
    username
    trustScore
  }
}
    `;
export type AdminUpdateUserMutationFn = Apollo.MutationFunction<AdminUpdateUserMutation, AdminUpdateUserMutationVariables>;

/**
 * __useAdminUpdateUserMutation__
 *
 * To run a mutation, you first call `useAdminUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateUserMutation, { data, loading, error }] = useAdminUpdateUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<AdminUpdateUserMutation, AdminUpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminUpdateUserMutation, AdminUpdateUserMutationVariables>(AdminUpdateUserDocument, options);
      }
export type AdminUpdateUserMutationHookResult = ReturnType<typeof useAdminUpdateUserMutation>;
export type AdminUpdateUserMutationResult = Apollo.MutationResult<AdminUpdateUserMutation>;
export type AdminUpdateUserMutationOptions = Apollo.BaseMutationOptions<AdminUpdateUserMutation, AdminUpdateUserMutationVariables>;