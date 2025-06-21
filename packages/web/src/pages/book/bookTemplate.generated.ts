import * as Types from '../../graphqlTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllBookTemplatesQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Float']>;
}>;


export type GetAllBookTemplatesQuery = { __typename: 'Query', getAllBookTemplates: Array<{ __typename: 'BookTemplate', id: string, isbn: string, title: string, author: string | null, publisher: string | null, publishedDate: string | null, pageCount: number | null, language: string | null, categories: Array<string>, imageUrl: string | null, infoLink: string | null, description: string | null, createdAt: any, updatedAt: any, books: Array<{ __typename: 'Book', id: string, user: { __typename: 'User', id: string, username: string } }> }> };

export type SearchBookTemplatesQueryVariables = Types.Exact<{
  query: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Float']>;
}>;


export type SearchBookTemplatesQuery = { __typename: 'Query', searchBookTemplates: Array<{ __typename: 'BookTemplate', id: string, isbn: string, title: string, author: string | null, publisher: string | null, publishedDate: string | null, pageCount: number | null, language: string | null, categories: Array<string>, imageUrl: string | null, infoLink: string | null, description: string | null, createdAt: any, updatedAt: any, books: Array<{ __typename: 'Book', id: string, user: { __typename: 'User', id: string, username: string } }> }> };

export type CreateBookFromTemplateMutationVariables = Types.Exact<{
  input: Types.CreateBookFromTemplateInput;
}>;


export type CreateBookFromTemplateMutation = { __typename: 'Mutation', createBookFromTemplate: { __typename: 'Book', id: string, title: string, description: string, condition: Types.BookCondition, isAvailable: boolean, notes: string | null, createdAt: any, updatedAt: any, user: { __typename: 'User', id: string, username: string }, bookTemplate: { __typename: 'BookTemplate', id: string, isbn: string, title: string, author: string | null, publisher: string | null, publishedDate: string | null, pageCount: number | null, language: string | null, categories: Array<string>, imageUrl: string | null, infoLink: string | null, description: string | null } | null } };


export const GetAllBookTemplatesDocument = gql`
    query GetAllBookTemplates($limit: Float) {
  getAllBookTemplates(limit: $limit) {
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
    createdAt
    updatedAt
    books {
      id
      user {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useGetAllBookTemplatesQuery__
 *
 * To run a query within a React component, call `useGetAllBookTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllBookTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllBookTemplatesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetAllBookTemplatesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllBookTemplatesQuery, GetAllBookTemplatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllBookTemplatesQuery, GetAllBookTemplatesQueryVariables>(GetAllBookTemplatesDocument, options);
      }
export function useGetAllBookTemplatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllBookTemplatesQuery, GetAllBookTemplatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllBookTemplatesQuery, GetAllBookTemplatesQueryVariables>(GetAllBookTemplatesDocument, options);
        }
export type GetAllBookTemplatesQueryHookResult = ReturnType<typeof useGetAllBookTemplatesQuery>;
export type GetAllBookTemplatesLazyQueryHookResult = ReturnType<typeof useGetAllBookTemplatesLazyQuery>;
export type GetAllBookTemplatesQueryResult = Apollo.QueryResult<GetAllBookTemplatesQuery, GetAllBookTemplatesQueryVariables>;
export const SearchBookTemplatesDocument = gql`
    query SearchBookTemplates($query: String!, $limit: Float) {
  searchBookTemplates(query: $query, limit: $limit) {
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
    createdAt
    updatedAt
    books {
      id
      user {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useSearchBookTemplatesQuery__
 *
 * To run a query within a React component, call `useSearchBookTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchBookTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchBookTemplatesQuery({
 *   variables: {
 *      query: // value for 'query'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchBookTemplatesQuery(baseOptions: Apollo.QueryHookOptions<SearchBookTemplatesQuery, SearchBookTemplatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchBookTemplatesQuery, SearchBookTemplatesQueryVariables>(SearchBookTemplatesDocument, options);
      }
export function useSearchBookTemplatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchBookTemplatesQuery, SearchBookTemplatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchBookTemplatesQuery, SearchBookTemplatesQueryVariables>(SearchBookTemplatesDocument, options);
        }
export type SearchBookTemplatesQueryHookResult = ReturnType<typeof useSearchBookTemplatesQuery>;
export type SearchBookTemplatesLazyQueryHookResult = ReturnType<typeof useSearchBookTemplatesLazyQuery>;
export type SearchBookTemplatesQueryResult = Apollo.QueryResult<SearchBookTemplatesQuery, SearchBookTemplatesQueryVariables>;
export const CreateBookFromTemplateDocument = gql`
    mutation CreateBookFromTemplate($input: CreateBookFromTemplateInput!) {
  createBookFromTemplate(input: $input) {
    id
    title
    description
    condition
    isAvailable
    notes
    user {
      id
      username
    }
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
    createdAt
    updatedAt
  }
}
    `;
export type CreateBookFromTemplateMutationFn = Apollo.MutationFunction<CreateBookFromTemplateMutation, CreateBookFromTemplateMutationVariables>;

/**
 * __useCreateBookFromTemplateMutation__
 *
 * To run a mutation, you first call `useCreateBookFromTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookFromTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookFromTemplateMutation, { data, loading, error }] = useCreateBookFromTemplateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBookFromTemplateMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookFromTemplateMutation, CreateBookFromTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookFromTemplateMutation, CreateBookFromTemplateMutationVariables>(CreateBookFromTemplateDocument, options);
      }
export type CreateBookFromTemplateMutationHookResult = ReturnType<typeof useCreateBookFromTemplateMutation>;
export type CreateBookFromTemplateMutationResult = Apollo.MutationResult<CreateBookFromTemplateMutation>;
export type CreateBookFromTemplateMutationOptions = Apollo.BaseMutationOptions<CreateBookFromTemplateMutation, CreateBookFromTemplateMutationVariables>;