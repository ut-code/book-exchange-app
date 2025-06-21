import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BookCondition } from '../../../models/book';

@ObjectType()
export class AdminUserBasic {
  @Field()
  id: string;

  @Field()
  username: string;
}

@ObjectType()
export class AdminUserInfo {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  trustScore: number;

  @Field(() => Int)
  bookCount: number;

  @Field(() => Int)
  reviewCount: number;
}

@ObjectType()
export class AdminBookInfo {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => BookCondition)
  condition: BookCondition;

  @Field()
  isAvailable: boolean;

  @Field()
  createdAt: Date;

  @Field(() => AdminUserBasic)
  user: AdminUserBasic;
}

@ObjectType()
export class AdminBookTemplateInfo {
  @Field()
  id: string;

  @Field()
  isbn: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  publisher?: string;

  @Field()
  createdAt: Date;

  @Field(() => Int)
  bookCount: number;
}

@ObjectType()
export class AdminStats {
  @Field(() => Int)
  totalUsers: number;

  @Field(() => Int)
  totalBooks: number;

  @Field(() => Int)
  totalBookTemplates: number;

  @Field(() => Int)
  totalExchanges: number;

  @Field(() => Int)
  totalReviews: number;

  @Field(() => Int)
  totalTrustReviews: number;

  @Field(() => Int)
  activeUsers: number;

  @Field(() => [AdminUserInfo])
  recentUsers: AdminUserInfo[];

  @Field(() => [AdminBookInfo])
  recentBooks: AdminBookInfo[];

  @Field(() => [AdminBookTemplateInfo])
  recentBookTemplates: AdminBookTemplateInfo[];
}