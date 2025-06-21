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

export type AchievementBadge = {
  __typename?: 'AchievementBadge';
  createdAt: Scalars['Timestamp'];
  description: Scalars['String'];
  iconUrl: Scalars['String'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  type: BadgeType;
  updatedAt: Scalars['Timestamp'];
};

export type AddToWantToReadInput = {
  bookTemplateId: Scalars['String'];
};

export type AdminBookInfo = {
  __typename?: 'AdminBookInfo';
  condition: BookCondition;
  createdAt: Scalars['Timestamp'];
  description: Scalars['String'];
  id: Scalars['String'];
  isAvailable: Scalars['Boolean'];
  title: Scalars['String'];
  user: AdminUserBasic;
};

export type AdminBookTemplateInfo = {
  __typename?: 'AdminBookTemplateInfo';
  author?: Maybe<Scalars['String']>;
  bookCount: Scalars['Int'];
  createdAt: Scalars['Timestamp'];
  id: Scalars['String'];
  isbn: Scalars['String'];
  publisher?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type AdminStats = {
  __typename?: 'AdminStats';
  activeUsers: Scalars['Int'];
  recentBookTemplates: Array<AdminBookTemplateInfo>;
  recentBooks: Array<AdminBookInfo>;
  recentUsers: Array<AdminUserInfo>;
  totalBookTemplates: Scalars['Int'];
  totalBooks: Scalars['Int'];
  totalExchanges: Scalars['Int'];
  totalReviews: Scalars['Int'];
  totalTrustReviews: Scalars['Int'];
  totalUsers: Scalars['Int'];
};

export type AdminUpdateUserInput = {
  trustScore?: InputMaybe<Scalars['Float']>;
  username?: InputMaybe<Scalars['String']>;
};

export type AdminUserBasic = {
  __typename?: 'AdminUserBasic';
  id: Scalars['String'];
  username: Scalars['String'];
};

export type AdminUserInfo = {
  __typename?: 'AdminUserInfo';
  bookCount: Scalars['Int'];
  createdAt: Scalars['Timestamp'];
  id: Scalars['String'];
  reviewCount: Scalars['Int'];
  trustScore: Scalars['Float'];
  updatedAt: Scalars['Timestamp'];
  username: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String'];
};

export enum BadgeType {
  BookCollector = 'BOOK_COLLECTOR',
  CommunityHelper = 'COMMUNITY_HELPER',
  EarlyAdopter = 'EARLY_ADOPTER',
  FiftyExchanges = 'FIFTY_EXCHANGES',
  FirstExchange = 'FIRST_EXCHANGE',
  FiveExchanges = 'FIVE_EXCHANGES',
  HelpfulReviewer = 'HELPFUL_REVIEWER',
  HundredExchanges = 'HUNDRED_EXCHANGES',
  PerfectRating = 'PERFECT_RATING',
  TenExchanges = 'TEN_EXCHANGES',
  TwentyFiveExchanges = 'TWENTY_FIVE_EXCHANGES'
}

export type Book = {
  __typename?: 'Book';
  bookTemplate?: Maybe<BookTemplate>;
  bookTemplateId?: Maybe<Scalars['String']>;
  condition: BookCondition;
  createdAt: Scalars['Timestamp'];
  description: Scalars['String'];
  id: Scalars['ID'];
  isAvailable: Scalars['Boolean'];
  notes?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['Timestamp'];
  user: User;
  userId: Scalars['String'];
};

export enum BookCondition {
  Excellent = 'EXCELLENT',
  Fair = 'FAIR',
  Good = 'GOOD',
  Poor = 'POOR',
  VeryGood = 'VERY_GOOD'
}

export type BookMetadata = {
  __typename?: 'BookMetadata';
  author?: Maybe<Scalars['String']>;
  categories: Array<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  infoLink?: Maybe<Scalars['String']>;
  isbn: Scalars['String'];
  language?: Maybe<Scalars['String']>;
  pageCount?: Maybe<Scalars['Int']>;
  publishedDate?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type BookTemplate = {
  __typename?: 'BookTemplate';
  author?: Maybe<Scalars['String']>;
  books: Array<Book>;
  categories: Array<Scalars['String']>;
  createdAt: Scalars['Timestamp'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  infoLink?: Maybe<Scalars['String']>;
  isbn: Scalars['String'];
  language?: Maybe<Scalars['String']>;
  pageCount?: Maybe<Scalars['Int']>;
  publishedDate?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['Timestamp'];
};

export type CreateBookFromIsbnInput = {
  condition?: BookCondition;
  description?: InputMaybe<Scalars['String']>;
  isAvailable?: Scalars['Boolean'];
  isbn: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
};

export type CreateBookFromTemplateInput = {
  bookTemplateId: Scalars['String'];
  condition?: BookCondition;
  customDescription?: InputMaybe<Scalars['String']>;
  isAvailable?: Scalars['Boolean'];
  notes?: InputMaybe<Scalars['String']>;
};

export type CreateBookInput = {
  bookTemplateId?: InputMaybe<Scalars['String']>;
  condition?: BookCondition;
  description: Scalars['String'];
  isAvailable?: Scalars['Boolean'];
  notes?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CreateExchangeReviewInput = {
  /** Book condition rating (1-5) */
  bookCondition: Scalars['Int'];
  comment?: InputMaybe<Scalars['String']>;
  /** Communication rating (1-5) */
  communication: Scalars['Int'];
  exchangeRequestId: Scalars['String'];
  /** Overall rating (1-5) */
  overallRating: Scalars['Int'];
  /** Punctuality rating (1-5) */
  punctuality: Scalars['Int'];
  reviewedUserId: Scalars['String'];
  /** Smoothness rating (1-5) */
  smoothness: Scalars['Int'];
  /** Was the exchange smooth? */
  wasSmooth?: Scalars['Boolean'];
};

export type CreatePostInput = {
  content: Scalars['String'];
  title: Scalars['String'];
};

export type CreateTrustReviewInput = {
  comment?: InputMaybe<Scalars['String']>;
  exchangeRequestId?: InputMaybe<Scalars['String']>;
  rating: Scalars['Float'];
  reviewType: TrustReviewType;
  targetUserId: Scalars['String'];
};

export type CreateUserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type ExchangeHistory = {
  __typename?: 'ExchangeHistory';
  completedAt?: Maybe<Scalars['Timestamp']>;
  createdAt: Scalars['Timestamp'];
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  offeredBook?: Maybe<Book>;
  offeredBookId?: Maybe<Scalars['String']>;
  recipient: User;
  recipientId: Scalars['String'];
  requestedBook: Book;
  requestedBookId: Scalars['String'];
  requester: User;
  requesterId: Scalars['String'];
  status: ExchangeHistoryStatus;
  updatedAt: Scalars['Timestamp'];
};

export enum ExchangeHistoryStatus {
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type ExchangeRequest = {
  __typename?: 'ExchangeRequest';
  addresseeUser: User;
  addresseeUserId: Scalars['String'];
  completedAt?: Maybe<Scalars['Timestamp']>;
  createdAt: Scalars['Timestamp'];
  exchangeReviews: Array<ExchangeReview>;
  id: Scalars['ID'];
  requesterUser: User;
  requesterUserId: Scalars['String'];
  status: ExchangeStatus;
  trustReviews: Array<TrustReview>;
  updatedAt: Scalars['Timestamp'];
};

export type ExchangeReview = {
  __typename?: 'ExchangeReview';
  /** Book condition rating (1-5) */
  bookCondition: Scalars['Int'];
  comment?: Maybe<Scalars['String']>;
  /** Communication rating (1-5) */
  communication: Scalars['Int'];
  createdAt: Scalars['Timestamp'];
  exchangeRequest: ExchangeRequest;
  exchangeRequestId: Scalars['String'];
  id: Scalars['ID'];
  /** Overall rating (1-5) */
  overallRating: Scalars['Int'];
  /** Punctuality rating (1-5) */
  punctuality: Scalars['Int'];
  reviewed: User;
  reviewedUserId: Scalars['String'];
  reviewer: User;
  reviewerUserId: Scalars['String'];
  /** Smoothness rating (1-5) */
  smoothness: Scalars['Int'];
  updatedAt: Scalars['Timestamp'];
  /** Was the exchange smooth? */
  wasSmooth: Scalars['Boolean'];
};

export enum ExchangeStatus {
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type Mutation = {
  __typename?: 'Mutation';
  addBookToDatabase?: Maybe<BookMetadata>;
  addToWantToRead: WantToRead;
  adminDeleteBook: Scalars['Boolean'];
  adminDeleteBookTemplate: Scalars['Boolean'];
  adminDeleteUser: Scalars['Boolean'];
  adminUpdateBook: Book;
  adminUpdateBookTemplate: BookTemplate;
  adminUpdateUser: User;
  checkAndAwardAchievements: Scalars['Boolean'];
  createBook: Book;
  createBookFromIsbn: Book;
  createBookFromTemplate: Book;
  createBooks: Array<Book>;
  createExchangeReview: ExchangeReview;
  createPost: Post;
  createTrustReview: TrustReview;
  createUser: User;
  deleteBook: Scalars['Boolean'];
  deleteBooks: Array<Book>;
  deleteExchangeReview: Scalars['Boolean'];
  deletePost: Post;
  deleteTrustReview: Scalars['Boolean'];
  deleteUser: User;
  incrementPostViewCount: Post;
  populateBookDatabase: Scalars['Boolean'];
  removeFromWantToRead: Scalars['Boolean'];
  signinUser: AuthResponse;
  toggleBookOwnership?: Maybe<Book>;
  togglePublishPost: Post;
  updateBook: Book;
  updateExchangeReview: ExchangeReview;
  updateTrustReview: TrustReview;
};


export type MutationAddBookToDatabaseArgs = {
  isbn: Scalars['String'];
};


export type MutationAddToWantToReadArgs = {
  input: AddToWantToReadInput;
};


export type MutationAdminDeleteBookArgs = {
  bookId: Scalars['String'];
};


export type MutationAdminDeleteBookTemplateArgs = {
  bookTemplateId: Scalars['String'];
};


export type MutationAdminDeleteUserArgs = {
  userId: Scalars['String'];
};


export type MutationAdminUpdateBookArgs = {
  bookId: Scalars['String'];
  input: CreateBookInput;
};


export type MutationAdminUpdateBookTemplateArgs = {
  bookTemplateId: Scalars['String'];
  input: UpdateBookTemplateInput;
};


export type MutationAdminUpdateUserArgs = {
  input: AdminUpdateUserInput;
  userId: Scalars['String'];
};


export type MutationCreateBookArgs = {
  input: CreateBookInput;
};


export type MutationCreateBookFromIsbnArgs = {
  input: CreateBookFromIsbnInput;
};


export type MutationCreateBookFromTemplateArgs = {
  input: CreateBookFromTemplateInput;
};


export type MutationCreateBooksArgs = {
  input: Array<CreateBookInput>;
};


export type MutationCreateExchangeReviewArgs = {
  input: CreateExchangeReviewInput;
  reviewerUserId: Scalars['String'];
};


export type MutationCreatePostArgs = {
  post: CreatePostInput;
};


export type MutationCreateTrustReviewArgs = {
  createTrustReviewInput: CreateTrustReviewInput;
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


export type MutationDeleteExchangeReviewArgs = {
  id: Scalars['String'];
  reviewerUserId: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationDeleteTrustReviewArgs = {
  id: Scalars['String'];
};


export type MutationIncrementPostViewCountArgs = {
  id: Scalars['String'];
};


export type MutationRemoveFromWantToReadArgs = {
  input: RemoveFromWantToReadInput;
};


export type MutationSigninUserArgs = {
  input: SigninUserInput;
};


export type MutationToggleBookOwnershipArgs = {
  input: ToggleBookOwnershipInput;
};


export type MutationTogglePublishPostArgs = {
  id: Scalars['String'];
};


export type MutationUpdateBookArgs = {
  id: Scalars['String'];
  input: CreateBookInput;
};


export type MutationUpdateExchangeReviewArgs = {
  input: UpdateExchangeReviewInput;
  reviewerUserId: Scalars['String'];
};


export type MutationUpdateTrustReviewArgs = {
  updateTrustReviewInput: UpdateTrustReviewInput;
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
  exchangeReview?: Maybe<ExchangeReview>;
  exchangeReviews: Array<ExchangeReview>;
  exchangeReviewsByExchangeRequest: Array<ExchangeReview>;
  exchangeReviewsByUser: Array<ExchangeReview>;
  getAdminStats: AdminStats;
  getAllBadges: Array<AchievementBadge>;
  getAllBookTemplates: Array<BookTemplate>;
  getAllPrePopulatedBooks: Array<BookMetadata>;
  getBookMetadataByISBN?: Maybe<BookMetadata>;
  getBookTemplateByISBN?: Maybe<BookTemplate>;
  getBookTemplateById?: Maybe<BookTemplate>;
  getExchangeReview?: Maybe<ExchangeReview>;
  getExchangeReviewsByExchangeRequest: Array<ExchangeReview>;
  getExchangeReviewsByUser: Array<ExchangeReview>;
  getMyAchievements: Array<UserAchievement>;
  getMyExchangeHistory: Array<ExchangeHistory>;
  getUserAchievements: Array<UserAchievement>;
  getUserBookByTemplate?: Maybe<Book>;
  getUserExchangeHistory: Array<ExchangeHistory>;
  getUserTrustReviews: Array<TrustReview>;
  getUserTrustScoreHistory: Array<TrustScoreHistory>;
  isBookOwnedByUser: Scalars['Boolean'];
  isInWantToReadList: Scalars['Boolean'];
  myWantToReadList: Array<WantToRead>;
  post: Post;
  posts: Array<Post>;
  searchBookMetadata: Array<BookMetadata>;
  searchBookTemplates: Array<BookTemplate>;
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


export type QueryExchangeReviewArgs = {
  id: Scalars['String'];
};


export type QueryExchangeReviewsByExchangeRequestArgs = {
  exchangeRequestId: Scalars['String'];
};


export type QueryExchangeReviewsByUserArgs = {
  userId: Scalars['String'];
};


export type QueryGetAllBookTemplatesArgs = {
  limit?: Scalars['Float'];
};


export type QueryGetAllPrePopulatedBooksArgs = {
  limit?: Scalars['Float'];
};


export type QueryGetBookMetadataByIsbnArgs = {
  isbn: Scalars['String'];
};


export type QueryGetBookTemplateByIsbnArgs = {
  isbn: Scalars['String'];
};


export type QueryGetBookTemplateByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetExchangeReviewArgs = {
  id: Scalars['String'];
};


export type QueryGetExchangeReviewsByExchangeRequestArgs = {
  exchangeRequestId: Scalars['String'];
};


export type QueryGetExchangeReviewsByUserArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserAchievementsArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserBookByTemplateArgs = {
  bookTemplateId: Scalars['String'];
};


export type QueryGetUserExchangeHistoryArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserTrustReviewsArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserTrustScoreHistoryArgs = {
  userId: Scalars['String'];
};


export type QueryIsBookOwnedByUserArgs = {
  bookTemplateId: Scalars['String'];
};


export type QueryIsInWantToReadListArgs = {
  bookTemplateId: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QuerySearchBookMetadataArgs = {
  limit?: Scalars['Float'];
  query: Scalars['String'];
};


export type QuerySearchBookTemplatesArgs = {
  limit?: Scalars['Float'];
  query: Scalars['String'];
};

export type RemoveFromWantToReadInput = {
  bookTemplateId: Scalars['String'];
};

export type SigninUserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type ToggleBookOwnershipInput = {
  bookTemplateId: Scalars['String'];
};

export type TrustReview = {
  __typename?: 'TrustReview';
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['Timestamp'];
  exchangeRequest?: Maybe<ExchangeRequest>;
  exchangeRequestId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  rating: Scalars['Float'];
  reviewType: TrustReviewType;
  reviewerUser: User;
  reviewerUserId: Scalars['String'];
  targetUser: User;
  targetUserId: Scalars['String'];
  updatedAt: Scalars['Timestamp'];
};

export enum TrustReviewType {
  CommunicationQuality = 'COMMUNICATION_QUALITY',
  ExchangeCompletion = 'EXCHANGE_COMPLETION',
  General = 'GENERAL',
  ItemCondition = 'ITEM_CONDITION',
  Punctuality = 'PUNCTUALITY'
}

export type TrustScoreHistory = {
  __typename?: 'TrustScoreHistory';
  createdAt: Scalars['Timestamp'];
  id: Scalars['ID'];
  newScore: Scalars['Float'];
  oldScore: Scalars['Float'];
  reason: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type UpdateBookTemplateInput = {
  author?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Array<Scalars['String']>>;
  description?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  infoLink?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  pageCount?: InputMaybe<Scalars['Int']>;
  publishedDate?: InputMaybe<Scalars['String']>;
  publisher?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type UpdateExchangeReviewInput = {
  /** Book condition rating (1-5) */
  bookCondition?: InputMaybe<Scalars['Int']>;
  comment?: InputMaybe<Scalars['String']>;
  /** Communication rating (1-5) */
  communication?: InputMaybe<Scalars['Int']>;
  id: Scalars['String'];
  /** Overall rating (1-5) */
  overallRating?: InputMaybe<Scalars['Int']>;
  /** Punctuality rating (1-5) */
  punctuality?: InputMaybe<Scalars['Int']>;
  /** Smoothness rating (1-5) */
  smoothness?: InputMaybe<Scalars['Int']>;
  /** Was the exchange smooth? */
  wasSmooth?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateTrustReviewInput = {
  comment?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  rating?: InputMaybe<Scalars['Float']>;
  reviewType?: InputMaybe<TrustReviewType>;
};

export type User = {
  __typename?: 'User';
  addresseeExchangeRequest: Array<ExchangeRequest>;
  books: Array<Book>;
  givenTrustReviews: Array<TrustReview>;
  hashedPassword: Scalars['String'];
  id: Scalars['ID'];
  password: Scalars['String'];
  posts: Array<Post>;
  receivedTrustReviews: Array<TrustReview>;
  requesterExchangeRequest: Array<ExchangeRequest>;
  trustScore: Scalars['Float'];
  trustScoreHistory: Array<TrustScoreHistory>;
  username: Scalars['String'];
};

export type UserAchievement = {
  __typename?: 'UserAchievement';
  badge: AchievementBadge;
  badgeId: Scalars['String'];
  createdAt: Scalars['Timestamp'];
  earnedAt: Scalars['Timestamp'];
  id: Scalars['ID'];
  userId: Scalars['String'];
};

export type WantToRead = {
  __typename?: 'WantToRead';
  bookTemplate: BookTemplate;
  bookTemplateId: Scalars['String'];
  createdAt: Scalars['Timestamp'];
  id: Scalars['ID'];
  updatedAt: Scalars['Timestamp'];
  user: User;
  userId: Scalars['String'];
};
