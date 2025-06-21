import * as Types from '../../graphqlTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserWithBooksQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserWithBooksQuery = { __typename: 'Query', user: { __typename: 'User', id: string, username: string, books: Array<{ __typename: 'Book', id: string, title: string, description: string }> } };

export type BooksQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type BooksQuery = { __typename: 'Query', books: Array<{ __typename: 'Book', id: string, title: string, description: string, condition: Types.BookCondition, isAvailable: boolean, notes: string | null, createdAt: any, updatedAt: any, user: { __typename: 'User', id: string, username: string }, bookTemplate: { __typename: 'BookTemplate', id: string, isbn: string, title: string, author: string | null, publisher: string | null, publishedDate: string | null, pageCount: number | null, language: string | null, categories: Array<string>, imageUrl: string | null, infoLink: string | null, description: string | null } | null }> };

export type CreateBookMutationVariables = Types.Exact<{
  input: Types.CreateBookInput;
}>;


export type CreateBookMutation = { __typename: 'Mutation', createBook: { __typename: 'Book', id: string, title: string, description: string, condition: Types.BookCondition, isAvailable: boolean, notes: string | null, createdAt: any, updatedAt: any, user: { __typename: 'User', id: string, username: string }, bookTemplate: { __typename: 'BookTemplate', id: string, isbn: string, title: string, author: string | null, publisher: string | null, publishedDate: string | null, pageCount: number | null, language: string | null, categories: Array<string>, imageUrl: string | null, infoLink: string | null, description: string | null } | null } };

export type CreateBooksMutationVariables = Types.Exact<{
  input: Array<Types.CreateBookInput> | Types.CreateBookInput;
}>;


export type CreateBooksMutation = { __typename: 'Mutation', createBooks: Array<{ __typename: 'Book', id: string, title: string, description: string, condition: Types.BookCondition, isAvailable: boolean, notes: string | null, createdAt: any, updatedAt: any }> };

export type UpdateBookMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  input: Types.CreateBookInput;
}>;


export type UpdateBookMutation = { __typename: 'Mutation', updateBook: { __typename: 'Book', id: string, title: string, description: string, condition: Types.BookCondition, isAvailable: boolean, notes: string | null, createdAt: any, updatedAt: any, user: { __typename: 'User', id: string, username: string }, bookTemplate: { __typename: 'BookTemplate', id: string, isbn: string, title: string, author: string | null, publisher: string | null, publishedDate: string | null, pageCount: number | null, language: string | null, categories: Array<string>, imageUrl: string | null, infoLink: string | null, description: string | null } | null } };

export type DeleteBookMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteBookMutation = { __typename: 'Mutation', deleteBook: boolean };

export type DeleteBooksMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type DeleteBooksMutation = { __typename: 'Mutation', deleteBooks: Array<{ __typename: 'Book', id: string, title: string, description: string }> };

export type CreateBookFromIsbnMutationVariables = Types.Exact<{
  input: Types.CreateBookFromIsbnInput;
}>;


export type CreateBookFromIsbnMutation = { __typename: 'Mutation', createBookFromIsbn: { __typename: 'Book', id: string, title: string, description: string, condition: Types.BookCondition, isAvailable: boolean, notes: string | null, createdAt: any, updatedAt: any, user: { __typename: 'User', id: string, username: string }, bookTemplate: { __typename: 'BookTemplate', id: string, isbn: string, title: string, author: string | null, publisher: string | null, publishedDate: string | null, pageCount: number | null, language: string | null, categories: Array<string>, imageUrl: string | null, infoLink: string | null, description: string | null } | null } };

export type GetAllBookTemplatesQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Float']>;
}>;


export type GetAllBookTemplatesQuery = { __typename: 'Query', getAllBookTemplates: Array<{ __typename: 'BookTemplate', id: string, isbn: string, title: string, author: string | null, publisher: string | null, publishedDate: string | null, pageCount: number | null, language: string | null, categories: Array<string>, imageUrl: string | null, infoLink: string | null, description: string | null, createdAt: any, updatedAt: any, books: Array<{ __typename: 'Book', id: string, user: { __typename: 'User', id: string, username: string } }> }> };

export type SearchBookTemplatesQueryVariables = Types.Exact<{
  query: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Float']>;
}>;


export type SearchBookTemplatesQuery = { __typename: 'Query', searchBookTemplates: Array<{ __typename: 'BookTemplate', id: string, isbn: string, title: string, author: string | null, publisher: string | null, publishedDate: string | null, pageCount: number | null, language: string | null, categories: Array<string>, imageUrl: string | null, infoLink: string | null, description: string | null, createdAt: any, updatedAt: any, books: Array<{ __typename: 'Book', id: string, user: { __typename: 'User', id: string, username: string } }> }> };

export type GetBookTemplateByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetBookTemplateByIdQuery = { __typename: 'Query', getBookTemplateById: { __typename: 'BookTemplate', id: string, isbn: string, title: string, author: string | null, publisher: string | null, publishedDate: string | null, pageCount: number | null, language: string | null, categories: Array<string>, imageUrl: string | null, infoLink: string | null, description: string | null, createdAt: any, updatedAt: any, books: Array<{ __typename: 'Book', id: string, condition: Types.BookCondition, isAvailable: boolean, notes: string | null, createdAt: any, user: { __typename: 'User', id: string, username: string } }> } | null };

export type GetBookTemplateByIsbnQueryVariables = Types.Exact<{
  isbn: Types.Scalars['String'];
}>;


export type GetBookTemplateByIsbnQuery = { __typename: 'Query', getBookTemplateByISBN: { __typename: 'BookTemplate', id: string, isbn: string, title: string, author: string | null, publisher: string | null, publishedDate: string | null, pageCount: number | null, language: string | null, categories: Array<string>, imageUrl: string | null, infoLink: string | null, description: string | null, createdAt: any, updatedAt: any, books: Array<{ __typename: 'Book', id: string, condition: Types.BookCondition, isAvailable: boolean, notes: string | null, createdAt: any, user: { __typename: 'User', id: string, username: string } }> } | null };

export type CreateBookFromTemplateMutationVariables = Types.Exact<{
  input: Types.CreateBookFromTemplateInput;
}>;


export type CreateBookFromTemplateMutation = { __typename: 'Mutation', createBookFromTemplate: { __typename: 'Book', id: string, title: string, description: string, condition: Types.BookCondition, isAvailable: boolean, notes: string | null, createdAt: any, updatedAt: any, user: { __typename: 'User', id: string, username: string }, bookTemplate: { __typename: 'BookTemplate', id: string, isbn: string, title: string, author: string | null, publisher: string | null, publishedDate: string | null, pageCount: number | null, language: string | null, categories: Array<string>, imageUrl: string | null, infoLink: string | null, description: string | null } | null } };


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
    condition
    isAvailable
    notes
    createdAt
    updatedAt
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
export const CreateBooksDocument = gql`
    mutation CreateBooks($input: [CreateBookInput!]!) {
  createBooks(input: $input) {
    id
    title
    description
    condition
    isAvailable
    notes
    createdAt
    updatedAt
  }
}
    `;
export type CreateBooksMutationFn = Apollo.MutationFunction<CreateBooksMutation, CreateBooksMutationVariables>;

/**
 * __useCreateBooksMutation__
 *
 * To run a mutation, you first call `useCreateBooksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBooksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBooksMutation, { data, loading, error }] = useCreateBooksMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBooksMutation(baseOptions?: Apollo.MutationHookOptions<CreateBooksMutation, CreateBooksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBooksMutation, CreateBooksMutationVariables>(CreateBooksDocument, options);
      }
export type CreateBooksMutationHookResult = ReturnType<typeof useCreateBooksMutation>;
export type CreateBooksMutationResult = Apollo.MutationResult<CreateBooksMutation>;
export type CreateBooksMutationOptions = Apollo.BaseMutationOptions<CreateBooksMutation, CreateBooksMutationVariables>;
export const UpdateBookDocument = gql`
    mutation UpdateBook($id: String!, $input: CreateBookInput!) {
  updateBook(id: $id, input: $input) {
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
  deleteBook(id: $id)
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
export const CreateBookFromIsbnDocument = gql`
    mutation CreateBookFromIsbn($input: CreateBookFromIsbnInput!) {
  createBookFromIsbn(input: $input) {
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
export type CreateBookFromIsbnMutationFn = Apollo.MutationFunction<CreateBookFromIsbnMutation, CreateBookFromIsbnMutationVariables>;

/**
 * __useCreateBookFromIsbnMutation__
 *
 * To run a mutation, you first call `useCreateBookFromIsbnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookFromIsbnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookFromIsbnMutation, { data, loading, error }] = useCreateBookFromIsbnMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBookFromIsbnMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookFromIsbnMutation, CreateBookFromIsbnMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookFromIsbnMutation, CreateBookFromIsbnMutationVariables>(CreateBookFromIsbnDocument, options);
      }
export type CreateBookFromIsbnMutationHookResult = ReturnType<typeof useCreateBookFromIsbnMutation>;
export type CreateBookFromIsbnMutationResult = Apollo.MutationResult<CreateBookFromIsbnMutation>;
export type CreateBookFromIsbnMutationOptions = Apollo.BaseMutationOptions<CreateBookFromIsbnMutation, CreateBookFromIsbnMutationVariables>;
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
export const GetBookTemplateByIdDocument = gql`
    query GetBookTemplateById($id: String!) {
  getBookTemplateById(id: $id) {
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
      condition
      isAvailable
      notes
      user {
        id
        username
      }
      createdAt
    }
  }
}
    `;

/**
 * __useGetBookTemplateByIdQuery__
 *
 * To run a query within a React component, call `useGetBookTemplateByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookTemplateByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookTemplateByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBookTemplateByIdQuery(baseOptions: Apollo.QueryHookOptions<GetBookTemplateByIdQuery, GetBookTemplateByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookTemplateByIdQuery, GetBookTemplateByIdQueryVariables>(GetBookTemplateByIdDocument, options);
      }
export function useGetBookTemplateByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookTemplateByIdQuery, GetBookTemplateByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookTemplateByIdQuery, GetBookTemplateByIdQueryVariables>(GetBookTemplateByIdDocument, options);
        }
export type GetBookTemplateByIdQueryHookResult = ReturnType<typeof useGetBookTemplateByIdQuery>;
export type GetBookTemplateByIdLazyQueryHookResult = ReturnType<typeof useGetBookTemplateByIdLazyQuery>;
export type GetBookTemplateByIdQueryResult = Apollo.QueryResult<GetBookTemplateByIdQuery, GetBookTemplateByIdQueryVariables>;
export const GetBookTemplateByIsbnDocument = gql`
    query GetBookTemplateByISBN($isbn: String!) {
  getBookTemplateByISBN(isbn: $isbn) {
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
      condition
      isAvailable
      notes
      user {
        id
        username
      }
      createdAt
    }
  }
}
    `;

/**
 * __useGetBookTemplateByIsbnQuery__
 *
 * To run a query within a React component, call `useGetBookTemplateByIsbnQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookTemplateByIsbnQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookTemplateByIsbnQuery({
 *   variables: {
 *      isbn: // value for 'isbn'
 *   },
 * });
 */
export function useGetBookTemplateByIsbnQuery(baseOptions: Apollo.QueryHookOptions<GetBookTemplateByIsbnQuery, GetBookTemplateByIsbnQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookTemplateByIsbnQuery, GetBookTemplateByIsbnQueryVariables>(GetBookTemplateByIsbnDocument, options);
      }
export function useGetBookTemplateByIsbnLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookTemplateByIsbnQuery, GetBookTemplateByIsbnQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookTemplateByIsbnQuery, GetBookTemplateByIsbnQueryVariables>(GetBookTemplateByIsbnDocument, options);
        }
export type GetBookTemplateByIsbnQueryHookResult = ReturnType<typeof useGetBookTemplateByIsbnQuery>;
export type GetBookTemplateByIsbnLazyQueryHookResult = ReturnType<typeof useGetBookTemplateByIsbnLazyQuery>;
export type GetBookTemplateByIsbnQueryResult = Apollo.QueryResult<GetBookTemplateByIsbnQuery, GetBookTemplateByIsbnQueryVariables>;
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