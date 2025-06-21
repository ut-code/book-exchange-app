import * as Types from '../../graphqlTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IsBookOwnedByUserQueryVariables = Types.Exact<{
  bookTemplateId: Types.Scalars['String'];
}>;


export type IsBookOwnedByUserQuery = { __typename: 'Query', isBookOwnedByUser: boolean };

export type ToggleBookOwnershipMutationVariables = Types.Exact<{
  input: Types.ToggleBookOwnershipInput;
}>;


export type ToggleBookOwnershipMutation = { __typename: 'Mutation', toggleBookOwnership: { __typename: 'Book', id: string, title: string, userId: string, bookTemplateId: string | null, condition: Types.BookCondition, isAvailable: boolean, createdAt: any, bookTemplate: { __typename: 'BookTemplate', id: string, title: string, author: string | null, imageUrl: string | null } | null } | null };

export type GetUserBookByTemplateQueryVariables = Types.Exact<{
  bookTemplateId: Types.Scalars['String'];
}>;


export type GetUserBookByTemplateQuery = { __typename: 'Query', getUserBookByTemplate: { __typename: 'Book', id: string, title: string, userId: string, bookTemplateId: string | null, condition: Types.BookCondition, isAvailable: boolean, notes: string | null, createdAt: any, bookTemplate: { __typename: 'BookTemplate', id: string, title: string, author: string | null, imageUrl: string | null } | null } | null };


export const IsBookOwnedByUserDocument = gql`
    query IsBookOwnedByUser($bookTemplateId: String!) {
  isBookOwnedByUser(bookTemplateId: $bookTemplateId)
}
    `;

/**
 * __useIsBookOwnedByUserQuery__
 *
 * To run a query within a React component, call `useIsBookOwnedByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsBookOwnedByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsBookOwnedByUserQuery({
 *   variables: {
 *      bookTemplateId: // value for 'bookTemplateId'
 *   },
 * });
 */
export function useIsBookOwnedByUserQuery(baseOptions: Apollo.QueryHookOptions<IsBookOwnedByUserQuery, IsBookOwnedByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsBookOwnedByUserQuery, IsBookOwnedByUserQueryVariables>(IsBookOwnedByUserDocument, options);
      }
export function useIsBookOwnedByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsBookOwnedByUserQuery, IsBookOwnedByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsBookOwnedByUserQuery, IsBookOwnedByUserQueryVariables>(IsBookOwnedByUserDocument, options);
        }
export type IsBookOwnedByUserQueryHookResult = ReturnType<typeof useIsBookOwnedByUserQuery>;
export type IsBookOwnedByUserLazyQueryHookResult = ReturnType<typeof useIsBookOwnedByUserLazyQuery>;
export type IsBookOwnedByUserQueryResult = Apollo.QueryResult<IsBookOwnedByUserQuery, IsBookOwnedByUserQueryVariables>;
export const ToggleBookOwnershipDocument = gql`
    mutation ToggleBookOwnership($input: ToggleBookOwnershipInput!) {
  toggleBookOwnership(input: $input) {
    id
    title
    userId
    bookTemplateId
    condition
    isAvailable
    createdAt
    bookTemplate {
      id
      title
      author
      imageUrl
    }
  }
}
    `;
export type ToggleBookOwnershipMutationFn = Apollo.MutationFunction<ToggleBookOwnershipMutation, ToggleBookOwnershipMutationVariables>;

/**
 * __useToggleBookOwnershipMutation__
 *
 * To run a mutation, you first call `useToggleBookOwnershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleBookOwnershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleBookOwnershipMutation, { data, loading, error }] = useToggleBookOwnershipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useToggleBookOwnershipMutation(baseOptions?: Apollo.MutationHookOptions<ToggleBookOwnershipMutation, ToggleBookOwnershipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleBookOwnershipMutation, ToggleBookOwnershipMutationVariables>(ToggleBookOwnershipDocument, options);
      }
export type ToggleBookOwnershipMutationHookResult = ReturnType<typeof useToggleBookOwnershipMutation>;
export type ToggleBookOwnershipMutationResult = Apollo.MutationResult<ToggleBookOwnershipMutation>;
export type ToggleBookOwnershipMutationOptions = Apollo.BaseMutationOptions<ToggleBookOwnershipMutation, ToggleBookOwnershipMutationVariables>;
export const GetUserBookByTemplateDocument = gql`
    query GetUserBookByTemplate($bookTemplateId: String!) {
  getUserBookByTemplate(bookTemplateId: $bookTemplateId) {
    id
    title
    userId
    bookTemplateId
    condition
    isAvailable
    notes
    createdAt
    bookTemplate {
      id
      title
      author
      imageUrl
    }
  }
}
    `;

/**
 * __useGetUserBookByTemplateQuery__
 *
 * To run a query within a React component, call `useGetUserBookByTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserBookByTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserBookByTemplateQuery({
 *   variables: {
 *      bookTemplateId: // value for 'bookTemplateId'
 *   },
 * });
 */
export function useGetUserBookByTemplateQuery(baseOptions: Apollo.QueryHookOptions<GetUserBookByTemplateQuery, GetUserBookByTemplateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserBookByTemplateQuery, GetUserBookByTemplateQueryVariables>(GetUserBookByTemplateDocument, options);
      }
export function useGetUserBookByTemplateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserBookByTemplateQuery, GetUserBookByTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserBookByTemplateQuery, GetUserBookByTemplateQueryVariables>(GetUserBookByTemplateDocument, options);
        }
export type GetUserBookByTemplateQueryHookResult = ReturnType<typeof useGetUserBookByTemplateQuery>;
export type GetUserBookByTemplateLazyQueryHookResult = ReturnType<typeof useGetUserBookByTemplateLazyQuery>;
export type GetUserBookByTemplateQueryResult = Apollo.QueryResult<GetUserBookByTemplateQuery, GetUserBookByTemplateQueryVariables>;