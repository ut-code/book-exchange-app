import * as Types from '../../graphqlTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserWithBooksQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserWithBooksQuery = { __typename: 'Query', user: { __typename: 'User', id: string, username: string, books: Array<{ __typename: 'Book', id: string, title: string, description: string }> } };

export type BooksQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type BooksQuery = { __typename: 'Query', books: Array<{ __typename: 'Book', id: string, title: string, description: string }> };

export type CreateBookMutationVariables = Types.Exact<{
  input: Types.CreateBookInput;
}>;


export type CreateBookMutation = { __typename: 'Mutation', createBook: { __typename: 'Book', id: string, title: string, description: string } };

export type UpdateBookMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  input: Types.CreateBookInput;
}>;


export type UpdateBookMutation = { __typename: 'Mutation', updateBook: { __typename: 'Book', id: string, title: string, description: string } };

export type DeleteBookMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteBookMutation = { __typename: 'Mutation', deleteBook: { __typename: 'Book', id: string, title: string, description: string } };

export type DeleteBooksMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type DeleteBooksMutation = { __typename: 'Mutation', deleteBooks: Array<{ __typename: 'Book', id: string, title: string, description: string }> };


export const UserWithBooksDocument = gql`
    query UserWithBooks {
  user {
    id
    username
    books {
      id
      title
      description
    }
  }
}
    `;

/**
 * __useUserWithBooksQuery__
 *
 * To run a query within a React component, call `useUserWithBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserWithBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserWithBooksQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserWithBooksQuery(baseOptions?: Apollo.QueryHookOptions<UserWithBooksQuery, UserWithBooksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserWithBooksQuery, UserWithBooksQueryVariables>(UserWithBooksDocument, options);
      }
export function useUserWithBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserWithBooksQuery, UserWithBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserWithBooksQuery, UserWithBooksQueryVariables>(UserWithBooksDocument, options);
        }
export type UserWithBooksQueryHookResult = ReturnType<typeof useUserWithBooksQuery>;
export type UserWithBooksLazyQueryHookResult = ReturnType<typeof useUserWithBooksLazyQuery>;
export type UserWithBooksQueryResult = Apollo.QueryResult<UserWithBooksQuery, UserWithBooksQueryVariables>;
export const BooksDocument = gql`
    query Books {
  books {
    id
    title
    description
  }
}
    `;

/**
 * __useBooksQuery__
 *
 * To run a query within a React component, call `useBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBooksQuery({
 *   variables: {
 *   },
 * });
 */
export function useBooksQuery(baseOptions?: Apollo.QueryHookOptions<BooksQuery, BooksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BooksQuery, BooksQueryVariables>(BooksDocument, options);
      }
export function useBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BooksQuery, BooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BooksQuery, BooksQueryVariables>(BooksDocument, options);
        }
export type BooksQueryHookResult = ReturnType<typeof useBooksQuery>;
export type BooksLazyQueryHookResult = ReturnType<typeof useBooksLazyQuery>;
export type BooksQueryResult = Apollo.QueryResult<BooksQuery, BooksQueryVariables>;
export const CreateBookDocument = gql`
    mutation CreateBook($input: CreateBookInput!) {
  createBook(input: $input) {
    id
    title
    description
  }
}
    `;
export type CreateBookMutationFn = Apollo.MutationFunction<CreateBookMutation, CreateBookMutationVariables>;

/**
 * __useCreateBookMutation__
 *
 * To run a mutation, you first call `useCreateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookMutation, { data, loading, error }] = useCreateBookMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBookMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookMutation, CreateBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookMutation, CreateBookMutationVariables>(CreateBookDocument, options);
      }
export type CreateBookMutationHookResult = ReturnType<typeof useCreateBookMutation>;
export type CreateBookMutationResult = Apollo.MutationResult<CreateBookMutation>;
export type CreateBookMutationOptions = Apollo.BaseMutationOptions<CreateBookMutation, CreateBookMutationVariables>;
export const UpdateBookDocument = gql`
    mutation UpdateBook($id: String!, $input: CreateBookInput!) {
  updateBook(id: $id, input: $input) {
    id
    title
    description
  }
}
    `;
export type UpdateBookMutationFn = Apollo.MutationFunction<UpdateBookMutation, UpdateBookMutationVariables>;

/**
 * __useUpdateBookMutation__
 *
 * To run a mutation, you first call `useUpdateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookMutation, { data, loading, error }] = useUpdateBookMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBookMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBookMutation, UpdateBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBookMutation, UpdateBookMutationVariables>(UpdateBookDocument, options);
      }
export type UpdateBookMutationHookResult = ReturnType<typeof useUpdateBookMutation>;
export type UpdateBookMutationResult = Apollo.MutationResult<UpdateBookMutation>;
export type UpdateBookMutationOptions = Apollo.BaseMutationOptions<UpdateBookMutation, UpdateBookMutationVariables>;
export const DeleteBookDocument = gql`
    mutation DeleteBook($id: String!) {
  deleteBook(id: $id) {
    id
    title
    description
  }
}
    `;
export type DeleteBookMutationFn = Apollo.MutationFunction<DeleteBookMutation, DeleteBookMutationVariables>;

/**
 * __useDeleteBookMutation__
 *
 * To run a mutation, you first call `useDeleteBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookMutation, { data, loading, error }] = useDeleteBookMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBookMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBookMutation, DeleteBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBookMutation, DeleteBookMutationVariables>(DeleteBookDocument, options);
      }
export type DeleteBookMutationHookResult = ReturnType<typeof useDeleteBookMutation>;
export type DeleteBookMutationResult = Apollo.MutationResult<DeleteBookMutation>;
export type DeleteBookMutationOptions = Apollo.BaseMutationOptions<DeleteBookMutation, DeleteBookMutationVariables>;
export const DeleteBooksDocument = gql`
    mutation DeleteBooks($ids: [String!]!) {
  deleteBooks(ids: $ids) {
    id
    title
    description
  }
}
    `;
export type DeleteBooksMutationFn = Apollo.MutationFunction<DeleteBooksMutation, DeleteBooksMutationVariables>;

/**
 * __useDeleteBooksMutation__
 *
 * To run a mutation, you first call `useDeleteBooksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBooksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBooksMutation, { data, loading, error }] = useDeleteBooksMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteBooksMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBooksMutation, DeleteBooksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBooksMutation, DeleteBooksMutationVariables>(DeleteBooksDocument, options);
      }
export type DeleteBooksMutationHookResult = ReturnType<typeof useDeleteBooksMutation>;
export type DeleteBooksMutationResult = Apollo.MutationResult<DeleteBooksMutation>;
export type DeleteBooksMutationOptions = Apollo.BaseMutationOptions<DeleteBooksMutation, DeleteBooksMutationVariables>;