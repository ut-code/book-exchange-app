import * as Types from '../../graphqlTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddToWantToReadMutationVariables = Types.Exact<{
  input: Types.AddToWantToReadInput;
}>;


export type AddToWantToReadMutation = { __typename: 'Mutation', addToWantToRead: { __typename: 'WantToRead', id: string, userId: string, bookTemplateId: string, createdAt: any, bookTemplate: { __typename: 'BookTemplate', id: string, title: string, author: string | null, imageUrl: string | null } } };

export type RemoveFromWantToReadMutationVariables = Types.Exact<{
  input: Types.RemoveFromWantToReadInput;
}>;


export type RemoveFromWantToReadMutation = { __typename: 'Mutation', removeFromWantToRead: boolean };

export type MyWantToReadListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyWantToReadListQuery = { __typename: 'Query', myWantToReadList: Array<{ __typename: 'WantToRead', id: string, userId: string, bookTemplateId: string, createdAt: any, bookTemplate: { __typename: 'BookTemplate', id: string, isbn: string, title: string, author: string | null, publisher: string | null, publishedDate: string | null, pageCount: number | null, language: string | null, categories: Array<string>, imageUrl: string | null, infoLink: string | null, description: string | null } }> };

export type IsInWantToReadListQueryVariables = Types.Exact<{
  bookTemplateId: Types.Scalars['String'];
}>;


export type IsInWantToReadListQuery = { __typename: 'Query', isInWantToReadList: boolean };


export const AddToWantToReadDocument = gql`
    mutation AddToWantToRead($input: AddToWantToReadInput!) {
  addToWantToRead(input: $input) {
    id
    userId
    bookTemplateId
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
export type AddToWantToReadMutationFn = Apollo.MutationFunction<AddToWantToReadMutation, AddToWantToReadMutationVariables>;

/**
 * __useAddToWantToReadMutation__
 *
 * To run a mutation, you first call `useAddToWantToReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToWantToReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToWantToReadMutation, { data, loading, error }] = useAddToWantToReadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddToWantToReadMutation(baseOptions?: Apollo.MutationHookOptions<AddToWantToReadMutation, AddToWantToReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToWantToReadMutation, AddToWantToReadMutationVariables>(AddToWantToReadDocument, options);
      }
export type AddToWantToReadMutationHookResult = ReturnType<typeof useAddToWantToReadMutation>;
export type AddToWantToReadMutationResult = Apollo.MutationResult<AddToWantToReadMutation>;
export type AddToWantToReadMutationOptions = Apollo.BaseMutationOptions<AddToWantToReadMutation, AddToWantToReadMutationVariables>;
export const RemoveFromWantToReadDocument = gql`
    mutation RemoveFromWantToRead($input: RemoveFromWantToReadInput!) {
  removeFromWantToRead(input: $input)
}
    `;
export type RemoveFromWantToReadMutationFn = Apollo.MutationFunction<RemoveFromWantToReadMutation, RemoveFromWantToReadMutationVariables>;

/**
 * __useRemoveFromWantToReadMutation__
 *
 * To run a mutation, you first call `useRemoveFromWantToReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromWantToReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromWantToReadMutation, { data, loading, error }] = useRemoveFromWantToReadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveFromWantToReadMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFromWantToReadMutation, RemoveFromWantToReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFromWantToReadMutation, RemoveFromWantToReadMutationVariables>(RemoveFromWantToReadDocument, options);
      }
export type RemoveFromWantToReadMutationHookResult = ReturnType<typeof useRemoveFromWantToReadMutation>;
export type RemoveFromWantToReadMutationResult = Apollo.MutationResult<RemoveFromWantToReadMutation>;
export type RemoveFromWantToReadMutationOptions = Apollo.BaseMutationOptions<RemoveFromWantToReadMutation, RemoveFromWantToReadMutationVariables>;
export const MyWantToReadListDocument = gql`
    query MyWantToReadList {
  myWantToReadList {
    id
    userId
    bookTemplateId
    createdAt
    bookTemplate {
      id
      isbn
      title
      author
      publisher
      publishedDate
      pageCount
      language
      categories
      imageUrl
      infoLink
      description
    }
  }
}
    `;

/**
 * __useMyWantToReadListQuery__
 *
 * To run a query within a React component, call `useMyWantToReadListQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyWantToReadListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyWantToReadListQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyWantToReadListQuery(baseOptions?: Apollo.QueryHookOptions<MyWantToReadListQuery, MyWantToReadListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyWantToReadListQuery, MyWantToReadListQueryVariables>(MyWantToReadListDocument, options);
      }
export function useMyWantToReadListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyWantToReadListQuery, MyWantToReadListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyWantToReadListQuery, MyWantToReadListQueryVariables>(MyWantToReadListDocument, options);
        }
export type MyWantToReadListQueryHookResult = ReturnType<typeof useMyWantToReadListQuery>;
export type MyWantToReadListLazyQueryHookResult = ReturnType<typeof useMyWantToReadListLazyQuery>;
export type MyWantToReadListQueryResult = Apollo.QueryResult<MyWantToReadListQuery, MyWantToReadListQueryVariables>;
export const IsInWantToReadListDocument = gql`
    query IsInWantToReadList($bookTemplateId: String!) {
  isInWantToReadList(bookTemplateId: $bookTemplateId)
}
    `;

/**
 * __useIsInWantToReadListQuery__
 *
 * To run a query within a React component, call `useIsInWantToReadListQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsInWantToReadListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsInWantToReadListQuery({
 *   variables: {
 *      bookTemplateId: // value for 'bookTemplateId'
 *   },
 * });
 */
export function useIsInWantToReadListQuery(baseOptions: Apollo.QueryHookOptions<IsInWantToReadListQuery, IsInWantToReadListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsInWantToReadListQuery, IsInWantToReadListQueryVariables>(IsInWantToReadListDocument, options);
      }
export function useIsInWantToReadListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsInWantToReadListQuery, IsInWantToReadListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsInWantToReadListQuery, IsInWantToReadListQueryVariables>(IsInWantToReadListDocument, options);
        }
export type IsInWantToReadListQueryHookResult = ReturnType<typeof useIsInWantToReadListQuery>;
export type IsInWantToReadListLazyQueryHookResult = ReturnType<typeof useIsInWantToReadListLazyQuery>;
export type IsInWantToReadListQueryResult = Apollo.QueryResult<IsInWantToReadListQuery, IsInWantToReadListQueryVariables>;