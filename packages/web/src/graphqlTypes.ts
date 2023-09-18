export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** `Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String'];
};

export type Book = {
  __typename?: 'Book';
  description: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type CreateBookInput = {
  description: Scalars['String'];
  title: Scalars['String'];
};

export type CreatePostInput = {
  content: Scalars['String'];
  title: Scalars['String'];
};

export type CreateUserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type ExchangeRequest = {
  __typename?: 'ExchangeRequest';
  createdAt: Scalars['Timestamp'];
  id: Scalars['ID'];
  requesterUser: User;
  requesterUserId: Scalars['String'];
  updatedAt: Scalars['Timestamp'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBook: Book;
  createPost: Post;
  createUser: User;
  deleteBook: Book;
  deleteBooks: Array<Book>;
  deletePost: Post;
  incrementPostViewCount: Post;
  signinUser: AuthResponse;
  togglePublishPost: Post;
  updateBook: Book;
};


export type MutationCreateBookArgs = {
  input: CreateBookInput;
};


export type MutationCreatePostArgs = {
  post: CreatePostInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteBookArgs = {
  id: Scalars['String'];
};


export type MutationDeleteBooksArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationIncrementPostViewCountArgs = {
  id: Scalars['String'];
};


export type MutationSigninUserArgs = {
  input: SigninUserInput;
};


export type MutationTogglePublishPostArgs = {
  id: Scalars['String'];
};


export type MutationUpdateBookArgs = {
  id: Scalars['String'];
  input: CreateBookInput;
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String'];
  createdAt: Scalars['Timestamp'];
  id: Scalars['ID'];
  published: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt: Scalars['Timestamp'];
  user: User;
  userId: Scalars['String'];
  viewCount: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  allBooks: Array<Book>;
  allPosts: Array<Post>;
  book: Book;
  books: Array<Book>;
  booksByUserId: Array<Book>;
  draftsByUser: Array<Post>;
  post: Post;
  posts: Array<Post>;
  user: User;
  users: Array<User>;
};


export type QueryBookArgs = {
  id: Scalars['String'];
};


export type QueryBooksByUserIdArgs = {
  userId: Scalars['String'];
};


export type QueryDraftsByUserArgs = {
  id: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['String'];
};

export type SigninUserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  addresseeExchangeRequest: Array<ExchangeRequest>;
  books: Array<Book>;
  hashedPassword: Scalars['String'];
  id: Scalars['ID'];
  password: Scalars['String'];
  posts: Array<Post>;
  requesterExchangeRequest: Array<ExchangeRequest>;
  username: Scalars['String'];
};
