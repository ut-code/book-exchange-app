import * as Types from '../../graphqlTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateExchangeReviewMutationVariables = Types.Exact<{
  input: Types.CreateExchangeReviewInput;
  reviewerUserId: Types.Scalars['String'];
}>;


export type CreateExchangeReviewMutation = { __typename: 'Mutation', createExchangeReview: { __typename: 'ExchangeReview', id: string, exchangeRequestId: string, reviewerUserId: string, reviewedUserId: string, smoothness: number, communication: number, punctuality: number, bookCondition: number, overallRating: number, comment: string | null, wasSmooth: boolean, createdAt: any, updatedAt: any, reviewer: { __typename: 'User', id: string, username: string }, reviewed: { __typename: 'User', id: string, username: string } } };

export type UpdateExchangeReviewMutationVariables = Types.Exact<{
  input: Types.UpdateExchangeReviewInput;
  reviewerUserId: Types.Scalars['String'];
}>;


export type UpdateExchangeReviewMutation = { __typename: 'Mutation', updateExchangeReview: { __typename: 'ExchangeReview', id: string, smoothness: number, communication: number, punctuality: number, bookCondition: number, overallRating: number, comment: string | null, wasSmooth: boolean, updatedAt: any } };

export type GetExchangeReviewsByExchangeRequestQueryVariables = Types.Exact<{
  exchangeRequestId: Types.Scalars['String'];
}>;


export type GetExchangeReviewsByExchangeRequestQuery = { __typename: 'Query', getExchangeReviewsByExchangeRequest: Array<{ __typename: 'ExchangeReview', id: string, exchangeRequestId: string, reviewerUserId: string, reviewedUserId: string, smoothness: number, communication: number, punctuality: number, bookCondition: number, overallRating: number, comment: string | null, wasSmooth: boolean, createdAt: any, updatedAt: any, reviewer: { __typename: 'User', id: string, username: string }, reviewed: { __typename: 'User', id: string, username: string } }> };

export type GetExchangeReviewsByUserQueryVariables = Types.Exact<{
  userId: Types.Scalars['String'];
}>;


export type GetExchangeReviewsByUserQuery = { __typename: 'Query', getExchangeReviewsByUser: Array<{ __typename: 'ExchangeReview', id: string, exchangeRequestId: string, reviewerUserId: string, reviewedUserId: string, smoothness: number, communication: number, punctuality: number, bookCondition: number, overallRating: number, comment: string | null, wasSmooth: boolean, createdAt: any, updatedAt: any, reviewer: { __typename: 'User', id: string, username: string }, reviewed: { __typename: 'User', id: string, username: string }, exchangeRequest: { __typename: 'ExchangeRequest', id: string, status: Types.ExchangeStatus, createdAt: any, completedAt: any | null } }> };

export type GetExchangeReviewQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetExchangeReviewQuery = { __typename: 'Query', getExchangeReview: { __typename: 'ExchangeReview', id: string, exchangeRequestId: string, reviewerUserId: string, reviewedUserId: string, smoothness: number, communication: number, punctuality: number, bookCondition: number, overallRating: number, comment: string | null, wasSmooth: boolean, createdAt: any, updatedAt: any, reviewer: { __typename: 'User', id: string, username: string }, reviewed: { __typename: 'User', id: string, username: string }, exchangeRequest: { __typename: 'ExchangeRequest', id: string, status: Types.ExchangeStatus, createdAt: any, completedAt: any | null } } | null };


export const CreateExchangeReviewDocument = gql`
    mutation CreateExchangeReview($input: CreateExchangeReviewInput!, $reviewerUserId: String!) {
  createExchangeReview(input: $input, reviewerUserId: $reviewerUserId) {
    id
    exchangeRequestId
    reviewerUserId
    reviewedUserId
    smoothness
    communication
    punctuality
    bookCondition
    overallRating
    comment
    wasSmooth
    createdAt
    updatedAt
    reviewer {
      id
      username
    }
    reviewed {
      id
      username
    }
  }
}
    `;
export type CreateExchangeReviewMutationFn = Apollo.MutationFunction<CreateExchangeReviewMutation, CreateExchangeReviewMutationVariables>;

/**
 * __useCreateExchangeReviewMutation__
 *
 * To run a mutation, you first call `useCreateExchangeReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExchangeReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExchangeReviewMutation, { data, loading, error }] = useCreateExchangeReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *      reviewerUserId: // value for 'reviewerUserId'
 *   },
 * });
 */
export function useCreateExchangeReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateExchangeReviewMutation, CreateExchangeReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExchangeReviewMutation, CreateExchangeReviewMutationVariables>(CreateExchangeReviewDocument, options);
      }
export type CreateExchangeReviewMutationHookResult = ReturnType<typeof useCreateExchangeReviewMutation>;
export type CreateExchangeReviewMutationResult = Apollo.MutationResult<CreateExchangeReviewMutation>;
export type CreateExchangeReviewMutationOptions = Apollo.BaseMutationOptions<CreateExchangeReviewMutation, CreateExchangeReviewMutationVariables>;
export const UpdateExchangeReviewDocument = gql`
    mutation UpdateExchangeReview($input: UpdateExchangeReviewInput!, $reviewerUserId: String!) {
  updateExchangeReview(input: $input, reviewerUserId: $reviewerUserId) {
    id
    smoothness
    communication
    punctuality
    bookCondition
    overallRating
    comment
    wasSmooth
    updatedAt
  }
}
    `;
export type UpdateExchangeReviewMutationFn = Apollo.MutationFunction<UpdateExchangeReviewMutation, UpdateExchangeReviewMutationVariables>;

/**
 * __useUpdateExchangeReviewMutation__
 *
 * To run a mutation, you first call `useUpdateExchangeReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExchangeReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExchangeReviewMutation, { data, loading, error }] = useUpdateExchangeReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *      reviewerUserId: // value for 'reviewerUserId'
 *   },
 * });
 */
export function useUpdateExchangeReviewMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExchangeReviewMutation, UpdateExchangeReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExchangeReviewMutation, UpdateExchangeReviewMutationVariables>(UpdateExchangeReviewDocument, options);
      }
export type UpdateExchangeReviewMutationHookResult = ReturnType<typeof useUpdateExchangeReviewMutation>;
export type UpdateExchangeReviewMutationResult = Apollo.MutationResult<UpdateExchangeReviewMutation>;
export type UpdateExchangeReviewMutationOptions = Apollo.BaseMutationOptions<UpdateExchangeReviewMutation, UpdateExchangeReviewMutationVariables>;
export const GetExchangeReviewsByExchangeRequestDocument = gql`
    query GetExchangeReviewsByExchangeRequest($exchangeRequestId: String!) {
  getExchangeReviewsByExchangeRequest(exchangeRequestId: $exchangeRequestId) {
    id
    exchangeRequestId
    reviewerUserId
    reviewedUserId
    smoothness
    communication
    punctuality
    bookCondition
    overallRating
    comment
    wasSmooth
    createdAt
    updatedAt
    reviewer {
      id
      username
    }
    reviewed {
      id
      username
    }
  }
}
    `;

/**
 * __useGetExchangeReviewsByExchangeRequestQuery__
 *
 * To run a query within a React component, call `useGetExchangeReviewsByExchangeRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExchangeReviewsByExchangeRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExchangeReviewsByExchangeRequestQuery({
 *   variables: {
 *      exchangeRequestId: // value for 'exchangeRequestId'
 *   },
 * });
 */
export function useGetExchangeReviewsByExchangeRequestQuery(baseOptions: Apollo.QueryHookOptions<GetExchangeReviewsByExchangeRequestQuery, GetExchangeReviewsByExchangeRequestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExchangeReviewsByExchangeRequestQuery, GetExchangeReviewsByExchangeRequestQueryVariables>(GetExchangeReviewsByExchangeRequestDocument, options);
      }
export function useGetExchangeReviewsByExchangeRequestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExchangeReviewsByExchangeRequestQuery, GetExchangeReviewsByExchangeRequestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExchangeReviewsByExchangeRequestQuery, GetExchangeReviewsByExchangeRequestQueryVariables>(GetExchangeReviewsByExchangeRequestDocument, options);
        }
export type GetExchangeReviewsByExchangeRequestQueryHookResult = ReturnType<typeof useGetExchangeReviewsByExchangeRequestQuery>;
export type GetExchangeReviewsByExchangeRequestLazyQueryHookResult = ReturnType<typeof useGetExchangeReviewsByExchangeRequestLazyQuery>;
export type GetExchangeReviewsByExchangeRequestQueryResult = Apollo.QueryResult<GetExchangeReviewsByExchangeRequestQuery, GetExchangeReviewsByExchangeRequestQueryVariables>;
export const GetExchangeReviewsByUserDocument = gql`
    query GetExchangeReviewsByUser($userId: String!) {
  getExchangeReviewsByUser(userId: $userId) {
    id
    exchangeRequestId
    reviewerUserId
    reviewedUserId
    smoothness
    communication
    punctuality
    bookCondition
    overallRating
    comment
    wasSmooth
    createdAt
    updatedAt
    reviewer {
      id
      username
    }
    reviewed {
      id
      username
    }
    exchangeRequest {
      id
      status
      createdAt
      completedAt
    }
  }
}
    `;

/**
 * __useGetExchangeReviewsByUserQuery__
 *
 * To run a query within a React component, call `useGetExchangeReviewsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExchangeReviewsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExchangeReviewsByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetExchangeReviewsByUserQuery(baseOptions: Apollo.QueryHookOptions<GetExchangeReviewsByUserQuery, GetExchangeReviewsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExchangeReviewsByUserQuery, GetExchangeReviewsByUserQueryVariables>(GetExchangeReviewsByUserDocument, options);
      }
export function useGetExchangeReviewsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExchangeReviewsByUserQuery, GetExchangeReviewsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExchangeReviewsByUserQuery, GetExchangeReviewsByUserQueryVariables>(GetExchangeReviewsByUserDocument, options);
        }
export type GetExchangeReviewsByUserQueryHookResult = ReturnType<typeof useGetExchangeReviewsByUserQuery>;
export type GetExchangeReviewsByUserLazyQueryHookResult = ReturnType<typeof useGetExchangeReviewsByUserLazyQuery>;
export type GetExchangeReviewsByUserQueryResult = Apollo.QueryResult<GetExchangeReviewsByUserQuery, GetExchangeReviewsByUserQueryVariables>;
export const GetExchangeReviewDocument = gql`
    query GetExchangeReview($id: String!) {
  getExchangeReview(id: $id) {
    id
    exchangeRequestId
    reviewerUserId
    reviewedUserId
    smoothness
    communication
    punctuality
    bookCondition
    overallRating
    comment
    wasSmooth
    createdAt
    updatedAt
    reviewer {
      id
      username
    }
    reviewed {
      id
      username
    }
    exchangeRequest {
      id
      status
      createdAt
      completedAt
    }
  }
}
    `;

/**
 * __useGetExchangeReviewQuery__
 *
 * To run a query within a React component, call `useGetExchangeReviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExchangeReviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExchangeReviewQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetExchangeReviewQuery(baseOptions: Apollo.QueryHookOptions<GetExchangeReviewQuery, GetExchangeReviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExchangeReviewQuery, GetExchangeReviewQueryVariables>(GetExchangeReviewDocument, options);
      }
export function useGetExchangeReviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExchangeReviewQuery, GetExchangeReviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExchangeReviewQuery, GetExchangeReviewQueryVariables>(GetExchangeReviewDocument, options);
        }
export type GetExchangeReviewQueryHookResult = ReturnType<typeof useGetExchangeReviewQuery>;
export type GetExchangeReviewLazyQueryHookResult = ReturnType<typeof useGetExchangeReviewLazyQuery>;
export type GetExchangeReviewQueryResult = Apollo.QueryResult<GetExchangeReviewQuery, GetExchangeReviewQueryVariables>;